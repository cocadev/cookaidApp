import React from 'react';
import {NavigationActions, withNavigation} from 'react-navigation';
import {FlatList, Image, View, ScrollView, ActivityIndicator} from 'react-native';
import {Body, Icon, List, ListItem, Right, Text} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import {bindActionCreators} from "redux";
import {getRandomSpoonacularRecipes} from "../redux/actions/searchActions";
import {connect} from "react-redux";
import CacheImage from "./CacheImage";
import {fetchRandomRecipes} from "../redux/actions/recipesActions";

// const numberCookAidRecipes = getRandomInt(1, ConfigApp.HOME_MAX_RANDOM_RECIPES - 1);
const numberCookAidRecipes = 0;

class GridRecipesHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentWillMount() {
    if (!this.props.homeRecipeList && !this.props.isLoading) {
      this.props.fetchRandomRecipes(10);
    }
  }

  componentDidMount() {

    return fetch(ConfigApp.URL + 'json/data_recipes.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          recipes: responseJson.filter((e, index) => {
            return index < numberCookAidRecipes
          }),
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  RecipeDetails(item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'RecipeDetailsScreen',
      params: {item}
    });
    this.props.navigation.dispatch(navigateAction);
  }

  renderItem = ({item}) => {
    if (!item) {
      return null;
    }
    return (
      <ListItem
        key={item.id}
        style={{
        paddingLeft: 0,
        marginLeft: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        borderBottomWidth: 1
      }} onPress={() => this.RecipeDetails(item)}>
        <CacheImage
          uri={(item && item.isSpoonacular) ? item.recipe_image_lower : ConfigApp.URL + 'images/' + item.recipe_image}
          style={{
            width: 80,
            height: 80,
            paddingLeft: 10,
            marginLeft: 10,
            borderRadius: 10,
            backgroundColor: 'rgba(0,0,0,0.1)'
          }}
        />
        <Body style={{paddingLeft: 0, marginLeft: 0}}>
        <Text numberOfLines={1} style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>
          {item.recipe_title}
        </Text>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <Image source={require('../../assets/images/cooktime.png')}
                 style={{width: 15, height: 15, marginLeft: 12, marginRight: -8}}/>
          <Text style={{fontSize: 12, color: '#9e9e9e'}}>{item.recipe_time}</Text>
          <Image source={require('../../assets/images/calories.png')}
                 style={{width: 15, height: 15, marginRight: -8}}/>
          <Text style={{fontSize: 12, color: '#9e9e9e'}}>{item.recipe_cals}</Text>
        </View>
        </Body>
        <Right>
          <Text note>
            <Icon name="ios-arrow-forward" style={{fontSize: 16}}/>
          </Text>
        </Right>
      </ListItem>
    )
  }

  mergeList = () => {
    const {homeRecipeList} = this.props;
    const merge = this.state.recipes.concat(homeRecipeList);
    merge && merge.sort(function(a, b){
      // if(a.recipe_time < b.recipe_time) { return -1; }
      // if(a.recipe_time > b.recipe_time) { return 1; }
      return 0;
    })
    return merge.slice(0,6);
  }

  render() {
    const merge = this.mergeList();
    return (
      <List>
        {(merge && merge.length > 1) && <ScrollView style={{minHeight: 200}}>
          {
            merge.map(item => {
              return this.renderItem({item})
            })
          }

        </ScrollView>}
        {
          (!(merge && merge.length > 1)) &&
          <View style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="rgba(0,0,0,0.2)"/>
          </View>
        }
      </List>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.homeRecipes.isLoading,
    homeRecipeList: state.homeRecipes.homeRecipeList,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getRandomSpoonacularRecipes,
    fetchRandomRecipes,
  }, dispatch)
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(GridRecipesHome));
