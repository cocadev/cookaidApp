import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import ModalZoomImage from "../components/ModalZoomImage";

import {
  ActivityIndicator,
  AsyncStorage, BackHandler,
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icono from 'react-native-vector-icons/Ionicons';
import {Col, Grid} from 'react-native-easy-grid';
import {Container, Text, Toast} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import {StringI18} from '../utils/Strings';
import HTML from 'react-native-render-html';

import {LinearGradient} from 'expo-linear-gradient';
import {Video} from 'expo-av';

import VideoPlayer from '@expo/videoplayer';
import ColorsApp from '../utils/ColorsApp';
import Modal from 'react-native-modalbox';
// import {Toast} from 'antd-mobile-rn';
import {Collapse, CollapseBody, CollapseHeader} from 'accordion-collapse-react-native';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import CategoryCuisineComponent from "../components/CategoryCuisineComponent";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getRecipeInformation, getRecipeNutrition, translateSingleRecipe} from "../redux/actions/recipesActions";
import CacheImageBackground from "../components/CacheImageBackground";
import CacheImage from "../components/CacheImage";
import CacheManager from "../utils/CacheManager";
import NumericInput from "react-native-numeric-input";
import recipes from "../redux/reducers/recipesReducer";
import {getTargetLanguage} from "../utils/Translating";

var styles = require('../../assets/files/Styles');
const {height, width} = Dimensions.get('window');

const inactiveOpacity = 0.4;

class RecipeDetails extends Component {
  static navigationOptions = {
    header: null
  };
  handlePlayAndPause = () => {
    this.setState((prevState) => ({
      shouldPlay: !prevState.shouldPlay
    }));
  }
  saveRecipes = async (item) => {
    try {
      const recipes = await AsyncStorage.getItem('recipes') || '[]';
      let recipesFav = JSON.parse(recipes);
      let recipesItems = recipesFav.filter(function (e) {
        return e.recipe_id !== item.recipe_id
      })
      recipesItems.push(item);
      AsyncStorage.setItem('recipes', JSON.stringify(recipesItems)).then(() => {
        Toast.show({
          text: StringI18.t('Recipe added to favourites'),
          textStyle: { textAlign: 'center' },
          position: 'bottom'
        });
      });
      this.checkFavourite();
    } catch (error) {
      console.log(error);
    }
  };
  removeRecipe = async (recipe) => {
    try {
      const recipe_id = recipe.recipe_id;
      const recipes = await AsyncStorage.getItem('recipes');
      let recipesFav = JSON.parse(recipes);
      recipesItems = recipesFav.filter(function (e) {
        return e.recipe_id !== recipe_id
      })

      await AsyncStorage.setItem('recipes', JSON.stringify(recipesItems));
      // Recipe removed from favourites
      Toast.show({
        text: StringI18.t('Recipe removed from favourites'),
        textStyle: { textAlign: 'center' },
        position: 'bottom'
      });
      this.checkFavourite();
    } catch (error) {

    }
  };
  isFavorite = async (item) => {
    try {
      const recipes = await AsyncStorage.getItem('recipes') || '[]';
      let recipesFav = JSON.parse(recipes);
      let recipesItems = recipesFav.filter(function (e) {
        return e.recipe_id === item.recipe_id
      })
      return recipesItems && recipesItems.length === 1;
    } catch (error) {
      console.log(error);
    }
  }

  checkFavourite = () => {
    this.isFavorite(this.state.item)
      .then(result => {
        this.setState({isFavorite: result})
      })
  }

  constructor(props) {
    super(props);
    const {params} = props.navigation.state;
    this.state = {
      item: params.item,
      mute: false,
      shouldPlay: false,
      nutritionFilter: null,
      measure: null,
      serving: params && params.item && params.item.servings,
      language: getTargetLanguage(),
    visibleModal :false,
    };
    this.checkFavourite();
    if (params.item && params.item.language !== getTargetLanguage()) {
      this.props.translateSingleRecipe(params.item);
    }
  }

