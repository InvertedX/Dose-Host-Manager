import React, {Component} from "react";
import {connect} from "react-redux";
import {RemoveHost} from "../actions/uiactions";
import {Grid, Header, Segment, Icon, Modal, Button} from "semantic-ui-react";
import HostCard from "./hostcard";
import lowerCase from "lodash/lowerCase";
const mapStateToProps = ({Hosts, Category, CategoryFilter}) =>({Hosts, Category, CategoryFilter});

const mapDispatchToProps = dispatch =>({
  RemoveHost: (hostname)=> dispatch(RemoveHost(hostname))
});
 
class HostGrid extends Component {

  constructor() {
    super();
    this.needRecalculate = false;
    this.state = {
      showModal: false, host_to_remove: {
        "domain": "",
        "ip": ""
      },
      columns: 4,
      updated: false
    };

  }

  componentDidUpdate() {
    if (this.needRecalculate === true) {
      this.CalculateColumns();
    }
  }

  componentWillMount() {
    this.CalculateColumns.bind(this)();
  }

  componentDidMount() {
    window.addEventListener("resize", this.CalculateColumns.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.CalculateColumns.bind(this));
  }

  CalculateColumns() {
    let width = window.innerWidth;
    if (width <= 768) {
      this.setState({columns: 2})
    }
    if (width > 768 && width <= 992) {
      this.setState({columns: 3})
    }
    if (width > 992 && width <= 1200) {
      this.setState({columns: 4})
    }
    if (width > 1200) {
      this.setState({columns: 5})
    }
  }

  removeModal({domain, ip}) {
    this.setState({
      showModal: true, host_to_remove: {
        domain, ip
      }
    });
  }

  render() {
    let props = this.props;
    return (
      <div>
        <Segment basic style={{height:"95vh",overflowY:"auto"}} id="style-2">
          <Grid relaxed columns={this.state.columns} style={{marginBottom:25}}>
            {props.Hosts.map((Host, key)=> {
              if (lowerCase(Host.category) === lowerCase(props.CategoryFilter))
                return (
                  <Grid.Column key={key}>
                    <HostCard
                      Host={Host}
                      remove={this.removeModal.bind(this)}
                    />
                  </Grid.Column>
                );
            })}
          </Grid>
        </Segment>
        <Modal open={this.state.showModal} size="small" basic>
          <Header icon='trash' color="red" content='Confirm Action ?'/>
          <Modal.Content>
            <p>Are you sure you want to delete <strong>{this.state.host_to_remove.domain }
              ({this.state.host_to_remove.ip }) ? </strong></p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' onClick={()=>{ this.setState({showModal: false})}} inverted>
              <Icon name='remove'/> No
            </Button>
            <Button color='green' onClick={()=>{props.RemoveHost(this.state.host_to_remove.domain );
            this.setState({showModal: false})}} inverted>
              <Icon name='checkmark'/> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HostGrid)
