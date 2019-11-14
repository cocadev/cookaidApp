import React, {Component} from 'react';

import {Alert, Dimensions, Image, TouchableOpacity, FlatList, ScrollView, StatusBar} from 'react-native';
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
  Form
} from 'native-base';
import Icono from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {NavigationActions} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modalbox';
import ConfigApp from '../utils/ConfigApp';
import HTML from 'react-native-render-html';
import {StringI18} from '../utils/Strings';
import {LinearGradient} from 'expo-linear-gradient';
import ColorsApp from '../utils/ColorsApp';
import {Grid, Row, Col} from 'react-native-easy-grid';


var styles = require('../../assets/files/Styles');
var width = Dimensions.get('window').width;

export default class Register extends Component {
  static navigationOptions = {
    header: null
  };
  validateEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      this.setState({email: email})
      return false;
    }
    else {
      this.setState({email: email})
    }
  }
  validatePass = (password) => {
    let PassLength = password.length.toString();
    if (PassLength >= 6) {
      this.setState({password: password})
      return false;
    }
    else {
      this.setState({password: password})
    }
  }

  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      isLoading: true,
      isVisible: false,
      isOpen: false,
      isDisabled: false,
      swipeToClose: false,
      sliderValue: 0.3
    };

  }

  componentDidMount() {

    return fetch(ConfigApp.URL + 'json/data_strings.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  register() {

    const {name} = this.state;
    const {email} = this.state;
    const {password} = this.state;

    if (name, email, password) {
      const errorHandler = ((e) => {
        console.log(e);
        if (e.code == 'auth/email-already-in-use') {
          Toast.show({text: `${StringI18.t('ST36')}`, position: 'bottom', buttonText: `${StringI18.t('ST33')}`})

        } else {
          Toast.show({text: `${StringI18.t('ST32')}`, position: 'bottom', buttonText: `${StringI18.t('ST33')}`})
        }

      })
      firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
        firebase.auth().currentUser.updateProfile({
          displayName: name,
        }).then(() => {
        }).catch(errorHandler);

      }).catch(errorHandler)
    }
  }

  terms() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Terms'
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
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>{StringI18.t('ST27')}</Text>
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
                <Icono name="md-person" style={{fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4'}}/>
                <Input onChangeText={name => this.setState({name})} placeholder={StringI18.t('ST104')}
                       placeholderTextColor="#a4a4a4" style={{fontSize: 16, color: '#a4a4a4'}}/>
              </Item>

              <Item rounded style={styles.inputLogin}>
                <Icono name="md-mail" style={{fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4'}}/>
                <Input onChangeText={(email) => this.validateEmail(email)} value={this.state.email}
                       placeholder={StringI18.t('ST105')} placeholderTextColor="#a4a4a4"
                       style={{fontSize: 16, color: '#a4a4a4'}} autoCapitalize="none"/>
              </Item>

              <Item rounded style={styles.inputLogin}>
                <Icono name="md-lock" style={{fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4'}}/>
                <Input onChangeText={(password) => this.validatePass(password)} value={this.state.password}
                       placeholder={StringI18.t('ST106')} placeholderTextColor="#a4a4a4"
                       style={{fontSize: 16, color: '#a4a4a4'}} secureTextEntry={true} autoCapitalize="none"/>
              </Item>

            </Form>


            <TouchableOpacity onPress={this.register.bind(this)} activeOpacity={1}>
              <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]}
                              style={styles.button_auth}>
                <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 14}}>{StringI18.t('ST52').toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.terms.bind(this)} activeOpacity={1}>
              <Text style={styles.text_auth}>{StringI18.t('ST51').toUpperCase()}</Text>
            </TouchableOpacity>


          </View>
        </KeyboardAwareScrollView>

      </Container>
    )
  }
}