    showModal = () =>{
        this.setState({ visibleModal: true });
    }

    hideModal = () =>{
        this.setState({ visibleModal: false });
    }

  componentWillMount() {
    if (this.props.navigation
      && this.props.navigation.state
      && this.props.navigation.state.params
      && this.props.navigation.state.params.item) {
      const item = this.props.navigation.state.params.item;
      CacheManager.prefetch(item.isSpoonacular ? item.recipe_image : ConfigApp.URL + 'images/' + item.recipe_image);
    }
    if (this.props.navigation
      && this.props.navigation.state
      && this.props.navigation.state.params
      && this.props.navigation.state.params.item) {
      this.props.getRecipeInformation(this.props.navigation.state.params.item.id)
        .then(item => {

          this.setState(prevState => ({
            item: Object.assign({}, item, prevState.item)
          }))
        })
        .catch(err => {

        })
    }
  }

  componentDidMount() {


    var RecipeVideo = this.props.navigation.state.params.item.recipe_video;

    if (RecipeVideo !== "") {

      return fetch(ConfigApp.URL + '/video/index.php?item=' + this.props.navigation.state.params.item.recipe_id)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson['hd720mp4']) {
            let url = responseJson['hd720mp4'].url
            this.setState({
              isLoading: false,
              videoUrl: url
            }, function () {
            });
          } else if (responseJson['mediummp4']) {
            let url = responseJson['mediummp4'].url
            this.setState({
              isLoading: false,
              videoUrl: url
            }, function () {
            });
          } else {

            console.log('Not Found Url')
            this.setState({
              isLoading: false,
              videoUrl: 'Not Found'
            }, function () {
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });

    }

    if (this.props.navigation
      && this.props.navigation.state
      && this.props.navigation.state.params
      && this.props.navigation.state.params.item
      && !this.props.navigation.state.params.item.customNutrition) {
      this.props.getRecipeNutrition(this.props.navigation.state.params.item)
        .then(item => {
          this.setState(prevState => ({
            item: Object.assign({}, prevState.item, item)
          }))
        })
        .catch(err => {

        })
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

  openVideo() {

    this.refs.video.open()
    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL)
  }

  videoClose() {
    this.refs.video.close();
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  closeModal() {
    this.refs.modal3.close();

  }

  openLink = (link) => {
    Linking.openURL(link);
  }

  setNutritionFilter = (filter) => {
    this.setState(prevState => ({
      nutritionFilter: filter !== prevState.nutritionFilter ? filter : null,
    }))
  }

  renderDescription = () => {
    const {item} = this.state;
    if (!item || item && !item.recipe_description) {
      return;
    }
    return (
      <View style={{marginHorizontal: 20}}>
        <HTML html={item.recipe_description} onLinkPress={(evt, href) => {
          Linking.openURL(href);
        }}/>
      </View>
    )
  }

  renderCategory = () => {
    const {item} = this.state;
    if (!item || (!item.category_title && !item.chef_title )) {
      return;
    }
    return (
      <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]} style={{
        paddingHorizontal: 10,
        padding: 5,
        borderRadius: 10, // category border-radius
        marginBottom: 7,
        marginLeft: -1,
        backgroundColor: ColorsApp.PRIMARY
      }}>
        <Text style={{color: '#FFF', fontSize: 11, textTransform: 'capitalize'}}>{StringI18.translateIfNotExist(item.category_title) || StringI18.translateIfNotExist(item.chef_title)}</Text>
      </LinearGradient>
    )
  }

  renderCuisine = () => {
    const {item} = this.state;
    if (!item || !item.chef_title || !item.category_title) {
      return;
    }
    return (
      <Text
        style={{
          color: '#FFF',
          fontSize: 11,
          paddingHorizontal: 10,
          padding: 5,
          textTransform: 'capitalize'
        }}>
        {StringI18.t(item.chef_title)}
      </Text>
    )
  }

