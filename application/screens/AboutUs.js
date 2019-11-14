import React, { Component } from 'react';
import AppPreLoader from '../components/AppPreLoader';
import { Dimensions, Linking, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import Icono from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Text } from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import { StringI18 } from '../utils/Strings';
import Strings from '../utils/Strings';


var styles = require('../../assets/files/Styles');
var { height, width } = Dimensions.get('window');

class AboutUs extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
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

  onLinkPress = (href) => {
    Linking.openURL(href);
  }

  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader />
      );
    }

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
                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{StringI18.t('ST9')}</Text>
              </Col>
              <Col style={{ alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end' }}>
              </Col>
            </Grid>
          </LinearGradient>

          <View style={{ padding: 20 }}>

            <Text style={styleAboutUs.textStyle}>
              {StringI18.t('AboutUs1')}
            </Text>
            <Text style={[styleAboutUs.textStyle, styleAboutUs.textMarginTop]}>
              {StringI18.t('AboutUs2')}
            </Text>
            <TouchableOpacity onPress={() => this.onLinkPress(Strings.AboutUsLinkSupport)}>
              <Text style={[styleAboutUs.textStyle, styleAboutUs.linkStyle, styleAboutUs.textMarginTop]}>
                {StringI18.t('AboutUsLinkSupport')}
              </Text>
            </TouchableOpacity>

            <Text style={[styleAboutUs.textStyle, styleAboutUs.textMarginTop]}>
              {StringI18.t('AboutUs3')}
            </Text>

            <TouchableOpacity onPress={() => this.onLinkPress(Strings.AboutUsLinkPrivacy)}>
              <Text style={[styleAboutUs.textStyle, styleAboutUs.linkStyle, styleAboutUs.textMarginTop]}>
                {StringI18.t('AboutUsLinkPrivacy')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </Container>

    )
  }

}

const styleAboutUs = StyleSheet.create({
  textStyle: {
    fontSize: 15,
  },
  linkStyle: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  textMarginTop: {
    marginTop: 16,
  }
});

export default AboutUs;
