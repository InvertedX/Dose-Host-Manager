import React, {Component} from "react";
import {connect} from "react-redux";
import isEqual from "lodash/isEqual";
import {FilterCategory, AddCategory} from "../actions/uiactions";
import {Menu, Sidebar as UiSidebar, Input, Icon, Item} from "semantic-ui-react";

const mapStateToProps = ({Categories, CategoryFilter}) =>({Categories, CategoryFilter});

const mapDispatchToProps = dispatch =>({
  FilterCategory: (filter)=> dispatch(FilterCategory(filter)),
  AddCategory: (category)=> dispatch(AddCategory(category)),
});

class Sidebar extends Component {
  state = {showDeletebtn: false, list: []};
  lists = [];
  categories = [];

  _handleCategoryInputKeyCode(evt) {
    if (evt.which === 13) {
      if (evt.target.value.trim() !== "")
        this.props.AddCategory(evt.target.value);
      evt.target.value = "";
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(this.lists, nextProps.Categories)) {
      return true;
    } else if (!isEqual(this.props.CategoryFilter, nextProps.CategoryFilter)) {
      return true;
    } else if (!isEqual(this.props.visible, nextProps.visible)) {
       return true;
    } else {
      return false
    }
  }

  render() {
    let props = this.props;
    return (
      <div>
        <UiSidebar.Pushable style={{height:"95vh"}}>
          <UiSidebar as={Menu}
                     animation='push'
                     borderless size="large"
                     visible={props.visible}
                     vertical>
            <Item>
            </Item>
            <div style={{maxHeight:"70vh",overflowY:"auto"}}>
              {this.list()}
            </div>
            <Item>
              <Input onKeyDown={this._handleCategoryInputKeyCode.bind(this)}
                     size='mini' icon='plus' placeholder='add new category...'/>
            </Item>
          </UiSidebar>
          <UiSidebar.Pusher>
            {props.children}
          </UiSidebar.Pusher>
        </UiSidebar.Pushable>
      </div>
    );
  }

  list() {
    let props = this.props;
    if (!isEqual(this.categories, props.Categories)) {
      console.log("Category re render");
      this.lists = props.Categories.map((category, key)=> {
          return ((   <Item key={key}
                            onMouseEnter={()=>{this.setState({showDeletebtn: true})}}
                            onMouseLeave={()=>{this.setState({showDeletebtn: false})}}
                            className={"pointer"+ (props.CategoryFilter===category.name ? " active":"")}
                            onClick={()=>(props.FilterCategory(category.name))}
          >
            <div className={"ui circular empty label "+(category.active===true?"green":"red")}></div>
            <span>{category.name}</span>
            { this.state.showDeletebtn !== false ? <Icon name='trash' size='small'/> : ''}
          </Item>));
        }
      );
      this.categories = props.Categories;
      return this.lists;
    } else {
      return this.lists;
    }
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
