import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
class CreateClient extends Component {
  constructor(props){
    super(props);
    this.state = { 
      name: '',
      contactName: '',
      email: '',
      type: '',
      startDate: ''
    };

    this.registerClient = this.registerClient.bind(this);
  }
  
  handleChange = ({target}) => {
    this.setState({ [target.name]: target.value });
  };

  registerClient(){
    //hardcoded client
    const params = new URLSearchParams();
    params.append('name', 'Somebody');
    params.append('contactName', 'Company');
    params.append('email', 'smiley@yahoo.com');
    params.append('type', 'startup');
    params.append('country', 'USA');
    params.append('startDate', '2012-12-11');

    const url = "http://localhost:8000/clients/create"  
    axios({
      method: "post", 
      url: url, 
      data: params
    });
    // .then(response =>
    //   console.log(response)
    // ).catch(error =>
    //   console.log(error)
    // );
  }

  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicConstactName">
          <Form.Label>Contact Name</Form.Label>
          <Form.Control name="contactName" type="text" onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicSountry">
          <Form.Label>Country</Form.Label>
          <Form.Control name="country" type="text" onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicType">
          <Form.Label>Type</Form.Label>
          <Form.Control name="type" type="text" onChange={this.handleChange}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.registerClient}>
          Submit
        </Button>

  <p>{JSON.stringify(this.state)}</p>
      </Form>
    );
  }
}

export default CreateClient;