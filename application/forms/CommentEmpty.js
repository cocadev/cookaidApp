import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";
import {StringI18} from '../utils/Strings';

export default class CommentEmpty extends Component {
  render() {
    return (
      <View>
        <Text style={{padding: 20, textAlign: 'center', alignItems: 'center'}}>{StringI18.t('ST86')}</Text>
      </View>
    )
  }
}
