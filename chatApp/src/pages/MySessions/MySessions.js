import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import ResponsiveImage from 'react-native-responsive-image';
import Icon from 'react-native-vector-icons/Ionicons';
import ellipsize from 'ellipsize';
import {
  StatusBar,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Text,
  TextInput,
  View,
  Dimensions,
  ListView,
  Image,
  TouchableHighlight,
  Easing
} from 'react-native';


class MySessions extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.get(nextProps, 'sessions', []).length === _.get(this.props, 'sessions', []).length) {
      return false
    }
    return true;
  }

  componentWillMount() {
    this.registerList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.registerList(nextProps);
  }

  registerList(props) {
    const sessions = _.get(props, 'sessions', []);
    if (sessions.length) {
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      });
      this.setState({
        dataSource: ds.cloneWithRows(sessions),
      });
    }
  }

  render() {
    console.log(this.props)
    return (
      this.state.dataSource ?
         <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, i) => {
            return (
              <View key={1}>                
                <TouchableHighlight onPress={this.onPress.bind(this, rowData._id)} underlayColor='#999'>
                  <View>
                     <ResponsiveImage source={{uri: rowData.listing.image}} initWidth="100%" initHeight="250"/>
                     <View style={styles.backgroundImage}>
                        <Text style={styles.text}>{rowData.listing.name}</Text> 
                        <Text style={styles.subtext}>{ellipsize(rowData.listing.description, 60)}</Text> 
                     </View>
                  </View>
                </TouchableHighlight>
                
              </View>
            )
          }}        
        />
      : <View style={{margin: 128}}>
      <Text> loading</Text>
    </View>
    );
  }

  onPress(id) {
    
  }

}

let styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    position: 'relative'
  },
  backgroundImage: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
    paddingBottom: 5,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowRadius: 2,
    textShadowOffset: {
      width: 1,
      height: 1
    }
  },
  subtext: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1
    }
  }
});


export default branch(MySessions, {
  cursors: {
    sessions: ['facets', 'MyUpcomingSessions'] 
  }
});