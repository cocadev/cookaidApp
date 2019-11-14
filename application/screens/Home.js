import React, {Component} from 'react';

import {DrawerActions, NavigationActions, StackNavigator} from 'react-navigation';
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Title
} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import Icono from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';
import GridRecipesHome from '../components/GridRecipesHome';
import CategoriesHome from '../components/CategoriesHome';
import ChefsHome from '../components/ChefsHome';
import Strings, {StringI18} from '../utils/Strings';
import ColorsApp from '../utils/ColorsApp';
import {bindActionCreators} from "redux";
import {search} from "../redux/actions/searchActions";
import {connect} from "react-redux";
import Modal from 'react-native-modalbox';
import {getListLanguages, getTargetLanguage} from "../utils/Translating";
import {setSelectedLanguage} from "../redux/actions/homeActions";
import Constants from 'expo-constants';

const styles = require('../../assets/files/Styles');
const {height, width} = Dimensions.get('window');
const equalWidth = (width / 2);

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }
  search = (string, isRandomRecipe = false) => {
    if (!isRandomRecipe) {
      this.props.search(this.state.string || string);
    }
    this.props.navigation.navigate('SearchScreen', {string: this.state.string || string, isRandomRecipe});
  }

  constructor(props) {
    super(props);
    this.state = {
      string: '',
      showSelectLanguageModal: false,
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    this.goBack();
    return true;
  }

  goBack = async () => {
    if (!this.state.showSelectLanguageModal) {
      BackHandler.exitApp();
    }
    if (this.state.showSelectLanguageModal) {
      this.closeSelectLanguage();
    }
  }

  categories() {

    const navigateAction = NavigationActions.navigate({
      routeName: 'RecipesCategoriesScreen'
    });
    this.props.navigation.dispatch(navigateAction);

  }

  chefs() {

    const navigateAction = NavigationActions.navigate({
      routeName: 'ChefsScreen'
    });
    this.props.navigation.dispatch(navigateAction);

  }

  openSelectLanguage = () => {
    this.refs.select_language.open();
    this.onModalOpen();
  }

  closeSelectLanguage = () => {
    this.refs.select_language.close()
    this.onModalClose()
  }

  selectLanguage = (lang) => {
    this.props.setSelectedLanguage(lang);
    this.closeSelectLanguage();
  }

  onModalOpen = () => {
    this.state.showSelectLanguageModal = true;
  }

  onModalClose = () => {
    this.state.showSelectLanguageModal = false;
  }

  isSelectedLanguage = (lang) => {
    const target = getTargetLanguage();
    if (target) {
      return lang && target === lang.code;
    }
    return lang && lang.code === 'en';
  }

  render() {

    const languageList = getListLanguages();

    return (

      <Container style={styles.background_general}>
        <Modal
          style={{width: width, flex: 1, justifyContent: 'center', alignItems: 'center'}}
          backdropOpacity={1} position={"center"} ref='select_language' onClosed={this.onModalClose()} onOpened={this.onModalOpen()}
          onClosingState={this.onClosingState}>
          <Container style={{width: width, marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0}}>
            <Header>
              <Left>
                <Button transparent onPress={this.closeSelectLanguage}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title>{StringI18.t('Select language', {defaultValue: Strings['Select language']})}</Title>
              </Body>
              <Right/>
            </Header>
            <Content>
              <List style={{marginHorizontal: 10}}>
                {
                  languageList.map(lang => {
                    if (this.isSelectedLanguage(lang)) {
                      return (
                        <ListItem key={lang.name} selected>
                          <TouchableOpacity style={[stylesHome.languageItemContainer]} onPress={() => this.selectLanguage(lang)}>
                            <Text style={stylesHome.textLanguage}>{lang.name}</Text>
                          </TouchableOpacity>
                        </ListItem>
                      )
                    }
                    return (
                      <ListItem key={lang.name}>
                        <TouchableOpacity style={[stylesHome.languageItemContainer]} onPress={() => this.selectLanguage(lang)}>
                          <Text style={stylesHome.textLanguage}>{lang.name}</Text>
                        </TouchableOpacity>
                      </ListItem>
                    )
                  })
                }
              </List>
            </Content>
          </Container>
        </Modal>
        <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.0)']} style={{
          position: 'absolute',
          top: 0,
          zIndex: 100,
          paddingTop: 45,
          paddingHorizontal: 30,
          width: width
        }}>
        </LinearGradient>


        <ScrollView>


          <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.0)']} style={{
            position: 'absolute',
            top: 0,
            zIndex: 100,
            paddingTop: 45,
            paddingHorizontal: 30,
            width: width
          }}>

            <Grid>
              <Col style={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}>
                <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                                  activeOpacity={1}>
                  <Icono name="md-menu" style={{fontSize: 27, color: '#FFFFFF'}}/>
                </TouchableOpacity>
              </Col>
              <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={this.search.bind(this, this.state.string, false)} activeOpacity={0.9}>
                  <Icono name="md-search" style={{fontSize: 27, color: '#FFFFFF'}}/>
                </TouchableOpacity>
              </Col>
            </Grid>
          </LinearGradient>


          <ImageBackground source={require('../../assets/images/header.jpg')} style={{
            flexDirection: 'column',
            height: height * 0.35,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image source={require('../../assets/images/logo-white.png')}
                   style={{
                     width: width * 0.25,
                     height: height * 0.25,
                     marginBottom: height * (0.29 - 0.25)/2
                   }} resizeMode="contain"/>
          </ImageBackground>

          <View style={{
            position: 'relative',
            marginTop: -25,
            zIndex: 100,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center'
          }}>
            <Item rounded style={styles.itemSearch}>
              <TouchableOpacity onPress={this.search.bind(this, this.state.string, false)} activeOpacity={0.9}>
                <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]}
                                style={styles.homesearch} activeOpacity={1}>
                  <Icono name='md-search' style={{fontSize: 20, color: '#FFF'}}/>
                </LinearGradient>
              </TouchableOpacity>
              <Input
                ref={ref => this.searchInputRef = ref}
                placeholder={StringI18.t('ST40')}
                onChangeText={string => this.setState({string})}
                placeholderTextColor="#a4a4a4"
                style={{fontSize: 15, color: '#a4a4a4'}}
                returnKeyType={"search"}
                returnKeyLabel={"Search"}
                onSubmitEditing={this.search.bind(this, this.state.string, false)}
              />
            </Item>
          </View>
          <ListItem icon style={{borderBottomWidth: 0, marginTop: -8}}>
            <Body style={{borderBottomWidth: 0}}>
            <Text
              style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.6)'}}>{StringI18.t('ST11').toUpperCase()}</Text>
            </Body>
          </ListItem>

          <CategoriesHome/>

          <View style={stylesHome.moreBtnContainer}>
            <TouchableOpacity onPress={this.categories.bind(this)} activeOpacity={1}>
              <View style={{
                padding: 6,
                paddingRight: 14,
                paddingLeft: 14,
                borderWidth: 1,
                borderRadius: 50,
                borderColor: 'rgba(0,0,0,0.2)'
              }}>
                <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.2)'}}> {StringI18.t('ST43').toUpperCase()} <Icono active name="ios-arrow-forward"/></Text>
              </View>
            </TouchableOpacity>
          </View>

          <ListItem icon style={{borderBottomWidth: 0}}>
            <Body style={{borderBottomWidth: 0}}>
            <Text
                style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.6)'}}>{StringI18.t('ST13').toUpperCase()}</Text>
            </Body>
          </ListItem>

          <ChefsHome/>

          <View style={stylesHome.moreBtnContainer}>
            <TouchableOpacity onPress={this.chefs.bind(this)} activeOpacity={1}>
              <View style={{
                padding: 6,
                paddingRight: 14,
                paddingLeft: 14,
                borderWidth: 1,
                borderRadius: 50,
                borderColor: 'rgba(0,0,0,0.2)'
              }}>
                <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.2)'}}> {StringI18.t('ST43').toUpperCase()} <Icono active name="ios-arrow-forward"/></Text>
              </View>
            </TouchableOpacity>
          </View>

          <ListItem icon style={{borderBottomWidth: 0}}>
            <Body style={{borderBottomWidth: 0}}>
            <Text
                style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.6)'}}>{StringI18.t('ST12').toUpperCase()}</Text>
            </Body>
          </ListItem>


          <GridRecipesHome/>

          <View style={stylesHome.moreBtnContainer}>
            <TouchableOpacity onPress={this.search.bind(this, " ", true)} activeOpacity={0.9}>
              <View style={{
                padding: 6,
                paddingRight: 14,
                paddingLeft: 14,
                borderWidth: 1,
                borderRadius: 50,
                borderColor: 'rgba(0,0,0,0.2)'
              }}>

                <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.2)'}}> {StringI18.t('ST43').toUpperCase()} <Icono active
                                                                                                            name="ios-arrow-forward"/></Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={stylesHome.translateButton} onPress={this.openSelectLanguage}>
            <Image style={stylesHome.translateButtonIcon} source={require("../../assets/images/google_icon.png")}/>
            <Text style={stylesHome.translateButtonText}>{StringI18.t('Select language', {defaultValue: Strings['Select language']})}</Text>
          </TouchableOpacity>

          <View style={{height: height * 0.05}}>
          </View>
        </ScrollView>
      </Container>


    )
  }
}

const stylesHome = StyleSheet.create({
  moreBtnContainer: {
    alignItems: 'center',
    marginVertical: 12
  },
  translateButton: {
    // transform: [{ scaleX: 0.8}, {scaleY: 0.8}],
    // position: 'absolute',
    // bottom: 24,
    // right: 10,
    marginTop: 9,
    marginBottom: -15,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    borderRadius: 5,
    // maxWidth: 176,
    width: 'auto',
    height: 'auto',
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#cccccc"
  },
  translateButtonText: {
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#4a4a4a",
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 3
  },
  translateButtonIcon: {
    width: 22,
    height: 22,
    marginRight: 6,
    marginBottom: 2
  },
  textLanguage: {
    width: '100%',
    paddingVertical: 4,
    textAlign: 'left'
  },
  languageItemContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start'
  },
  languageItemSelected: {
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
});

const mapStateToProps = state => {
  return {
    selectedLanguage: state.homeRecipes.selectedLanguage,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    search,
    setSelectedLanguage,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
