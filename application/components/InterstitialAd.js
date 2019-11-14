import React, { Component } from 'react';
import { AdMobInterstitial } from 'expo-ads-admob';

class InterstitialAd extends React.Component {

  _loadInitialState = async () => {

    AdMobInterstitial.setAdUnitID(''); // Test ID, Replace with your-admob-unit-id
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  };

  componentDidMount() {
    this._loadInitialState().done();
  }

}

export default InterstitialAd;