  renderIngredientItem = ({item}) => {
    return (
      <View style={{
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
      }}>
        <CacheImage
          style={{
            width: 64,
            height: 64,
            resizeMode: 'contain'
          }}
          uri={item.image}/>
        <Text style={{marginLeft: 8, fontSize: 14, flex: 1, flexWrap: 'wrap'}}>{item.original}</Text>
      </View>
    )
  }

  getIngredientText = (itemIngredient) => {
    try {
      let {measure} = this.state;
      const {item, serving} = this.state;
      measure = measure || 'metric';
      let amount = itemIngredient['measures'][measure].amount;
      let unit = itemIngredient['measures'][measure].unitLong;
      if (serving != null && typeof serving == "number") {
        amount = serving * amount/item.servings;
      }
      if (unit) {
        switch (unit.toLowerCase()) {
          case "tsbp":
            unit = StringI18.t("teaspoons");
            break;

          case "tbsps":
            unit = StringI18.t("tablespoons");
            break;

          case "tbsp":
            unit = StringI18.t("tablespoon");
            break;
        }

      }
      unit = StringI18.t(unit, {defaultValue:  unit}) || unit;

      /*if (!(itemIngredient && itemIngredient['measures'] && itemIngredient['measures']['metric'] && itemIngredient['measures']['us'])) {
        if (itemIngredient) {
          return itemIngredient.original || null;
        }
        return null
      }
      if (itemIngredient['measures']['metric'].unitLong === itemIngredient['measures']['us'].unitLong) {
        return itemIngredient.original;
      }*/
      amount = amount.toFixed(2);
      let text = `${amount} ${unit} ${itemIngredient.name}`;
      return text;
    } catch (e) {
      return null;
    }
  }

  renderLoading = () => {
    return (
      <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="rgba(0,0,0,0.2)"/>
      </View>
    )
  }
  renderExtendedIngredientsItem = ({item}) => {
    let text = this.getIngredientText(item);
    if (this.state.item && this.state.item.language !== this.state.language) {
      return this.renderLoading();
    }
    return (
      <View style={{
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
      }}>
        <CacheImage
          style={{
            width: 64,
            height: 64,
            resizeMode: 'contain'
          }}
          uri={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}/>
        <Text style={{marginLeft: 11, fontSize: 16, flex: 1, color: '#585858', flexWrap: 'wrap'}}>{text}</Text>
      </View>
    )
  }

  setCurrentServing = (serving) => {
    this.setState({
      serving,
    })
  }

  renderMeasureSwitch = () => {
    const { measure, item } = this.state;
    const isMetric = !measure || measure === 'metric';
    const serving = this.state.serving || item && item.servings;
    return (
      <View style={stylesDetail.buttonSwitchMetricContainer} key={"1"}>
        <View>
          <Text style={[stylesDetail.textUnitTitle, {color: '#585858'}]}>
            {serving > 1 ? StringI18.t('servings') : StringI18.t('serving')}
          </Text>
          <NumericInput
            onChange={value => this.setCurrentServing(value)}
            minValue={1}
            value={this.state.serving === undefined || this.state.serving === null ? item.servings : this.state.serving}
            totalHeight={30}
            inputStyle={{
              fontSize: 13,
            }}
          />
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={[stylesDetail.textUnitTitle, {color: '#585858'}]}>
            {StringI18.t('Units')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.setState({measure: 'metric'})}>
              <LinearGradient
                colors={isMetric ? [ColorsApp.SECOND, ColorsApp.PRIMARY] : ['#b6b6b6', '#b6b6b6']}
                start={[0, 0]}
                end={[1, 0]}
                style={stylesDetail.buttonSwitchMetric}>
                <Text style={stylesDetail.buttonSwitchTextActive}>
                  {StringI18.t("Metric", {defaultValue: "Metric"})}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({measure: 'us'})}>
              <LinearGradient
                colors={!isMetric ? [ColorsApp.SECOND, ColorsApp.PRIMARY] : ['#b6b6b6', '#b6b6b6']}
                start={[0, 0]}
                end={[1, 0]}
                style={stylesDetail.buttonSwitchMetric}>
                <Text style={stylesDetail.buttonSwitchTextActive}>
                  US
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }

