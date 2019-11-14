import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Dimensions, Image, Linking, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { Body, Container, Left, List, ListItem, Right, Text } from 'native-base';
import Icono from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import ConfigApp from '../utils/ConfigApp';
import { StringI18 } from '../utils/Strings';
import { LinearGradient } from 'expo-linear-gradient';
import ColorsApp from '../utils/ColorsApp';
import app from '../../app.json';

import { Col, Grid, Row } from 'react-native-easy-grid';

var styles = require('../../assets/files/Styles');
var { height, width } = Dimensions.get('window');

export default class Settings extends Component {
  static navigationOptions = {
    header: null
  };
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  constructor(props) {

    super(props);

    this.state = {
      loading: true,
      rated: false
    }

  }

  openInBrowser = (url) => {
    return Linking.openURL(url);
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
        <StatusBar barStyle="dark-content" />

        <ScrollView>

          <LinearGradient colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)']}
            style={{ paddingTop: 45, paddingHorizontal: 30, width: width, marginBottom: 5 }}>

            <Grid>
              <Col style={{ alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
                  <Icono name="md-arrow-back" style={{ fontSize: 27, color: '#000' }} />
                </TouchableOpacity>
              </Col>
              <Col size={2} style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{StringI18.t('ST7')}</Text>
              </Col>
              <Col style={{ alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end' }}>
              </Col>
            </Grid>
          </LinearGradient>

          <Grid>

            <Row style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFF',
              height: height * 0.30,
              padding: 30,
              paddingBottom: 0
            }}>
              <Image
                source={require('../../assets/images/logo-side.png')}
                style={{ flex: 1, width: 130, height: 130 }}
                resizeMode='contain' />
              <Text style={{
                position: 'absolute',
                color: ColorsApp.PRIMARY,
                fontWeight: 'bold',
                bottom: 0,
              }}>
                {StringI18.t('Version')} {app.expo.version}
              </Text>
            </Row>
          </Grid>

          <View style={{ padding: 45, paddingTop: 30 }}>

            <List>
              <ListItem icon style={{ marginLeft: 0, borderBottomWidth: 0 }}
                onPress={this.navigateToScreen('AboutUsScreen')}>
                <Left style={{ borderBottomWidth: 0 }}>
                </Left>
                <Body style={{
                  borderBottomWidth: 0, justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontWeight: 'bold',
                    color: '#797979'
                  }}>{StringI18.t('ST9')}</Text>
                </Body>
                <Right style={{ borderBottomWidth: 0 }}>
                </Right>
              </ListItem>

              <ListItem icon style={{ marginLeft: 0, borderBottomWidth: 0 }}
                onPress={() => this.openInBrowser("http://www.cookaid.net/privacy-policy.html")}>
                <Left style={{ borderBottomWidth: 0 }}>
                </Left>
                <Body style={{
                  borderBottomWidth: 0, justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontWeight: 'bold',
                    color: '#797979',
                  }}>{StringI18.t('ST82')}</Text>
                </Body>
                <Right style={{ borderBottomWidth: 0 }}>
                </Right>
              </ListItem>

              <ListItem icon style={{ marginLeft: 0, borderBottomWidth: 0 }}
                onPress={this.navigateToScreen('ContactUsScreen')}>
                <Left style={{ borderBottomWidth: 0 }}>
                </Left>
                <Body style={{
                  borderBottomWidth: 0, justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontWeight: 'bold',
                    color: '#797979',
                  }}>{StringI18.t('ST75')}</Text>
                </Body>
                <Right style={{ borderBottomWidth: 0 }}>
                </Right>
              </ListItem>



            </List>

          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            paddingTop: 10
          }}>

            <TouchableOpacity onPress={() => {
              Linking.openURL(ConfigApp.FACEBOOK)
            }}><Icon name="facebook-with-circle" style={styles.socialIcon} /></TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Linking.openURL(ConfigApp.SKYPE)
            }}><Icon name="skype-with-circle" style={styles.socialIcon} /></TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Linking.openURL(ConfigApp.WEB)
            }}><Icon name="500px-with-circle" style={styles.socialIcon} /></TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Linking.openURL(ConfigApp.EMAIL)
            }}><Icon name="mail-with-circle" style={styles.socialIcon} /></TouchableOpacity>

          </View>

        </ScrollView>

      </Container>

    )
  }

}
