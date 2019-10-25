import React, {Component} from 'react';
import {Image, View, Dimensions, Text} from 'react-native';
import {NavigationActions, withNavigation} from 'react-navigation';
import Strings from '../utils/Strings';


const {width, height} = Dimensions.get('window');

class ListEmpty extends React.Component {

  render() {

    return (

      <View style={{
        height: height * 0.6,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
      }}>
        <Image source={require('../../assets/images/chef.png')} style={{width: 70, height: 70, marginBottom: 20}}
               resizeMode="contain"/>
        <Text style={{fontSize: 13, marginBottom: 15, color: '#a4a4a4'}}>{Strings.ST67.toUpperCase()}</Text>
      </View>

    )
  }

}

export default withNavigation(ListEmpty);
