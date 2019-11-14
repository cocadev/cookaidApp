import React, {Component} from 'react';
import { View, Text} from 'react-native';
import Strings, {StringI18} from '../utils/Strings';

class NoData extends React.Component {

  render() {

    return (

      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 14, marginBottom: 8, color: '#D1D1D1'}}>{StringI18.t('ST67')}</Text>
      </View>

    )
  }

}

export default NoData;
