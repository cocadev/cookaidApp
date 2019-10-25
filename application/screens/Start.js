import React, {Component} from 'react';

var styles = require('../../assets/files/Styles');
import {Alert, Image, TouchableOpacity} from 'react-native';
import BackgroundImage from "../components/BackgroundImage";
import {Container, Body, Footer, Input, Icon, Item, Text, Toast, View, Button} from 'native-base';
import {NavigationActions} from 'react-navigation';
import * as firebase from 'firebase';
import Strings from '../utils/Strings';
import ColorsApp from '../utils/ColorsApp';
import {LinearGradient} from 'expo-linear-gradient';
import Facebook from '../utils/Facebook';


export default class Start extends Component {
  static navigationOptions = {
    header: null
  };

  login() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Login'
    });
    this.props.navigation.dispatch(navigateAction);
  }

  register() {

    const navigateAction = NavigationActions.navigate({
      routeName: 'Register'
    });
    this.props.navigation.dispatch(navigateAction);

  }

  async facebook() {
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
      Facebook.config.application_id,
      {permissions: Facebook.config.permissions}
    );

    if (type === "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credentials)
        .catch(error => {
          Toast.show({text: `${Strings.ST32}`, position: 'bottom', buttonText: `${Strings.ST33}`})

        })
    }
  }

  render() {

    return (

      <Container style={{backgroundColor: '#FFFFFF'}}>
        <Body>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo_start} resizeMode="contain"/>

          <Button block onPress={this.login.bind(this)} style={styles.button_start}>
            <Text style={styles.button_start_text}>{Strings.ST26.toUpperCase()}</Text>
          </Button>

          <TouchableOpacity onPress={this.register.bind(this)} activeOpacity={1}>
            <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]}
                            style={styles.button_start_2}>
              <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 14}}>{Strings.ST27.toUpperCase()}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.facebook.bind(this)} activeOpacity={1}>
            <LinearGradient colors={['#3b5998', '#4f6eb1']} start={[0, 0]} end={[1, 0]} style={styles.button_start_2}>
              <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 14}}>{Strings.ST47.toUpperCase()}</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>


        </Body>
      </Container>
    );
  }
}