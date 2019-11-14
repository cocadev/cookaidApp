import React, {Component} from 'react';
import {NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import {
  ImageBackground,
  Dimensions,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar, BackHandler
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
import ConfigApp from '../utils/ConfigApp';
import AppPreLoader from '../components/AppPreLoader';
import {StringI18} from '../utils/Strings';
import {bindActionCreators} from "redux";
import {fetchCategory} from "../redux/actions/categoryActions";
import {connect} from "react-redux";
import CacheImageBackground from "../components/CacheImageBackground";


var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');
const equalWidth = (width / 2);

class Categories extends Component {
  static navigationOptions = {
    header: null
  };
  RecipesByCategory = (category_id, category_title, category_title_original) => {
    this.props.navigation.navigate('RecipesByCategoryScreen', {IdCategory: category_title, TitleCategory: category_title, Category: category_title_original});
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

  componentDidMount() {
    if (!this.props.categories) {
      this.props.fetchCategory();
    }
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    this.props.navigation.popToTop();
    return true;
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
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>{StringI18.t('ST2')}</Text>
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
                this.props.categories.sort(function(a, b){
                  var x = a.category_title.toLowerCase();
                  var y = b.category_title.toLowerCase();
                  if (x < y) return -1;
                  if (x > y) return 1;
                  return 0;
                })
              }
              refreshing="false"
              numColumns={2}
              renderItem={({item}) =>
                <TouchableOpacity onPress={this.RecipesByCategory.bind(this, item.category_id, item.category_title, item.category_title_original || item.category_title)}
                                  activeOpacity={1} style={{flex: 1, marginHorizontal: 5}}>
                  <CacheImageBackground uri={ConfigApp.URL + 'images/' + item.category_image}
                                   style={{height: 110, width: null, marginBottom: 10, borderRadius: 10}}
                                   imageStyle={{borderRadius: 10}}>
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
                      }}>{StringI18.translateIfNotExist(item.category_title).toUpperCase()}</Text>
                    </LinearGradient>
                  </CacheImageBackground>
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
    categories: state.category.categories,
    isLoading: state.category.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCategory,
  }, dispatch)
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Categories));
