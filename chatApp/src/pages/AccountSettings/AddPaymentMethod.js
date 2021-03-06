'use strict';
import _ from 'lodash';
import addStripeCard from '../../utility/stripe'
import {submitPaymentMethod} from '../../actions/PaymentMethodActions';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';

import NavBar from '../../components/NavBar/NavBar';
import * as constants from '../../styles/styleConstants';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';


import PaymentMethodForm from '../../components/Forms/PaymentMethodForm';

class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, marginTop: constants.NAV_HEIGHT}}>
         <PaymentMethodForm
          submitPaymentMethod={this.submitPaymentMethod.bind(this)} 
          paymentMethods={[]} 
          paymentMethod={this.props.newPaymentMethod.card}/>
        </View>
        <NavBar title={'Add Payment'} leftAction={this.props.goBack.bind(this)}  />
      </View>
    );
  }
  
  async submitPaymentMethod(data) {
    submitPaymentMethod(data);
  }
}

export default branch(CreditCard, {
  cursors: {
    newPaymentMethod: ['newPaymentMethod']
  }
});