  renderIngredients = (item) => {
    if (this.state.item && this.state.item.language !== this.state.language) {
      return this.renderLoading();
    }
    if (item.recipe_ingredients && typeof item.recipe_ingredients == "string") {
      return (
        <HTML html={item.recipe_ingredients} onLinkPress={(evt, href) => {
          Linking.openURL(href);
        }}/>
      )
    }
    /*if (item.recipe_ingredients && Array.isArray(item.recipe_ingredients)) {
      return ([
        this.renderMeasureSwitch()
        ,
        <FlatList
          key={"list"}
          data={item.recipe_ingredients}
          renderItem={this.renderIngredientItem}
          ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#f6f6f6'}}/>}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : "") || index.toString()}
        />
      ])
    }*/
    if (item.extendedIngredients && Array.isArray(item.extendedIngredients)) {
      return ([
        this.renderMeasureSwitch(),
        <FlatList
          key={"list"}
          data={item.extendedIngredients}
          renderItem={this.renderExtendedIngredientsItem}
          ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#f6f6f6'}}/>}
          keyExtractor={(item, index) => (index.toString())}
        />
      ])
    }
    return this.renderLoading();
  }

  renderNutritionChart = () => {
    const {item, nutritionFilter} = this.state;
    if (!item || !item.customNutrition) {
      return this.renderLoading();
    }
    return (
      <View style={{flexDirection: 'column', minHeight: 200}}>
        <Text style={[stylesDetail.nutritionTitle, {fontSize: 16, color: '#585858', marginBottom: 12}]}>{StringI18.t('Nutrition_per_serving')}</Text>
        <Text style={[stylesDetail.nutritionTitle, {fontSize: 15, color: '#585858', marginBottom: 9}]}>{StringI18.t('QuickView')}</Text>
        <View style={{flexDirection: 'row', maxWidth: '100%', flexWrap: 'nowrap'}}>
          {!!item.customNutrition.calories && <TouchableOpacity style={{flex: 1}} onPress={() => this.setNutritionFilter('Calories')}>
            <Text numberOfLines={1} style={[stylesDetail.nutriChartBox, {color: '#585858', opacity: !nutritionFilter || nutritionFilter === "Calories" ? 1 : inactiveOpacity}]}>
              {item.customNutrition.calories} {StringI18.t('Cals')}
            </Text>
          </TouchableOpacity>}
          {!!item.customNutrition.calories && <TouchableOpacity style={{flex: 1}} onPress={() => this.setNutritionFilter('Protein')}>
            <Text numberOfLines={1} style={[stylesDetail.nutriChartBox, {color: '#585858', opacity: !nutritionFilter || nutritionFilter === "Protein" ? 1 : inactiveOpacity}]}>
              {item.customNutrition.protein} {StringI18.t('Protein')}
            </Text>
          </TouchableOpacity>}
          {!!item.customNutrition.calories && <TouchableOpacity style={{flex: 1}} onPress={() => this.setNutritionFilter('Fat')}>
            <Text numberOfLines={1} style={[stylesDetail.nutriChartBox, {color: '#585858', opacity: !nutritionFilter || nutritionFilter === "Fat" ? 1 : inactiveOpacity}]}>
              {item.customNutrition.fat} {StringI18.t('Fat')}
            </Text>
          </TouchableOpacity>}
          {!!item.customNutrition.calories && <TouchableOpacity style={{flex: 1}} onPress={() => this.setNutritionFilter('Carbohydrates')}>
            <Text numberOfLines={1} style={[stylesDetail.nutriChartBox, {color: '#585858', marginRight: 0,opacity: !nutritionFilter || nutritionFilter === "Carbohydrates" ? 1 : inactiveOpacity}]}>
              {item.customNutrition.carbs} {StringI18.t('Carbs')}
            </Text>
          </TouchableOpacity>}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 13}}>

