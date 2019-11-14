import React, {Component} from 'react';

var styles = require('../../assets/files/Styles');
import {Alert, Dimensions, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  Body,
  Footer,
  Header,
  Input,
  Item,
  Left,
  Text,
  Title,
  Right,
  View,
  Button,
  Toast,
  Label,
  Form
} from 'native-base';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icono from 'react-native-vector-icons/Ionicons';
import {NavigationActions} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LinearGradient} from 'expo-linear-gradient';
import ColorsApp from '../utils/ColorsApp';
import {StatusBar} from "react-native";
import {Grid, Row, Col} from 'react-native-easy-grid';

import {StringI18} from '../utils/Strings';

var width = Dimensions.get('window').width;

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    ;
    this.state = {

      email: '',
      password: ''
    }
  }

  login() {

    const {email} = this.state;
    const {password} = this.state;

    if (email, password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {

            Toast.show({text: `${StringI18.t('ST30')}`, position: 'bottom', buttonText: `${StringI18.t('ST33')}`})

          }
          else if (errorCode === 'auth/user-not-found') {

            Toast.show({text: `${StringI18.t('ST31')}`, position: 'bottom', buttonText: `${StringI18.t('ST33')}`})

          }
          else {
            Toast.show({text: `${StringI18.t('ST32')}`, position: 'bottom', buttonText: `${StringI18.t('ST33')}`})
          }

        });
    }

  }

  forgetpass() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'ForgetPass'
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (

      <Container style={styles.background_general}>

        <LinearGradient colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.0)']} style={{
          position: 'absolute',
          top: 0,
          zIndex: 100,
          paddingTop: 45,
          paddingHorizontal: 30,
          width: width
        }}>
        </LinearGradient>

        <KeyboardAwareScrollView>


          <LinearGradient colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)']}
                          style={{paddingTop: 45, paddingHorizontal: 30, width: width, marginBottom: 5}}>

            <Grid>
              <Col style={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
                  <Icono name="md-arrow-back" style={{fontSize: 27, color: '#000'}}/>
                </TouchableOpacity>
              </Col>
              <Col size={2} style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>{StringI18.t('ST26')}</Text>
              </Col>
              <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
              </Col>
            </Grid>
          </LinearGradient>


          <View
            style={{flex: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20}}>
            <Image source={require('../../assets/images/logo_dark.png')} style={styles.logo_start}
                   resizeMode="contain"/>

            <Form ref="formId" style={{marginTop: 15}}>

              <Item rounded style={styles.inputLogin}>
                <Icono name="md-mail" style={{fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4'}}/>
                <Input onChangeText={email => this.setState({email})} placeholder={StringI18.t('ST105')}
                       placeholderTextColor="#a4a4a4" style={{fontSize: 16, color: '#a4a4a4'}} autoCapitalize="none"/>
              </Item>

              <Item rounded style={styles.inputLogin}>
                <Icono name="md-lock" style={{fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4'}}/>
                <Input onChangeText={password => this.setState({password})} placeholder={StringI18.t('ST106')}
                       placeholderTextColor="#a4a4a4" style={{fontSize: 16, color: '#a4a4a4'}} secureTextEntry={true}
                       autoCapitalize="none"/>
              </Item>

            </Form>

            <TouchableOpacity onPress={this.login.bind(this)} activeOpacity={1}>
              <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]}
                              style={styles.button_auth}>
                <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 14}}>{StringI18.t('ST28').toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.forgetpass.bind(this)} style={styles.text_auth} activeOpacity={1}>
              <Text style={styles.text_auth}>{StringI18.t('ST29').toUpperCase()}</Text>
            </TouchableOpacity>


          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}
