import React, {Component} from 'react';

import {NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import {AsyncStorage, TouchableOpacity, Dimensions, View, Image, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Container, Body, Thumbnail, Text, List, Right, ListItem, Toast} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import ListEmpty from './ListEmpty';
import {StringI18} from "../utils/Strings";

class RecipeFav extends React.Component {

  ListEmptyView = () => {
    return (
      <ListEmpty/>
    );
  }
  removeRecipe = async (recipe_id) => {
    try {

      const recipes = await AsyncStorage.getItem('recipes');
      let recipesFav = JSON.parse(recipes);
      recipesItems = recipesFav.filter(function (e) {
        return e.recipe_id !== recipe_id
      })

      await AsyncStorage.setItem('recipes', JSON.stringify(recipesItems));
      
      Toast.show({
        text: StringI18.t('Recipe removed from favourites'),
        textStyle: { textAlign: 'center' },
        position: 'bottom'
      });

      this.setState({
        ...this.state,
        recipes: recipesItems || []
      });

    } catch (error) {

    }
  };

  constructor(props) {

    super(props);

    this.state = {
      recipes: []
    }

  }

  componentDidMount() {
    this.fetchRecipes();
  }

  RecipeDetails(item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'RecipeDetailsScreen',
      params: {item}
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {

    return (

      <List>

        <FlatList
          data={this.state.recipes}
          refreshing="false"
          renderItem={({item}) =>

            <ListItem style={{
              paddingLeft: 0,
              marginLeft: 0,
              backgroundColor: '#FFF',
              opacity: 1,
              borderColor: 'rgba(0,0,0,0.05)',
              borderBottomWidth: 1
            }} onPress={() => this.RecipeDetails(item)}>
              <Thumbnail size={80} source={{uri: item.isSpoonacular ? item.recipe_image : ConfigApp.URL + 'images/' + item.recipe_image}}
                         style={{paddingLeft: 10, marginLeft: 10, borderRadius: 10}}/>
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
                <TouchableOpacity onPress={this.removeRecipe.bind(this, item.recipe_id)} activeOpacity={1}>
                  <Text note>
                    <Icon name="trash" style={{fontSize: 18}}/>
                  </Text>
                </TouchableOpacity>
              </Right>
            </ListItem>

          }
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={this.ListEmptyView}


        />

      </List>

    )
  }

  async fetchRecipes() {

    let recipesJSON = await AsyncStorage.getItem('recipes');
    let recipesFav = JSON.parse(recipesJSON);
    recipesItems = recipesFav;
    const recipesArray = recipesItems || [];
    this.setState({
      ...this.state,
      recipes: recipesArray
    });
  }

}

export default withNavigation(RecipeFav);
