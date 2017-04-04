import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./css/style.css";
import "./css/semantic.min.css";
import {Provider} from "react-redux";
import {applyMiddleware, createStore, combineReducers} from "redux";
import * as reducers from "./reducers/reducers";
import Logger from "redux-logger";
import {CreateHostFileData, writeToHostFile} from "./utils/Helpers";
import {WriteHost, WriteCategory, syncHostFile} from "./utils/HostHandler";
const Store = createStore(combineReducers(reducers), applyMiddleware(Logger(),));
applyMiddleware(Logger());
let run = ()=> {
  ReactDOM.render(
    <Provider store={Store}>
      <App  />
    </Provider>,
    document.getElementById('root')
  );
};

run();
syncHostFile(Store);

const HostFileWrite = ()=> {
  let LastAction = Store.getState().lastAction;
  let match = ["UPDATE_HOST", "REMOVE_HOST", "ADD_HOST"].includes(LastAction.type);
  if (match) {
    let HostData = CreateHostFileData(Store.getState().Hosts.filter((item)=>(item.active)));
    writeToHostFile(HostData);
  }
};

function StoreAppData() {
  let LastAction = Store.getState().lastAction;
  let matchHostActions = ["UPDATE_HOST", "REMOVE_HOST", "ADD_HOST"].includes(LastAction.type);
  if (matchHostActions) {

    WriteHost(Store.getState().Hosts);
  }
  let matchCategoryAction = ["ADD_CATEGORY", "REMOVE_CATEGORY"].includes(LastAction.type);
  if (matchCategoryAction) {
    WriteCategory(Store.getState().Categories);
  }
}

Store.subscribe(()=> {
  run();
  StoreAppData();
  HostFileWrite();
});

