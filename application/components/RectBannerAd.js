import React, {Component} from 'react';
import ConfigApp from '../utils/ConfigApp';
import { AdMobBanner } from 'expo-ads-admob';

var styles = require('../../assets/files/Styles');

class RectBannerAd extends React.Component {

  render() {

    return (

      <AdMobBanner
        bannerSize="mediumRectangle"
        adUnitID={ConfigApp.BANNER_ID}
        testDeviceID={ConfigApp.TESTDEVICE_ID}
        onDidFailToReceiveAdWithError={this.bannerError}/>

    )
  }

}

export default RectBannerAd;
