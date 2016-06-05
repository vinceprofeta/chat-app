'use strict';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import { Actions } from 'react-native-router-flux';
import { Form, InputField} from 'react-native-form-generator';
import {
  Text,
  View
} from 'react-native';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const goToPageTwo = () => Actions.chat({text: 'Hello World!'}); 
    return (
      <View style={{margin: 128}}>
        <Text onPress={goToPageTwo}>This is PageTwo!</Text>

        <Form
          ref='registrationForm'
          onFocus={this.handleFormFocus.bind(this)}
          onChange={this.handleFormChange.bind(this)}
          label="Personal Information">
          <InputField ref='email' label='Email' placeholder='Email'/>
          <InputField ref='password' placeholder='Password'/>
        </Form>


        <FBLogin style={{ marginBottom: 10, }}
          permissions={["email","user_friends"]}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          onLogin={(data) => {
            console.log("Logged in!");
            console.log(data);
            // this.setState({ user : data.credentials });
          }}
          onLogout={() => {
            console.log("Logged out.");
            // this.setState({ user : null });
          }}
          onLoginFound={(data) => {
            console.log("Existing login found.");
            console.log(data);
            // this.setState({ user : data.credentials });
          }}
          onLoginNotFound={() => {
            console.log("No user logged in.");
            // this.setState({ user : null });
          }}
          onError={(data) => {
            console.log("ERROR");
            console.log(data);
          }}
          onCancel={() => {
            console.log("User cancelled.");
          }}
          onPermissionsMissing={(data) => {
            console.log("Check permissions!");
            console.log(data);
          }}
        />
      </View>
    );
  }
  handleFormFocus(e) {

  }
}

export default branch(Home, {
  cursors: {
    view: ['home']
  }
});