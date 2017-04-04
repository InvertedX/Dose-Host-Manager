import React, {Component} from "react";
import {Button, Input, Form, Select, Modal} from "semantic-ui-react";

class EditorModal extends Component {
  render() {
    let props = this.props;
    return ( 
      <Modal dimmer="blurring" open={props.open}>
        <Modal.Content>
          <Form onSubmit={props.onSubmit}>
            <Form.Group widths='equal'>
              <Form.Field error={props.errors.indexOf('domain')!=-1}>
                <label>Domain</label>
                <input onChange={props.removeErrors}
                       defaultValue={props.editHostData!=null ? props.editHostData.domain :""}
                       name="domain" placeholder='eg : dose.dev'/>
              </Form.Field>
              <Form.Field onChange={props.removeErrors}
                          defaultValue={props.editHostData!=null ? props.editHostData.ip :""}
                          error={props.errors.indexOf('ip')!=-1} name="ip"
                          control={Input} label='Points  to' placeholder='127.0.0.1'/>
              <Form.Field onChange={props.removeErrors}
                          error={props.errors.indexOf('category')!=-1}
                          defaultValue={props.editHostData!=null ? props.editHostData.category :""}
                          name="category" control={Select} label='Category' options={props.options}/>
            </Form.Group>
            <Button inverted color='green' type="submit">{props.editHostData == null ? "Add" : "Update"}</Button>
            <Button inverted color='red' onClick={props.close}>Close</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}
export default EditorModal;