          <View style={[stylesDetail.nutriChartBox, {opacity: !nutritionFilter ? 1 : inactiveOpacity, flexDirection: 'row', borderWidth: 0}]}>
            <Image source={require('../../assets/images/health_icon.png')}
                   style={{width: 20, height: 20, marginHorizontal: 8}}/>
            {
              !!item.healthScore &&
              <Text style={{color: '#585858'}}>
                {item.healthScore}% {StringI18.t('Health Score')}
              </Text>
            }
          </View>
        </View>
        <Text style={[stylesDetail.nutriSectionTitle, stylesDetail.colorSalmon]}>
          {StringI18.t('Limit These')}
        </Text>
        {
          item.customNutrition && item.customNutrition.bad && item.customNutrition.bad.map((badItem, index) => {
            const {title, amount, percentOfDailyNeeds} = badItem;
            const percent = Math.ceil(percentOfDailyNeeds);
            return (
              <View key={index} style={[stylesDetail.row, {marginTop: 4}, {opacity: !nutritionFilter || nutritionFilter === title ? 1 : inactiveOpacity}]}>
                <Text style={[stylesDetail.nutritionName, {fontSize: 14, color: '#585858'}]}>
                  {StringI18.t(title, {defaultValue:  title})}
                </Text>
                <Text style={[stylesDetail.nutritionValue, {fontSize: 14, color: '#585858'}]}>
                  {amount}
                </Text>
                <View style={stylesDetail.nutritionPercentContainer}>
                  <View style={[stylesDetail.bar, stylesDetail.backgroundSalmon, {width: `${percent < 100 ? percent : 100}%`}]}>
                  </View>
                  <Text style={[stylesDetail.colorSalmon, stylesDetail.nutritionPercent]}>
                    {percent}%
                  </Text>
                </View>
              </View>
            )
          })
        }

