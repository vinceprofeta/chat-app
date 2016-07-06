'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import BPromise from 'bluebird';
import moment from 'moment';
import TimeRow from './TimeRow';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  PanResponder
} from 'react-native';

class HoursInTheDay extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      pannedDays: [],
      scroll: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.stopReg = true;
    }, 200)
  }
  
  componentWillMount() {
    this.components = [];
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponderCapture: this.panStart.bind(this),
      onPanResponderGrant: this.panCapture.bind(this),
      onPanResponderMove: this.panMove.bind(this),
      onPanResponderRelease: this.panEnd.bind(this)
    })
  }

  onMoveShouldSetPanResponder(evt, gesture) {
    return gesture.numberActiveTouches === 1
  }

  async measureComponents(comp) {
    return new BPromise((resolve) => {
      try {
        comp.measure( (fx, fy, width, height, px, py) => {
          resolve({
            bottom: py + height,
            height: height,
            left: px,
            right: px + width,
            top: py,
            width: width
          });
        });
      } catch(err) {

      }
    }) 
  }

  reMeasureComponents() {
    _.forEach(this.components, (component = {}) => {
      if (component.id) {
        const {id, day, row, column, comp} = component;
        this.register(id, day, row, column, comp, 'overridePosition')
      }      
    })
  }

  panCapture(e, r) {
    
  }

  panStart(e, r) {
    console.log(r.dy)
    if (r.dy < 1.8 && r.dy > -1.8) {
      console.log('hit')
      this.allowPan = true;
      const day = this.findDay(r);
      if (day) {
        this.setState({activeRow: day.row, scroll: false});
      }
    }
  }

  panMove(e, r) {
    console.log(this.allowPan)
    if (!this.allowPan) {
      return;
    }
    this.isPanning = true;
    const day = this.findDay(r);

    if (day && day.id !== this.lastPanned) {
      const pannedDays = _.clone(this.state.pannedDays);
      this.lastPanned = day.id;
      pannedDays.push(day); 
      this.setState({pannedDays: _.uniqBy(pannedDays, 'id')});
    }
  }

  panEnd(e) {
    if (!this.allowPan) {
      return;
    }
    this.setState({scroll: true});
    this.allowPan = false;
  }

  findDay(e) {    
    return _.find(this.components, (comp) => {
      const rect = comp.boundingRect; 
      return e.moveX > rect.left &&
      e.moveX < rect.right  &&
      e.moveY > rect.top &&
      e.moveY < rect.bottom;
    });
  }

  async register(id, day, row, column, comp, originOveride) {    
    if (comp) {
      const index = _.findIndex(this.components, {id: id});
      let originalRect;
      if (index >= 0) {
        originalRect = this.components[index].boundingRect;
        this.components.splice(index, 1);
      }
      let rect;
      if(originalRect && !originOveride) {
        rect = originalRect;
      } else {
        rect = await this.measureComponents(comp);
      }
      this.components.push({
        comp,
        id,
        row,
        column,
        day,
        boundingRect: rect
      })
    }
  }



  render() {
    return (
      <ScrollView scrollEnabled={this.state.scroll} {...this._panResponder.panHandlers} scrollEventThrottle={20} onScroll={this.onScrollEvent.bind(this)} >
        {
          _.map(this.props.hours, (hour, i) => {
            return <TimeRow scroll={this.state.scroll} activeRow={this.state.activeRow} week={this.props.week} key={i} i={i} register={this.register.bind(this)} hour={hour} pannedDays={this.state.pannedDays} />
          })
        }
      </ScrollView>
    );
  }

  onScrollEvent(e) {
    this.reMeasureComponents();
  }
}


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  even: {
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
  },
  days: {
    width: (Dimensions.get('window').width / 8) - 0.5,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dayInner: {
    width: (Dimensions.get('window').width / 8) - 0.5,
    height: 30,
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayStart: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  dayEnd: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  active: {
    backgroundColor: 'red',
  }
  
});

export default HoursInTheDay;