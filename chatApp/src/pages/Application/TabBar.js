import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import Tabs from 'react-native-tabs';
import TabbedView from './TabbedView';
import {Actions, Scene, Router, Tab, DefaultRenderer, Util} from 'react-native-router-flux';
const  deepestExplicitValueForKey = Util.deepestExplicitValueForKey;

class TabBar extends Component {

  static propTypes = {
    navigationState: PropTypes.object,
    tabIcon: PropTypes.any,
    onNavigate: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.renderScene = this.renderScene.bind(this);
  }

  onSelect(el) {
    if (!Actions[el.props.name]) {
      throw new Error(
        `No action is defined for name=${el.props.name} ` +
        `actions: ${JSON.stringify(Object.keys(Actions))}`);
    }
    Actions[el.props.name]();
  }

  renderScene(navigationState) {
    return (
      <DefaultRenderer
        key={navigationState.key}
        onNavigate={this.props.onNavigate}
        navigationState={navigationState}
      />
    );
  }

  render() {
    const state = this.props.navigationState;

    const hideTabBar = deepestExplicitValueForKey(state, 'hideTabBar');
    return (
      <View
        style={{ flex: 1 }}
      >
        <TabbedView
          navigationState={this.props.navigationState}
          style={{ flex: 1 }}
          renderScene={this.renderScene}
        />
        {!hideTabBar && state.children.filter(el => el.icon).length > 0 &&
          <Tabs
            style={[{ backgroundColor: 'white' }, state.tabBarStyle]}
            selectedIconStyle={[{ backgroundColor: 'white' }, state.tabBarSelectedItemStyle]}
            onSelect={this.onSelect} {...state}
            selected={state.children[state.index].sceneKey}
          >
            {state.children.filter(el => el.icon || this.props.tabIcon).map(el => {
              const Icon = el.icon || this.props.tabIcon;
              return <Icon {...this.props} {...el} />;
            })}
          </Tabs>
        }
      </View>
    );
  }

}

export default TabBar;