        <Text style={[stylesDetail.nutriSectionTitle, stylesDetail.colorBlue]}>
          {StringI18.t('Get Enough Of These')}
        </Text>
        {
          item.customNutrition && item.customNutrition.good && item.customNutrition.good.map((goodItem, index) => {
            const {title, amount, percentOfDailyNeeds} = goodItem;
            const percent = Math.ceil(percentOfDailyNeeds);
            return (
              <View key={index} style={[stylesDetail.row, {marginTop: 4}, {opacity: !nutritionFilter || nutritionFilter === title ? 1 : inactiveOpacity}]}>
                <Text style={[stylesDetail.nutritionName, {fontSize: 14, color: '#585858'}]}>
                  {StringI18.t(title, {defaultValue:  title})}
                </Text>
                <Text style={[stylesDetail.nutritionValue, {fontSize: 14, color: '#585858'}]}>
                  {amount}
                </Text>
                <View style={stylesDetail.nutritionPercentContainer}>
                  <View style={[stylesDetail.bar, stylesDetail.backgroundBlue, {width: `${percent < 100 ? percent : 100}%`}]}>
                  </View>
                  <Text style={[stylesDetail.colorBlue, stylesDetail.nutritionPercent]}>
                    {percent}%
                  </Text>
                </View>
              </View>
            )
          })
        }
        <View style={[stylesDetail.row, {alignItems: 'center', marginVertical: 16}]}>
          <View style={[stylesDetail.backgroundSalmon, {width: 12, height: 12}]}>
          </View>
          <View style={[stylesDetail.backgroundBlue, {width: 12, height: 12, marginHorizontal: 8}]}>
          </View>
          <Text style={{color: "#585858", fontSize: 15}}>
             {StringI18.t('Percentage of daily need')}
          </Text>
        </View>
      </View>
    )
  }

  renderSteps = (item) => {
    if (this.state.item && this.state.item.language !== this.state.language) {
      return this.renderLoading();
    }
    if (!item || !item.analyzedInstructions || !item.analyzedInstructions[0] || !item.analyzedInstructions[0].steps) {
      /*return (
        <HTML html={item.recipe_directions} onLinkPress={(evt, href) => {
          Linking.openURL(href);
        }}/>
      )*/
      return this.renderLoading();
    }
    if (item.analyzedInstructions[0].steps && !Array.isArray(item.analyzedInstructions[0].steps)) {
      /*return (
        <HTML html={item.recipe_directions} onLinkPress={(evt, href) => {
          Linking.openURL(href);
        }}/>
      )*/
      return null
    }

    return <FlatList
      key={"list"}
      data={item.analyzedInstructions[0].steps}
      renderItem={this.renderStepItem}
      ItemSeparatorComponent={() => <View style={{height: 2, backgroundColor: '#f6f6f6'}}/>}
      keyExtractor={(item, index) => (index.toString())}
    />
  }

  renderStepItem = ({item}) => {
    const {number, step} = item;
    return (
      <View style={{
        flexDirection: 'row',
        paddingVertical: 16,
        alignItems: 'center',
      }}>
        <View style={stylesDetail.numberContainer}>
          <Text style={stylesDetail.numberTextStyle}>{number}</Text>
        </View>
        <Text style={stylesDetail.stepTextStyle}>{step}</Text>
      </View>
    )
  }

  render() {

    const {item} = this.state;

    VideoButton = () => {
      return (
        <TouchableOpacity onPress={() => this.openVideo()} activeOpacity={1}>
          <View style={{backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 100}}>
            <Icon name="play-circle-outline" style={{fontSize: 55, color: '#FFFFFF'}}/>
          </View>
        </TouchableOpacity>
      );
    }

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
        <StatusBar barStyle="light-content"/>

        <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.0)']} style={{
          position: 'absolute',
          top: 0,
          zIndex: 130,
          paddingTop: 45,
          paddingHorizontal: 30,
          width: width
        }}>

          <Grid>
            <Col style={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
                <Icono name="md-arrow-back" style={{fontSize: 27, color: '#FFFFFF'}}/>
              </TouchableOpacity>
            </Col>
            <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
              <TouchableOpacity
                onPress={!this.state.isFavorite ? this.saveRecipes.bind(this, item) : this.removeRecipe.bind(this, item)}>
                {this.state.isFavorite && <Icono name={"md-heart"} style={{fontSize: 27, color: ColorsApp.PRIMARY}}/>}
                {!this.state.isFavorite && <Icono name={"md-heart"} style={{fontSize: 27, color: '#ffffff'}}/>}
              </TouchableOpacity>
            </Col>
          </Grid>
        </LinearGradient>
          <ModalZoomImage visible={this.state.visibleModal}  onClose={this.hideModal} src={item.isSpoonacular ? item.recipe_image : ConfigApp.URL + 'images/' + item.recipe_image}/>
          <TouchableOpacity  onPress={this.showModal} style={{height: height * 0.40, alignItems: 'flex-start', justifyContent: 'flex-end'}}>
              <CacheImageBackground
                  uri={item.isSpoonacular ? item.recipe_image : ConfigApp.URL + 'images/' + item.recipe_image}
                  style={{height: height * 0.40, alignItems: 'flex-start', justifyContent: 'flex-end'}}
                  resizeMode="cover">
                  <View style={{
                      position: 'absolute',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 120,
                      width: width,
                      height: height * 0.40
                  }}>

                      {item.recipe_video == '' ? <Text></Text> :

                          <TouchableOpacity onPress={() => this.openVideo()} activeOpacity={1}>
                              <View style={{backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 100}}>
                                  <Icon name="play-circle-outline" style={{fontSize: 55, color: '#FFFFFF'}}/>
                              </View>
                          </TouchableOpacity>
                      }


                  </View>
                  <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.55)']} style={{
                      height: height * 0.30,
                      width: width,
                      paddingHorizontal: 20,
                      alignItems: 'flex-start',
                      justifyContent: 'flex-end',
                      paddingBottom: 20,
                      zIndex: 120,
                  }}>
                      <CategoryCuisineComponent item={item} isCategoryButton={true}/>
                      <Text numberOfLines={2}
                            style={{fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 5}}>{item.recipe_title}</Text>
                  </LinearGradient>
              </CacheImageBackground>
          </TouchableOpacity>

        <ScrollView>

          <Grid style={{marginTop: 22, marginBottom: 19}}>
            <Col style={{textAlign: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>

              <Image source={require('../../assets/images/cooktime.png')}
                     style={{width: 30, height: 30, marginBottom: 7}} resizeMode="contain"/>

              <Text style={{textAlign: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center', fontSize: 14, marginBottom: 3, color: 'rgba(0,0,0,0.5)'}}>{StringI18.t('ST16')}</Text>
              <Text style={{color: '#585858', fontSize: 14, fontWeight: 'bold',}}>{item.recipe_time}</Text>

            </Col>

            <Col style={{textAlign: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>

              <Image source={require('../../assets/images/servings.png')}
                     style={{width: 30, height: 30, marginBottom: 7}} resizeMode="contain"/>
              <Text style={{textAlign: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center', fontSize: 14, marginBottom: 3, color: 'rgba(0,0,0,0.5)'}}>{StringI18.t('ST15')}</Text>
              <Text style={{color: '#585858', fontSize: 14, fontWeight: 'bold',}}>{item.recipe_servings}</Text>

            </Col>

            <Col style={{textAlign: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>

              <Image source={require('../../assets/images/calories.png')}
                     style={{width: 30, height: 30, marginBottom: 7}} resizeMode="contain"/>
              <Text style={{textAlign: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center', fontSize: 14, marginBottom: 3, color: 'rgba(0,0,0,0.5)'}}>{StringI18.t('ST17')}</Text>
              <Text style={{color: '#585858', fontSize: 14, fontWeight: 'bold',}}>{item.recipe_cals}</Text>

            </Col>

          </Grid>

          {this.renderDescription()}


          <Collapse isCollapsed={true}>
            <CollapseHeader>
              <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]}
                              style={styles.collapseStyle}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 13}}>{StringI18.t('ST21').toUpperCase()}</Text>
              </LinearGradient>
            </CollapseHeader>
            <CollapseBody>
              <View style={{marginHorizontal: 10, marginBottom: 10, marginTop: 8, backgroundColor: '#FFF'}}>
                {/*<HTML html={item.recipe_ingredients} onLinkPress={(evt, href) => {
                  Linking.openURL(href);
                }}/>*/}
                {this.renderIngredients(item)}
              </View>
            </CollapseBody>
          </Collapse>

          <Collapse isCollapsed={true}>
            <CollapseHeader>
              <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]}
                              style={styles.collapseStyle}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 13}}>{StringI18.t('ST22').toUpperCase()}</Text>
              </LinearGradient>
            </CollapseHeader>
            <CollapseBody>
              <View style={{marginHorizontal: 10, backgroundColor: '#FFF'}}>
                {/*<HTML html={item.recipe_directions} onLinkPress={(evt, href) => {
                  Linking.openURL(href);
                }}/>*/}
                {
                  this.renderSteps(item)
                }
              </View>
            </CollapseBody>
          </Collapse>

          <Collapse isCollapsed={true}>
            <CollapseHeader>
              <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]}
                              style={styles.collapseStyle}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 13}}>{StringI18.t("NUTRITIONAL_INFORMATION")}</Text>
              </LinearGradient>
            </CollapseHeader>
            <CollapseBody>
              <View style={{margin: 10, backgroundColor: '#FFF'}}>
                {this.renderNutritionChart()}
              </View>
            </CollapseBody>
          </Collapse>

          {item && item.isSpoonacular && <Collapse isCollapsed={true}>
            <CollapseHeader>
              <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]}
                              style={styles.collapseStyle}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 13}}>{StringI18.t('ST109').toUpperCase()}</Text>
              </LinearGradient>
            </CollapseHeader>
            <CollapseBody>
              <View style={{margin: 10, backgroundColor: '#FFF'}}>
                <Text style={{color: '#585858', fontSize: 13}}>
                  {item.creditsText}
                </Text>
                {!!item.sourceUrl && <TouchableOpacity onPress={() => this.openLink(item.sourceUrl)} activeOpacity={0.9}>
                  <Text style={{color: 'blue', fontSize: 13, marginTop: 13}}>
                    {item.sourceUrl}
                  </Text>
                </TouchableOpacity>}
              </View>
            </CollapseBody>
          </Collapse>}

        </ScrollView>

        <Modal
          style={{width: width, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000'}}
          backdropOpacity={1} position={"center"} ref='video' onClosed={this.onClose} onOpened={this.onOpen}
          onClosingState={this.onClosingState} isDisabled={this.state.isDisabled} coverScreen={true}>

          <StatusBar hidden/>

          <VideoPlayer
            videoProps={{
              shouldPlay: true,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              source: {
                uri: this.state.videoUrl,
              },
            }}
            // isPortrait={false}
            showFullscreenButton={false}
            playFromPositionMillis={0}
            thumbImage={require('../../assets/images/thumb.png')}
          />

          <TouchableOpacity onPress={() => this.videoClose()}
                            style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 40}}>
            <Text style={{color: '#FFF'}}>{StringI18.t('ST60')}</Text>
          </TouchableOpacity>

        </Modal>


      </Container>

    );
  }


}


