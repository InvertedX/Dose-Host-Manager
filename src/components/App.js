import React, {Component} from "react";
import Sidebar from "./sidebar";
import HostGrid from "./hostgrid";
import ToolBar from "./toolbarmenu";
import Frame from "./frame";

class App extends Component {

  state = {sidebar_visibility: false}

  ToggleSidebar() {
    this.setState({sidebar_visibility: !this.state.sidebar_visibility});
  }

  render() {
    return (
      <div>
        <div className="ui active centered inline loader"></div>
        <Frame/>
        <ToolBar prps={this.hello} sidebarToggle={this.ToggleSidebar.bind(this)}/>
        <Sidebar visible={this.state.sidebar_visibility}>
          <HostGrid />
        </Sidebar>
      </div>
    );
  }
}
export default App;
