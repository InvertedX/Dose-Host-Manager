import React, {Component} from "react";
import {RemoveHost, UpdateHost} from "../actions/uiactions";
import {Card, Grid, Checkbox, Dropdown} from "semantic-ui-react";
import {connect} from "react-redux";
import EditorModal from "./EditorModal";

const mapDispatchToProps = dispatch =>({
  RemoveHost: (hostname)=> dispatch(RemoveHost(hostname)),
  UpdateHost: (Host, target)=> dispatch(UpdateHost(Host, target))
});
const mapStateToProps = ({Categories}) =>({Categories});
class HostCard extends Component {
  state = {
    editModal: false,
    targetHost: null,
    errors: [],
    options: this.props.Categories.map(category=> {
      return {key: category.name, text: category.name, value: category.name}
    })
  }

  toggleHostState() {
    let Host = this.props.Host;
    Host.active = !Host.active;
    this.props.UpdateHost(Host);
  }

  ChangeCategory(e, data) {
    let Host = this.props.Host;
    Host.category = data.value;
    this.props.UpdateHost(Host);
  }

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

    this.props.UpdateHost(formData,this.props.Host.domain);

    this.setState({editModal: false});
  };

  edit = () => this.setState({editModal: true})
  close = (e) => {
    e.preventDefault();
    this.setState({editModal: false})
  }
  removeErrors = () => this.setState({errors: []})

  render() {
    let Host = this.props.Host;
    let props = this.props;
    let CategoryOptions = this.props.Categories.map((item)=> {
      return {
        text: item.name,
        value: item.name,
        label: {color: item.active === true ? 'green' : "red", empty: true, circular: true},
      };
    });

    return (
      <div>
        <EditorModal
          open={this.state.editModal}
          onSubmit={this.handleSubmit.bind(this)}
          close={this.close.bind(this)}
          editHostData={Host}
          errors={this.state.errors}
          options={this.state.options}
          removeErrors={this.removeErrors.bind(this)}
        />
        <Card className="transition horizontal flip">
          <Card.Content>
            <div
              className={"ui circular empty label right floated  "+(Host.active===true?'green':'red')}></div>
            <Card.Header>
              {Host.domain}
            </Card.Header>
            <Card.Meta>
              {Host.ip}
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Grid>
              <Grid.Column  >
                <Dropdown floating item icon="options">
                  <Dropdown.Menu >
                    <Dropdown.Item onClick={this.edit.bind(this)} icon='pencil' text='Edit'/>
                    <Dropdown.Item onClick={()=>{props.remove(Host)}} icon='trash' text='Delete'/>
                    <Dropdown onChange={this.ChangeCategory.bind(this)} scrolling text=' Move to '
                              defaultValue={Host.category}
                              options={CategoryOptions}
                              pointing='left' className='link item'>
                    </Dropdown>
                  </Dropdown.Menu>
                </Dropdown>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Checkbox slider onChange={this.toggleHostState.bind(this)} defaultChecked={Host.active}/>
              </Grid.Column>
            </Grid>

          </Card.Content>
        </Card>
      </div>

    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HostCard);
