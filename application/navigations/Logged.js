import React from 'react';
import SideMenu from './SideMenu';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import { Dimensions, Text } from "react-native";

var styles = require('../../assets/files/Styles');

var { height, width } = Dimensions.get('window');

import HomeScreen from '../screens/Home';
import RecipesCategoriesScreen from '../screens/Categories';
import RecipesByCategoryScreen from '../screens/RecipesByCategory';
import RecipesByChefScreen from '../screens/RecipesByChef';
import RecipeDetailsScreen from '../screens/RecipeDetails';

import ChefsScreen from '../screens/Chefs';
import SearchScreen from '../screens/Search';
import FavoritesScreen from "../screens/Favorites";
import SettingsScreen from "../screens/Settings";
import TermsScreen from "../screens/Terms";
import AboutUsScreen from "../screens/AboutUs";
import ContactUsScreen from "../screens/ContactUs";


const leftIcon = (navigation, icon) => <Icon
  name={icon}
  style={{ marginLeft: 20 }}
  size={27}
  color="white"
  onPress={() => navigation.navigate('DrawerOpen')}
/>;

const navigationOptions = {

  navigationOptions: {
    headerStyle: styles.headerStyle,
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold'
    }
  }
};

const HomeNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: leftIcon(navigation, 'md-menu')
      })
    },
    RecipesCategoriesScreen: {
      screen: RecipesCategoriesScreen
    },
    RecipesByCategoryScreen: {
      screen: RecipesByCategoryScreen
    },
    RecipesByChefScreen: {
      screen: RecipesByChefScreen
    },
    RecipeDetailsScreen: {
      screen: RecipeDetailsScreen
    },
    ChefsScreen: {
      screen: ChefsScreen
    },
    SearchScreen: {
      screen: SearchScreen
    },
    FavoritesScreen: {
      screen: FavoritesScreen
    },
    SettingsScreen: {
      screen: SettingsScreen
    },
    AboutUsScreen: {
      screen: AboutUsScreen
    },
    TermsScreen: {
      screen: TermsScreen
    },
    ContactUsScreen: {
      screen: ContactUsScreen
    },
  }, navigationOptions
);

const RootStack = createDrawerNavigator({
  Home: HomeNavigator,
}, {
  overlayColor: 'rgba(0, 0, 0, 0.7)',
  contentComponent: SideMenu,
  drawerWidth: width * .7,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});

const MainNavigator = createAppContainer(RootStack);

export default MainNavigator;
