import Storage from "./Storage";
import {readHostFile} from "./Helpers";
import {differenceBy} from "lodash/array";


const Store = new Storage({
  // We'll call our data file 'hosts-data'
  configName: 'hosts-data',
  defaults: {
    Hosts: [],
    Categories: [{name: 'Default', active: true}]
  }
});

export const getAllHosts = ()=> {
  return Store;
};


export const WriteHost = (Hosts)=> {
  Store.set("Hosts", Hosts)
};

export const WriteCategory = (Categories)=> {
  Store.set("Categories", Categories)
};

export const syncHostFile = (Store)=> {
  Store.dispatch({type: "TOGGLE_LOADER", loader: true})
  new Promise((resolve, reject)=> {
    readHostFile((data)=> {
      let newHostsFoundOnHostFile = differenceBy(data, Store.getState().Hosts, 'domain');
      if (newHostsFoundOnHostFile.length !== 0) {
        newHostsFoundOnHostFile.forEach(item=> {

        })
      }
      resolve(newHostsFoundOnHostFile);
    });
  }).then(newHosts=> {
    console.log("newHosts", newHosts);
    newHosts = newHosts.map(host=>{
      host.category = 'Default';
      return host;
    })
    Store.dispatch({type: "TOGGLE_LOADER", loader: false});
    Store.dispatch({type: "ADD_HOST", Host: newHosts});
  }, error=> {
    Store.dispatch({type: "TOGGLE_LOADER", loader: false});

  })
};