const tabFontSize = () => {
  if (width <= 375) {
    return 13;
  } else if (width > 375) {
    return 14
  } else {
    return 13
  }
}

const stylesDetail = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  nutritionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  nutriChartBox: {
    fontSize: tabFontSize(),
    textAlign: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#585858",
    marginRight: 6,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  nutriSectionTitle: {
    fontWeight: 'bold',
    marginTop: 12,
    fontSize: 16,
    marginBottom: 6,
  },
  nutritionName: {
    width: '30%',
    fontSize: 14,
  },
  nutritionValue: {
    width: '18%',
    fontSize: 14,
  },
  nutritionPercentContainer: {
    flex: 1,
    marginRight: 55,
    flexDirection: 'row',
    alignItems: 'center'
  },
  nutritionPercent: {
    marginLeft: 12,
    fontSize: 14,
  },
  colorSalmon: {
    color: 'red',
  },
  backgroundSalmon: {
    backgroundColor: 'red'
  },
  colorBlue: {
    color: 'green',
  },
  backgroundBlue: {
    backgroundColor: 'green'
  },
  bar: {
    height: 12,
  },
  buttonSwitchMetricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  buttonSwitchMetric: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  buttonSwitchTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    paddingVertical: 6,
    paddingHorizontal: 10
  },
  buttonSwitchTextNormal: {
    fontWeight: 'bold',
    fontSize: 13,
    paddingVertical: 6,
    paddingHorizontal: 10
  },
  textUnitTitle: {
    fontSize: 14,
    marginBottom: 5
  },
  numberContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.3,
    marginLeft: 15,
    marginRight: 21,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#A8A8A8',
  },
  numberTextStyle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#A8A8A8',
  },
  stepTextStyle: {
    marginRight: 8,
    marginBottom: 4,
    flex: 1,
    flexWrap: 'wrap',
    // fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16 * 1.5,
    color: '#585858',
  }
});

const mapStateToProps = state => {
  return {
    homeRecipeList: state.homeRecipes.homeRecipeList,
    recipeList: state.recipes.recipeList,
    recipesByCuisine: state.recipes.recipesByCuisine,
    recipesByCategory: state.recipes.recipesByCategory,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getRecipeNutrition,
    getRecipeInformation,
    translateSingleRecipe,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
