import React, {Component} from 'react';
import {View} from 'react-native';
import ConfigApp from '../utils/ConfigApp';
import { AdMobBanner } from 'expo-ads-admob';
import {isIphoneX} from 'react-native-device-detection';

const Device = require('react-native-device-detection');

var styles = require('../../assets/files/Styles');

class BannerAd extends React.Component {


  _segmentPicker() {
    if (Device.isIphoneX) {
      return (
        <View style={styles.bannerAd}>
          <AdMobBanner
            bannerSize="banner"
            adUnitID={ConfigApp.BANNER_ID}
            testDeviceID={ConfigApp.TESTDEVICE_ID}
            onDidFailToReceiveAdWithError={this.bannerError}/>
        </View>
      );
    } else {
      return (
        <View style={styles.bannerAdLight}>
          <AdMobBanner
            bannerSize="banner"
            adUnitID={ConfigApp.BANNER_ID}
            testDeviceID={ConfigApp.TESTDEVICE_ID}
            onDidFailToReceiveAdWithError={this.bannerError}/>
        </View>
      );
    }
  }

  render() {

    return (

      <View>
        {this._segmentPicker()}
      </View>

    )
  }

}

export default BannerAd;
