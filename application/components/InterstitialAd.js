import React, {Component} from 'react';
import ConfigApp from '../utils/ConfigApp';
import { AdMobInterstitial } from 'expo-ads-admob';

class InterstitialAd extends React.Component {

  _loadInitialState = async () => {

    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  };

  componentDidMount() {

    this._loadInitialState().done();
  }

}

export default InterstitialAd;
