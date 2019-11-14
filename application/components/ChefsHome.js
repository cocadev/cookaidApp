import React from 'react';
import {StackNavigator, withNavigation} from 'react-navigation';
import {Dimensions, FlatList, TouchableOpacity, View} from 'react-native';
import {Text} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchCuisine} from "../redux/actions/cuisineActions";
import {cachingCuisineImage, getRandomArray} from "../utils/utils";
import CacheImage from "./CacheImage";
import {StringI18} from "../utils/Strings";

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

class ChefsHome extends React.PureComponent {

  RecipesByChef = (chef_id, chef_title, chef_title_original) => {
    this.props.navigation.navigate('RecipesByChefScreen', {IdChef: chef_id, TitleChef: chef_title, Cuisine: chef_title_original});
  }

  constructor(props) {
    super(props);
    this.state = {
      cuisines: [],
    };
  }

  componentWillMount() {
    if (this.props.cuisines) {
      const cuisines = getRandomArray(this.props.cuisines, 9);
      this.setState({cuisines})
    }
    if (!this.props.cuisines) {
      this.props.fetchCuisine();
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.cuisines && (!this.state.cuisines || this.state.cuisines.length <= 0)) {
      const cuisines = getRandomArray(nextProps.cuisines, 9);
      this.setState({cuisines})
    }
  }

  componentDidMount() {
    if (!this.props.cuisines) {
      this.props.fetchCuisine();
    }
  }

  render() {

    return (

      <View style={{margin: 5, minHeight: 200}}>
        <FlatList
          data={this.state.cuisines}
          refreshing="false"
          numColumns={3}
          renderItem={({item}) =>
            <TouchableOpacity onPress={this.RecipesByChef.bind(this, item.chef_id, item.chef_title, item.chef_title_original || item.chef_title)} activeOpacity={1}
                              style={{
                                flex: 1,
                                marginHorizontal: 5,
                                marginBottom: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
              <CacheImage
                uri={ConfigApp.URL + 'images/' + item.chef_image}
                style={{height: 80, width: 80, marginBottom: 10, borderRadius: 80 / 2, backgroundColor: 'rgba(0,0,0,0.1)'}}
                imageStyle={{borderRadius: 80 / 2}}
              />
              <Text numberOfLines={1} style={{color: '#9e9e9e', fontSize: 11, marginBottom: 5, textTransform: 'capitalize'}}>{StringI18.t(item.chef_title)}</Text>
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
    cuisines: state.cuisine.cuisines
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCuisine,
  }, dispatch)
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ChefsHome));
