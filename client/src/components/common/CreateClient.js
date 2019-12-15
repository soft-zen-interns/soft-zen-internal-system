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
      country: '',
      startDate: ''
    };

    this.registerClient = this.registerClient.bind(this);
  }
  
  handleChange = ({target}) => {
    this.setState({ [target.name]: target.value });
  };

  registerClient(){
    const params = new URLSearchParams();
    params.append('name', this.state.name);
    params.append('contactName', this.state.contactName);
    params.append('email', this.state.email);
    params.append('type', this.state.type);
    params.append('country', this.state.country);
    params.append('startDate', new Date().toJSON());

    const url = "http://localhost:8000/clients/create"  

    axios.post(url, params)
    .then(response =>
      console.log(response)
    ).catch(error =>
       console.log(error)
    );
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

        <Form.Group controlId="formBasicContactName">
          <Form.Label>Contact Name</Form.Label>
          <Form.Control name="contactName" type="text" onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicCountry">
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

        <p>{Date.now().valueOf()}</p>
      </Form>
    );
  }
}
export default CreateClient;