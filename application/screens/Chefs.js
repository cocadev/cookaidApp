import React, {Component} from 'react';
import {Dimensions, FlatList, Image, ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import {Container, Text} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import Icono from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';
import ConfigApp from '../utils/ConfigApp';
import AppPreLoader from '../components/AppPreLoader';
import Strings from '../utils/Strings';
import {bindActionCreators} from "redux";
import {fetchCuisine} from "../redux/actions/cuisineActions";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import CacheImage from "../components/CacheImage";


var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');
const equalWidth = (width / 2);

class ChefsScreen extends Component {
  static navigationOptions = {
    header: null
  };
  RecipesByChef = (chef_id, chef_title) => {
    this.props.navigation.navigate('RecipesByChefScreen', {IdChef: chef_id, TitleChef: chef_title});
  }
  search = (string) => {
    this.props.navigation.navigate('SearchScreen', {string: ''});
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    if (!this.props.cuisines) {
      this.props.fetchCuisine();
    }
  }

  componentDidMount() {

  }

  render() {

    if (this.props.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    const {params} = this.props.navigation.state;


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
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>{Strings.ST3}</Text>
              </Col>
              <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={this.search.bind(this)} activeOpacity={1}>
                  <Icono name="md-search" style={{fontSize: 27, color: '#000'}}/>
                </TouchableOpacity>
              </Col>
            </Grid>
          </LinearGradient>

          <View style={{padding: 5, paddingTop: 10, backgroundColor: '#FFF'}}>

            <FlatList
              data={
                this.props.cuisines.sort(function(a, b){
                  var x = a.chef_title.toLowerCase();
                  var y = b.chef_title.toLowerCase();
                  if (x < y) return -1;
                  if (x > y) return 1;
                  return 0;
                })
              }
              refreshing="false"
              numColumns={3}
              renderItem={({item}) =>
                <TouchableOpacity onPress={this.RecipesByChef.bind(this, item.chef_id, item.chef_title)}
                                  activeOpacity={1} style={{
                  flex: 1,
                  marginHorizontal: 5,
                  marginBottom: 15,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CacheImage uri={ConfigApp.URL + 'images/' + item.chef_image}
                         style={{height: 80, width: 80, marginBottom: 10, borderRadius: 80 / 2}}
                         imageStyle={{borderRadius: 80 / 2}}/>
                  <Text numberOfLines={1}
                        style={{color: '#9e9e9e', fontSize: 11, marginBottom: 5, textTransform: 'capitalize'}}>{item.chef_title}</Text>
                </TouchableOpacity>
              }
              keyExtractor={(item, index) => index.toString()}

            />

          </View>

          <View style={{height: height * 0.10}}/>

        </ScrollView>


      </Container>


    )
  }
}


const mapStateToProps = state => {
  return {
    cuisines: state.cuisine.cuisines,
    isLoading: state.cuisine.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCuisine,
  }, dispatch)
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ChefsScreen));
