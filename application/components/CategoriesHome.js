import React, { PureComponent } from 'react';
import { NavigationActions, StackNavigator, withNavigation } from 'react-navigation';
import { ImageBackground, Dimensions, View, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import AppPreLoader from './AppPreLoader';
import ConfigApp from '../utils/ConfigApp';
import GridView from 'react-native-super-grid';
import Strings from '../utils/Strings';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchCategory} from "../redux/actions/categoryActions";
import {cachingCategoriesImage, getRandomArray} from "../utils/utils";
import CacheImage from "./CacheImage";

var styles = require('../../assets/files/Styles');
var { height, width } = Dimensions.get('window');

class CategoriesHome extends React.PureComponent {

  RecipesByCategory = (category_id, category_title) => {
    this.props.navigation.navigate('RecipesByCategoryScreen', { IdCategory: category_id, TitleCategory: category_title });
  }

  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentWillMount() {
    if (this.props.categories) {
      const categories = getRandomArray(this.props.categories, 6);
      this.setState({categories})
    }
    if (!this.props.categories) {
      this.props.fetchCategory();
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.categories && (!this.state.categories || this.state.categories.length <= 0)) {
      const categories = getRandomArray(nextProps.categories, 6);
      this.setState({categories})
    }
  }

  componentDidMount() {
    if (!this.props.categories) {
      this.props.fetchCategory();
    }

  }

  render() {

    return (

      <View style={{ margin: 5 }}>
        <FlatList
          data={this.state.categories}
          refreshing="false"
          numColumns={2}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={this.RecipesByCategory.bind(this, item.category_id, item.category_title)}
              activeOpacity={1} style={{ flex: 1, marginHorizontal: 5 }}>
              <View
                style={{ height: 110, width: null, marginBottom: 10, borderRadius: 10 }}
              >
                <CacheImage
                  uri={ConfigApp.URL + 'images/' + item.category_image}
                  style={{ height: 110, width: '100%', borderRadius: 10, position: 'absolute' }}
                />
                <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']} style={{
                  height: 110,
                  width: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10
                }}>
                  <Text numberOfLines={1} style={{
                    color: '#FFF',
                    fontWeight: 'bold',
                    fontSize: 14
                  }}>{item.category_title.toUpperCase()}</Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          }
          keyExtractor={(item, index) => index.toString()}

        />

      </View>

    )
  }
}


const mapStateToProps = state => {
  return {
    categories: state.category.categories
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCategory,
  }, dispatch)
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(CategoriesHome));
