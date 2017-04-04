import React, {Component} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {AddHost, SearchHosts, UpdateHost} from "../actions/uiactions";
import {Dropdown, Menu, Icon} from "semantic-ui-react";
import EditorModal from "./EditorModal";

const mapStateToProps = ({SideBar, Bus, Categories}) =>({SideBar, Categories, Bus});

const mapDispatchToProps = dispatch =>({
  AddHost: (Host)=> dispatch(AddHost(Host)),
  UpdateHost: (Host, Target)=> dispatch(UpdateHost(Host, Target)),
  SearchHosts: (search)=> dispatch(SearchHosts(search))
});

class ToolBar extends Component {
  state = {
    modalOpen: false,
    value: 1,
    loadingForm: false,
    errors: [],
    options: this.props.Categories.map(category=> {
      return {key: category.name, text: category.name, value: category.name}
    })
  };

  showNewHostModal = (editHost) => this.setState({modalOpen: true, editHostData: editHost});

  removeErrors = () => this.setState({errors: []});

  search() {
    let search_value = ReactDOM.findDOMNode(this.refs.searchinput).value;
    this.props.SearchHosts(search_value.trim());
  };

  handleSubmit(e, {formData}) {
    e.preventDefault();
    //Validate input fields has some values
    let errors = [];
    formData.ip.trim() == "" ? errors.push("ip") : "";
    formData.domain.trim() == "" ? errors.push("domain") : "";
    formData.category.trim() == "" ? errors.push("category") : "";
    if (errors.length != 0) {
      this.setState({errors});
      return;
    }
    //Set new host to active
    formData.active = true;
    //Dispatch AddHost Action with form data

    this.props.AddHost(formData);

    this.setState({modalOpen: false});
  };


  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.Categories.map(category=> {
        return {key: category.name, text: category.name, value: category.name}
      })
    })
  }

  componentDidUpdate() {

  }

  closeModal(e) {
    e.preventDefault();
    //this is required because button is inside form element or it will try to submit the form
    this.setState({modalOpen: false})
  }


  render() {
    let props = this.props;
    return (<div>
        <EditorModal
          open={this.state.modalOpen}
          onSubmit={this.handleSubmit.bind(this)}
          close={this.closeModal.bind(this)}
          errors={this.state.errors}
          options={this.state.options}
          removeErrors={this.removeErrors.bind(this)}
          close={this.closeModal.bind(this)}
        />
        <Menu attached='top' fluid className="m-t-0 toolbar">
          <Menu.Item name='hamburger' onClick={props.sidebarToggle}>
            <Icon name='sidebar'/>
          </Menu.Item>
          <Dropdown item icon='rocket' simple>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.showNewHostModal}>New Host</Dropdown.Item>
              <Dropdown.Item>Save...</Dropdown.Item>
              <Dropdown.Item>Edit Permissions</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Export</Dropdown.Header>
              <Dropdown.Item>Share</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position='right'>
            <div className='ui  category search item'>
              <div className='ui transparent icon input'>
                <input ref="searchinput" onChange={this.search.bind(this)} className='prompt' type='text'
                       placeholder='Search Hosts...'/>
                <i className='search link icon'/>
              </div>
              <div className='results'></div>
            </div>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
