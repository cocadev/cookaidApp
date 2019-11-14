import React, {PureComponent} from 'react';
import {View, NetInfo, Dimensions, Image} from 'react-native';
import {Text, Button} from 'native-base';
import Strings, {StringI18} from '../utils/Strings';

const {width, height} = Dimensions.get('window');
var styles = require('../../assets/files/Styles');

function MiniOfflineSign() {
  return (
    <View style={{
      height: height,
      width: width,
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 9,
      backgroundColor: '#FFF'
    }}>
      <Image source={require('../../assets/images/nointernet.png')}
             style={{width: 120, height: 120, marginBottom: 10}}/>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>{StringI18.t('ST68')}</Text>
      <Text style={{fontSize: 16, marginBottom: 30, color: '#b5b5b5'}}>{StringI18.t('ST69')}</Text>
      <View>
        <Button rounded block style={styles.button_auth}>
          <Text>{StringI18.t('ST70')}</Text>
        </Button>
      </View>
    </View>
  );
}

class OfflineBar extends PureComponent {

  state = {
    isConnected: true
  };
  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({isConnected});
    } else {
      this.setState({isConnected});
    }
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign/>;
    }
    return null;
  }
}

export default OfflineBar;
