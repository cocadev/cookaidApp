import React, {Component} from 'react';
import {NavigationActions, StackNavigator} from 'react-navigation';
import {ActivityIndicator, Dimensions, Image, ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import {Body, Container, Icon, Input, Item, List, ListItem, Right, Text} from 'native-base';
import Icono from 'react-native-vector-icons/Ionicons';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import {LinearGradient} from 'expo-linear-gradient';

import {Col, Grid} from 'react-native-easy-grid';
import ListEmpty from '../components/ListEmpty';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {clearKeyword, clearSearchResult, search, searchNextPage} from '../redux/actions/searchActions';
import CacheImage from "../components/CacheImage";
import {clearRandomRecipes, fetchRandomRecipes} from "../redux/actions/recipesActions";
import CacheImageBackground from "../components/CacheImageBackground";
import CategoryCuisineComponent from "../components/CategoryCuisineComponent";

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

const SEARCH_TIME_THRESHOLD = 1000; // 1 second

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

class Search extends Component {
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    const {params} = this.props.navigation.state;
    if (!this.props.isLoading) {
      this.props.clearSearchResult();
      this.props.clearKeyword();
    }
    if (params.isRandomRecipe) {
      this.props.clearRandomRecipes();
      this.props.fetchRandomRecipes(10)
    }
  }

  makeRemoteRequest = (string) => {

    this.setState({string});

    return fetch(ConfigApp.URL + 'json/data_search.php?string=' + this.state.string)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == 'false') {
          console.log('Enter a keyword')
        } else {
          this.setState({
            recipes: responseJson,
            isLoading: false,

          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  ListEmptyView = () => {
    return (
      <ListEmpty/>
    );
  }

  constructor(props) {
    super(props);
    const {params} = props.navigation.state;
    this.state = {
      isLoaded: true,
      string: params.string,
      word: params.string,
      isRandomRecipe: params.isRandomRecipe,
    };
  }

  componentDidMount() {
    // const {params} = this.props.navigation.state;
    // this.props.search(params.string);
  }

  onSearchChange = (text) => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.setState({
      string: text,
      isRandomRecipe: false,
    })
    this.timer = setTimeout(() => this.props.search(text), SEARCH_TIME_THRESHOLD);
  }

  RecipeDetails(item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'RecipeDetailsScreen',
      params: {item}
    });
    this.props.navigation.dispatch(navigateAction);
  }

  renderList = (items) => {
    if (!items || items && items.length == 0) {
      return this.ListEmptyView();
    }
    return (
      <ScrollView>
        {items.map((item, index) => {
          return (
              <TouchableOpacity onPress={() => this.RecipeDetails(item)} activeOpacity={1} style={{marginBottom: 5,marginLeft:5,marginRight:5}}>
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
        })}
      </ScrollView>
    )
  }

  render() {
    const {params} = this.props.navigation.state;
    const isRandomRecipe = this.state.isRandomRecipe;
    const {
      isLoading,
      recipeList,
      keyword,
      isSuccess,
      homeRecipeList,
      isRandomLoading,
      isRandomSuccess,
      isRandomLoaded
    } = this.props;
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
            if (isCloseToBottom(nativeEvent) && !isLoading && !isRandomRecipe) {
              this.props.searchNextPage();
            }
            if (isCloseToBottom(nativeEvent) && !isRandomLoading && isRandomRecipe) {
              this.props.fetchRandomRecipes(10);
            }
          }}
          scrollEventThrottle={400}>

          <LinearGradient colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)']}
                          style={{paddingTop: 45, paddingHorizontal: 30, width: width, marginBottom: 5}}>

            <Grid>
              <Col style={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
                  <Icono name="md-arrow-back" style={{fontSize: 27, color: '#000'}}/>
                </TouchableOpacity>
              </Col>
              <Col size={2} style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>{Strings.ST19}</Text>
              </Col>
              <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
              </Col>
            </Grid>
          </LinearGradient>

          <View style={{marginHorizontal: 10, marginTop: 10, marginBottom: 5}}>
            <Item regular style={{borderRadius: 10}}>

              <Icono name='md-search' style={{fontSize: 20, marginTop: 4, color: '#333', marginLeft: 20}}/>
              <Input
                placeholder={Strings.ST40}
                onChangeText={this.onSearchChange}
                placeholderTextColor="#a4a4a4"
                style={{fontSize: 15, color: '#a4a4a4'}}
                returnKeyType={"search"}
                returnKeyLabel={"Search"}
                onSubmitEditing={() => this.props.search(this.state.string)}
              />
            </Item>

          </View>

          <View style={{marginHorizontal: 12, marginTop: 10, marginBottom: 5}}>
            {this.state.word == '' && this.state.string == null ? <Text style={{fontSize: 14}}>{Strings.ST108}</Text> :
              <Text style={{fontSize: 14}}>{Strings.ST107} <Text style={{
                fontWeight: 'bold',
                fontSize: 14
              }}> {keyword == null ? this.state.word : keyword}</Text> </Text>}
          </View>


          <List>

            {(!isRandomRecipe && (( keyword )&& ((recipeList && recipeList.length > 0)) || isSuccess)) && this.renderList(recipeList)}
            {( isRandomRecipe && ((homeRecipeList && homeRecipeList.length > 0) || isRandomSuccess)) && this.renderList(homeRecipeList)}

          </List>
          {isLoading && !isRandomRecipe && <ActivityIndicator style={{height: 80}} size="large" color="#DDD"/>}
          {isRandomLoading && isRandomRecipe && <ActivityIndicator style={{height: 80}} size="large" color="#DDD"/>}
          <View style={{height: height * 0.10}}/>

        </ScrollView>


      </Container>

    )
  }
}

const mapStateToProps = state => {
  return {
    recipeList: state.recipes.recipeList,
    keyword: state.recipes.keyword,
    isLoading: state.recipes.isLoading,
    isSuccess: state.recipes.isSuccess,
    isLoaded: state.recipes.isLoaded,
    isRandomLoading: state.homeRecipes.isLoading,
    isRandomSuccess: state.homeRecipes.isSuccess,
    isRandomLoaded: state.homeRecipes.isLoaded,
    homeRecipeList: state.homeRecipes.homeRecipeList,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    search,
    searchNextPage,
    clearSearchResult,
    clearKeyword,
    fetchRandomRecipes,
    clearRandomRecipes,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
