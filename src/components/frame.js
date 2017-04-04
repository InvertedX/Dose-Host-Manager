import React, {Component} from "react";
import * as Window from "../utils/WindowController";
class Frame extends Component {
  render() {
    return (
      <div className="bar">
        <div className="button-wrapper">
          <div className="window-btn" id="close" onClick={Window.Close}></div>
          <div className="window-btn" id="maximize" onClick={Window.Minimize}></div>
          <div className="window-btn" id="minimize" onClick={Window.maximize}></div>
        </div>
        <div className="draggable"></div>
      </div>
    );
  }
}
export default Frame;
