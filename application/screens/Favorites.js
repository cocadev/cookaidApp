import React, {Component} from 'react';
import {NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import {
  ImageBackground,
  Dimensions,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Footer,
  Icon,
  Item,
  Input,
  FooterTab,
  Button,
  Left,
  Right,
  Title,
  List,
  ListItem,
  Thumbnail
} from 'native-base';
import Icono from 'react-native-vector-icons/Ionicons';
import ConfigApp from '../utils/ConfigApp';
import AppPreLoader from '../components/AppPreLoader';
import RecipeFav from '../components/RecipeFav';
import Strings from '../utils/Strings';
import {LinearGradient} from 'expo-linear-gradient';
import ColorsApp from '../utils/ColorsApp';

import {Grid, Row, Col} from 'react-native-easy-grid';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Favorites extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true
    };
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
        <StatusBar barStyle="dark-content"/>

        <ScrollView>

          <LinearGradient colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)']}
                          style={{paddingTop: 45, paddingHorizontal: 30, width: width, marginBottom: 5}}>

            <Grid>
              <Col style={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
                  <Icono name="md-arrow-back" style={{fontSize: 27, color: '#000'}}/>
                </TouchableOpacity>
              </Col>
              <Col size={2} style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>{Strings.ST6}</Text>
              </Col>
              <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
              </Col>
            </Grid>
          </LinearGradient>

          <RecipeFav/>

        </ScrollView>


      </Container>

    )
  }
}
