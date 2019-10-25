import React, {Component} from 'react';

import {NavigationActions, StackNavigator, DrawerActions} from 'react-navigation';
import {
  ImageBackground,
  Dimensions,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
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
import {Grid, Row, Col} from 'react-native-easy-grid';
import Icono from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';
import SwiperFlatList from 'react-native-swiper-flatlist';
import ConfigApp from '../utils/ConfigApp';
import RecipesHome from '../components/RecipesHome';
import GridRecipesHome from '../components/GridRecipesHome';
import CategoriesHome from '../components/CategoriesHome';
import ChefsHome from '../components/ChefsHome';
import GridView from 'react-native-super-grid';
import Strings from '../utils/Strings';
import ColorsApp from '../utils/ColorsApp';
import {bindActionCreators} from "redux";
import {search} from "../redux/actions/searchActions";
import {connect} from "react-redux";




var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');
const equalWidth = (width / 2);

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }
  search = (string, isRandomRecipe = false) => {
    if (!isRandomRecipe) {
      this.props.search(this.state.string || string);
    }
    this.props.navigation.navigate('SearchScreen', {string: this.state.string || string, isRandomRecipe});
  }

  constructor(props) {
    super(props);
    this.state = {
      string: ''
    };
  }

  categories() {

    const navigateAction = NavigationActions.navigate({
      routeName: 'RecipesCategoriesScreen'
    });
    this.props.navigation.dispatch(navigateAction);

  }

  chefs() {

    const navigateAction = NavigationActions.navigate({
      routeName: 'ChefsScreen'
    });
    this.props.navigation.dispatch(navigateAction);

  }

  render() {

    return (

      <Container style={styles.background_general}>

        <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.0)']} style={{
          position: 'absolute',
          top: 0,
          zIndex: 100,
          paddingTop: 45,
          paddingHorizontal: 30,
          width: width
        }}>
        </LinearGradient>


        <ScrollView>


          <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.0)']} style={{
            position: 'absolute',
            top: 0,
            zIndex: 100,
            paddingTop: 45,
            paddingHorizontal: 30,
            width: width
          }}>

            <Grid>
              <Col style={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}>
                <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                                  activeOpacity={1}>
                  <Icono name="md-menu" style={{fontSize: 27, color: '#FFFFFF'}}/>
                </TouchableOpacity>
              </Col>
              <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={this.search.bind(this, this.state.string, false)} activeOpacity={0.9}>
                  <Icono name="md-search" style={{fontSize: 27, color: '#FFFFFF'}}/>
                </TouchableOpacity>
              </Col>
            </Grid>
          </LinearGradient>


          <ImageBackground source={require('../../assets/images/header.jpg')} style={{
            flexDirection: 'column',
            height: height * 0.35,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image source={require('../../assets/images/logo-white.png')}
                   style={{
                     width: width * 0.25,
                     height: height * 0.25,
                     marginBottom: height * (0.29 - 0.25)/2
                   }} resizeMode="contain"/>
          </ImageBackground>

          <View style={{
            position: 'relative',
            marginTop: -25,
            zIndex: 100,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center'
          }}>
            <Item rounded style={styles.itemSearch}>
              <TouchableOpacity onPress={this.search.bind(this, this.state.string, false)} activeOpacity={0.9}>
                <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]}
                                style={styles.homesearch} activeOpacity={1}>
                  <Icono name='md-search' style={{fontSize: 20, color: '#FFF'}}/>
                </LinearGradient>
              </TouchableOpacity>
              <Input
                ref={ref => this.searchInputRef = ref}
                placeholder={Strings.ST40}
                onChangeText={string => this.setState({string})}
                placeholderTextColor="#a4a4a4"
                style={{fontSize: 15, color: '#a4a4a4'}}
                returnKeyType={"search"}
                returnKeyLabel={"Search"}
                onSubmitEditing={this.search.bind(this, this.state.string, false)}
              />
            </Item>
          </View>
          <ListItem icon style={{borderBottomWidth: 0, marginTop: -8}}>
            <Body style={{borderBottomWidth: 0}}>
            <Text
              style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.6)'}}>{Strings.ST11.toUpperCase()}</Text>
            </Body>
          </ListItem>

          <CategoriesHome/>

          <View style={stylesHome.moreBtnContainer}>
            <TouchableOpacity onPress={this.categories.bind(this)} activeOpacity={1}>
              <View style={{
                padding: 6,
                paddingRight: 14,
                paddingLeft: 14,
                borderWidth: 1,
                borderRadius: 50,
                borderColor: 'rgba(0,0,0,0.2)'
              }}>
                <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.2)'}}> {Strings.ST43.toUpperCase()} <Icono active name="ios-arrow-forward"/></Text>
              </View>
            </TouchableOpacity>
          </View>

          <ListItem icon style={{borderBottomWidth: 0}}>
            <Body style={{borderBottomWidth: 0}}>
            <Text
                style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.6)'}}>{Strings.ST13.toUpperCase()}</Text>
            </Body>
          </ListItem>

          <ChefsHome/>

          <View style={stylesHome.moreBtnContainer}>
            <TouchableOpacity onPress={this.chefs.bind(this)} activeOpacity={1}>
              <View style={{
                padding: 6,
                paddingRight: 14,
                paddingLeft: 14,
                borderWidth: 1,
                borderRadius: 50,
                borderColor: 'rgba(0,0,0,0.2)'
              }}>
                <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.2)'}}> {Strings.ST43.toUpperCase()} <Icono active name="ios-arrow-forward"/></Text>
              </View>
            </TouchableOpacity>
          </View>

          <ListItem icon style={{borderBottomWidth: 0}}>
            <Body style={{borderBottomWidth: 0}}>
            <Text
                style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.6)'}}>{Strings.ST12.toUpperCase()}</Text>
            </Body>
          </ListItem>


          <GridRecipesHome/>

          <View style={stylesHome.moreBtnContainer}>
            <TouchableOpacity onPress={this.search.bind(this, " ", true)} activeOpacity={0.9}>
              <View style={{
                padding: 6,
                paddingRight: 14,
                paddingLeft: 14,
                borderWidth: 1,
                borderRadius: 50,
                borderColor: 'rgba(0,0,0,0.2)'
              }}>

                <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.2)'}}> {Strings.ST43.toUpperCase()} <Icono active
                                                                                                            name="ios-arrow-forward"/></Text>
              </View>
            </TouchableOpacity>
          </View>


          <View style={{height: height * 0.05}}>
          </View>

        </ScrollView>

      </Container>


    )
  }
}

const stylesHome = StyleSheet.create({
  moreBtnContainer: {
    alignItems: 'center',
    marginVertical: 12
  }
});

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    search,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
