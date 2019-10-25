import React, {Component} from 'react';
import {NavigationActions, StackNavigator} from 'react-navigation';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View
} from 'react-native';
import Icono from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';
import {Container, ListView, Text} from 'native-base';
import ConfigApp from '../utils/ConfigApp';

import {Col, Grid} from 'react-native-easy-grid';
import ColorsApp from '../utils/ColorsApp';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {clearRecipesByCuisine, searchNextPageCuisine, searchRecipesByCuisine} from "../redux/actions/searchActions";
import {isCloseToBottom} from "../utils/utils";
import CategoryCuisineComponent from "../components/CategoryCuisineComponent";
import CacheImageBackground from "../components/CacheImageBackground";


var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

class RecipesByChef extends Component {
  static navigationOptions = {
    header: null
  };
  search = (string) => {
    this.props.navigation.navigate('SearchScreen', {string: ''});
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.props.clearRecipesByCuisine();
    this.props.searchRecipesByCuisine(this.props.navigation.state.params);
  }

  RecipeDetails(item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'RecipeDetailsScreen',
      params: {item}
    });
    this.props.navigation.dispatch(navigateAction);
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.RecipeDetails(item)} activeOpacity={1} style={{marginBottom: 5}}>
        <CacheImageBackground uri={item && item.isSpoonacular ? item.recipe_image : ConfigApp.URL + 'images/' + item.recipe_image}
                         style={styles.background_card}>
          <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)']} style={styles.gradient_card}>
            <CategoryCuisineComponent item={item}/>
            <Text numberOfLines={3} style={styles.title_card}>{item.recipe_title}</Text>
            <View style={{flexDirection: 'row', marginTop: 3}}>
              <Image source={require('../../assets/images/cooktime.png')}
                     style={{width: 15, height: 15, marginRight: 5}}/>
              <Text style={{fontSize: 12, color: '#fff', marginRight: 5}}>{item.recipe_time}</Text>
              <Image source={require('../../assets/images/calories.png')}
                     style={{width: 15, height: 15, marginRight: 5}}/>
              <Text style={{fontSize: 12, color: '#fff'}}>{item.recipe_cals}</Text>
            </View>

          </LinearGradient>
        </CacheImageBackground>
      </TouchableOpacity>
    )
  }

  render() {

    const {isLoading, recipesByCuisine} = this.props;

    const {params} = this.props.navigation &&  this.props.navigation.state ? this.props.navigation.state : {};
    const IdChef = params ? params.IdChef : null;

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

        <ScrollView
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent) && !isLoading) {
              this.props.searchNextPageCuisine(params);
            }
          }}
          scrollEventThrottle={400}
        >

          <LinearGradient colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)']}
                          style={{paddingTop: 45, paddingHorizontal: 30, width: width, marginBottom: 5}}>

            <Grid>
              <Col style={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
                  <Icono name="md-arrow-back" style={{fontSize: 27, color: '#000'}}/>
                </TouchableOpacity>
              </Col>
              <Col size={2} style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>{params.TitleChef}</Text>
              </Col>
              <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={this.search.bind(this)} activeOpacity={1}>
                  <Icono name="md-search" style={{fontSize: 27, color: '#000'}}/>
                </TouchableOpacity>
              </Col>
            </Grid>
          </LinearGradient>

          <View style={{padding: 5, paddingTop: 10, backgroundColor: '#FFF'}}>

            {recipesByCuisine && recipesByCuisine.length > 0 && <FlatList
              data={recipesByCuisine}
              refreshing="false"
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}


            />}

          </View>
          {isLoading && <ActivityIndicator style={{height: 80}} size="large" color="#DDD"/>}

          <View style={{height: height * 0.10}}/>

        </ScrollView>


      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipesByCuisine: state.recipes.recipesByCuisine,
    isLoading: state.recipes.isLoading,
    isSuccess: state.recipes.isSuccess,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    searchRecipesByCuisine,
    clearRecipesByCuisine,
    searchNextPageCuisine,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesByChef);
