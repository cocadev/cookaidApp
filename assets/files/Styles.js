'use strict';

import {Dimensions, Platform} from "react-native";
import ColorsApp from '../../application/utils/ColorsApp';

var React = require('react-native');

var { StyleSheet } = React;

var {height, width} = Dimensions.get('window');

export const PrimaryColor = ColorsApp.PRIMARY;
export const SecondColor = ColorsApp.SECOND;

module.exports = StyleSheet.create({

//////////////////////// GENERAL

primarycolor:{
color: PrimaryColor,
},

primarybackground:{
backgroundColor: PrimaryColor,
},

bannerAd:{
  position: 'absolute',
  bottom: 25,
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  backgroundColor: 'transparent',
  width: width
},

bannerAdLight:{
  position: 'absolute',
  bottom: 10,
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  backgroundColor: 'transparent',
  width: width
},

headerStyle:{
      backgroundColor: PrimaryColor,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      elevation: 0,
},

homesearch:{
  width: 35,
  height: 35,
  marginLeft: 9,
  borderRadius: 35/2,
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  backgroundColor: PrimaryColor
},

inputLogin:{

backgroundColor: '#FFFFFF',
width: width*0.80,
shadowRadius: 5,
marginBottom: 20,
borderColor: '#a4a4a4',
color: '#a4a4a4'

},

itemSearch:{

  backgroundColor: '#FFFFFF',
  width: width*0.90,
  shadowOffset:{  width: 2,  height: 4,  },
shadowColor: 'black',
shadowOpacity: 0.1,
elevation: 4,
shadowRadius: 5,
marginBottom: 20
},

buyButton:{
  backgroundColor: SecondColor,
  padding: 15,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 10,
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
},
starcolor:{
  color: '#ffc107'
},

collapseStyle:{
  width: width,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 5,
  padding: 10
},

buyButton2:{
  backgroundColor: SecondColor,
  padding: 10,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 10,
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
},

titlePayment:{
  margin: 5,
  paddingTop: 10,
  paddingBottom: 10,
  alignContent: 'center',
  alignItems: 'center',
  backgroundColor: '#efefef',
  borderRadius: 10
},

readmore:{
backgroundColor: SecondColor,
alignItems: 'center',
alignContent: 'center',
justifyContent: 'center',
zIndex: 999
},

categoryOffer:{
color: 'rgba(255,255,255,0.5)',
fontSize: 12,
marginBottom: 8
},

secondcolor:{
color: SecondColor,
},

padding_general:{
padding: 20,
backgroundColor: '#FFF'
},

background_general:{
backgroundColor: '#FFF',
flex: 1
},

card_general:{
width: width,
},

socialIcon:{
  fontSize: 46,
  width: 50,
  height: 50,
  color: '#FF8400'
},

gradient_general:{
position: 'absolute',
padding:15,
left: 0,
right: 0,
bottom: 0,
height: '100%',
alignItems: 'center',
justifyContent: 'center'
},

title_general:{
color: '#FFF',
fontSize: 28,
fontWeight: 'bold'
},

subtitle_general:{
color: PrimaryColor,
fontSize: 16,
fontWeight: '300'
},

touchBookmark:{
backgroundColor: PrimaryColor,
width: 50,
height: 50,
position: 'absolute',
right: 15,
bottom: -25,
borderRadius: 50,
alignItems: 'center',
justifyContent: 'center'
},

touchBookmarkTran:{
backgroundColor: 'rgba(0,0,0,0.4)',
width: 50,
height: 50,
position: 'absolute',
right: 15,
top: 10,
borderRadius: 50,
alignItems: 'center',
justifyContent: 'center'
},


//////////////////////// DETAILS

label_details:{
color: PrimaryColor,
fontSize: 15,
fontWeight: 'bold',
marginBottom: 3
},


//////////////////////// CATEGORIES

title_categories:{
color: '#FFF',
fontSize: 16,
fontWeight: 'bold'
},

title_categories_background:{
  width: width,
  alignItems: 'center',
  padding: 15
},

title_categories_border:{
height: 2,
backgroundColor: PrimaryColor,
width: 50
},

gradient_categories:{
position: 'absolute',
left: 0,
right: 0,
bottom: 0,
height: height /4.35,
alignItems: 'center',
justifyContent: 'flex-end'
},

background_categories:{
width: width,
height: height /4.35,
alignItems: 'center',
justifyContent: 'flex-end',
},

gradient_2columns:{
position: 'absolute',
left: 0,
right: 0,
bottom: 0,
height: height /4.35,
alignItems: 'center',
justifyContent: 'flex-end'
},

title_2columns_background:{
  width: width * 0.45,
  alignItems: 'center',
  padding: 15
},

background_2columns:{
width: width * 0.45,
height: height * 0.15,
alignItems: 'center',
justifyContent: 'flex-end',
margin: 5
},

background_exercises:{
width: width * 0.45,
height: height * 0.15,
alignItems: 'flex-start',
justifyContent: 'flex-end',
margin: 5
},

//////////////////////// POSTS


title_posts_categories:{
color: '#FFF',
fontSize: 13,
padding: 10,
fontWeight: 'bold',
paddingTop: 2
},

date_posts:{
color: 'rgba(255,255,255,0.50)',
fontSize: 11,
padding: 10,
paddingBottom: 0,
fontWeight: 'bold'
},

gradient_posts_2columns:{
position: 'absolute',
left: 0,
right: 0,
bottom: 0,
height: height * 0.15,
alignItems: 'flex-start',
justifyContent: 'flex-end'
},

background_posts_2columns:{
width: width * 0.46,
height: height * 0.15,
alignItems: 'flex-start',
justifyContent: 'flex-end',
},

postDetail_background:{
width: width,
height: height * 0.25,
alignItems: 'center',
justifyContent: 'center',
},

postDetail_gradient:{
position: 'absolute',
padding:15,
left: 0,
right: 0,
bottom: 0,
height: height * 0.10,
alignItems: 'flex-start',
justifyContent: 'flex-end'
},

postDetail_title:{
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5,
  lineHeight: 25,
},

postDetail_tag:{
  fontSize: 16,
  fontWeight: 'bold',
  color: PrimaryColor,
  lineHeight: 30,
},

postDetail_date:{
  fontSize: 14,
  fontWeight: 'normal',
  color: '#333',
  marginLeft: 0,
},

postCommentButton:{
  borderRadius: 10,
  elevation: 0,
  shadowOpacity: 0,
  alignItems: 'center',
justifyContent: 'center',
paddingVertical: 10
},

postCommentText:{
  color: '#FFFFFF',
  fontSize: 13
},

//////////////////////// DIETS

title_diets:{
color: '#FFF',
fontSize: 17,
marginBottom: 5,
fontWeight: 'bold'
},

title_diets_categories:{
color: '#FFF',
fontSize: 14,
padding: 10,
fontWeight: 'bold'
},

category_diets:{
color: '#000',
marginBottom: 8,
fontSize: 14,
backgroundColor: SecondColor,
padding: 5
},

subcategory_diets:{
color: '#FFF',
fontSize: 15,
opacity: 0.8,
marginBottom: 10,
},

gradient_diets:{
position: 'absolute',
padding:15,
left: 0,
right: 0,
bottom: 0,
height: height * 0.35,
alignItems: 'flex-start',
justifyContent: 'flex-end'
},

background_diets:{
width: width,
height: height * 0.35,
alignItems: 'flex-start',
justifyContent: 'flex-end',
padding: 15
},

gradient_diets_2columns:{
position: 'absolute',
left: 0,
right: 0,
bottom: 0,
height: height * 0.15,
alignItems: 'flex-start',
justifyContent: 'flex-end'
},

background_diets_2columns:{
width: width * 0.46,
height: height * 0.15,
alignItems: 'flex-start',
justifyContent: 'flex-end',
},

background_diets_col:{
width: width,
height: height * 0.25,
alignItems: 'center',
justifyContent: 'center',
},

info_diets:{
  backgroundColor: 'rgba(0,0,0,0.70)',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 6,
  paddingBottom: 11,
  paddingTop: 11
},

title_diets_detail:{
  fontSize: 20,
  fontWeight: 'normal',
  lineHeight: 30,
},

gtitle_diets_detail:{
  fontSize: 16,
  fontWeight: 'bold',
},

description_diets_detail:{
  fontSize: 14,
},

col_diets: {
height: 70,
alignItems: 'center',
justifyContent: 'center'

},

titlecol_diets: {
fontWeight: 'bold',
fontSize: 15,
marginTop: 5,
color: PrimaryColor

},

headerProfile:{
  width: width,
  height: height * 0.12,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: PrimaryColor,
  marginTop: -1
},

nameProfile:{
  color: SecondColor,
  fontWeight: 'bold',
  fontSize: 20,
  marginTop: 6
},

tabs_diets: {
backgroundColor: PrimaryColor,
},

activetabs_diets: {
backgroundColor: PrimaryColor,
},

tabs_text_diets: {
color: 'rgba(255,255,255,0.4)',
fontWeight: 'normal'
},

activetabs_text_diets: {
color: '#fff',
fontWeight: 'normal'
},

tabBarUnderline:{
backgroundColor: 'rgba(0,0,0,0.3)',
},

tabs_2: {
backgroundColor: '#fff',

},

activetabs_2: {
backgroundColor: '#fff',

},

tabs_text_2: {
color: 'rgba(0,0,0,0.3)',
fontWeight: 'normal',
fontSize: 12
},

activetabs_text_2: {
color: 'rgba(0,0,0,0.5)',
fontWeight: 'normal',
fontSize: 12
},

//////////////////////// CARDS

title_card:{
color: '#FFF',
fontSize: 14,
marginBottom: 3,
fontWeight: 'bold'
},

category_card:{
color: PrimaryColor,
marginBottom: 3,
fontSize: 14
},

category_card_2:{
color: '#FFF',
opacity: 0.8,
marginBottom: 3,
fontSize: 14
},

subcategory_card:{
color: '#FFF',
fontSize: 14,
opacity: 0.8
},

price:{
color: SecondColor,
fontSize: 14,
marginRight: 5,
fontWeight: 'bold'
},

oldprice:{
color: '#FFF',
fontSize: 12,
opacity: 0.8,
textDecorationLine: 'line-through'
},

detailPrice:{
  fontWeight: 'bold',
  fontSize: 19,
  marginBottom: 3,
},

detailOldPrice:{
  fontSize: 15,
  color: '#888888'
},

detailPrice2:{
  fontWeight: 'bold',
  fontSize: 19,
  color: SecondColor
},

totalprice:{
  fontSize: 13,
  marginBottom: 3,
  color: '#fff'
},


savePrice:{
  marginBottom: 5,
  marginTop: 5,
  backgroundColor: '#ddedd1',
  alignSelf: 'flex-start',
  padding: 5,
  paddingLeft: 7,
  paddingRight: 7,
  borderRadius: 5

},

saveTextPrice:{
  fontSize: 15,
  color: '#367806',

},

saveHomePrice:{
  marginBottom: 5,
  marginTop: 5,
  backgroundColor: '#ddedd1',
  alignSelf: 'flex-start',
  padding: 5,
  paddingLeft: 7,
  paddingRight: 7,
  borderRadius: 5

},

saveTextHomePrice:{
  fontSize: 13,
  color: '#367806',

},

gradient_card:{
position: 'absolute',
padding:15,
left: 0,
right: 0,
bottom: 0,
height: height * 0.19,
alignItems: 'flex-start',
justifyContent: 'flex-end',
borderRadius: 10,
overflow: 'hidden'
},

background_card:{
width: null,
height: height * 0.19,
alignItems: 'flex-start',
justifyContent: 'flex-end',
padding: 15,
borderRadius: 10,
overflow: 'hidden'
},

//////////////////////// WORKOUT DETAILS

title_workout:{
color: '#FFF',
fontSize: 18,
marginBottom: 3,
fontWeight: 'bold'
},

category_workout:{
color: PrimaryColor,
fontSize: 16,
fontWeight: 'bold'

},

gradient_workout:{
position: 'absolute',
left: 0,
right: 0,
bottom: 0,
height: height * 0.25,
alignItems: 'center',
justifyContent: 'center'
},

background_workout:{
width: width,
height: height * 0.25,
alignItems: 'center',
justifyContent: 'center',
},

col_workout: {
height: 70,
alignItems: 'center',
justifyContent: 'center'

},

titlecol_workout: {
fontWeight: 'bold',
fontSize: 18,
color: PrimaryColor

},

icon_workout:{

fontSize: 26,
fontWeight: 'bold',
color: '#ddd',
position: 'absolute',
right: 15

},

textButton_workout:{
color: '#000'
},

button_workout:{
backgroundColor: 'transparent',
borderBottomWidth: 1,
justifyContent: "center",
alignItems: 'flex-start',
borderColor: 'rgba(0,0,0,0.02)',
height: 48,
paddingLeft: 15,
elevation: 0,
shadowOpacity: 0
 },

//////////////////////// EXERCISE

footer_exercise:{
backgroundColor: '#fff',
borderColor: '#fff',
marginTop: 10,
marginBottom: 5,
elevation: 0,
shadowOpacity: 0,
 },

start_exercise:{
backgroundColor: '#fff',
borderColor: PrimaryColor,
borderWidth: 1,
elevation: 0,
shadowOpacity: 0,
borderRadius: 5,
width: width * 0.9
 },

 textStart_exercise:{
color: PrimaryColor,
fontSize: 16,
fontWeight: 'bold'
 },

 col_exercise:{
alignItems: 'center',
justifyContent: 'center'
 },

 titlecol_exercise: {
fontWeight: 'bold',
marginTop: 2,
marginBottom: 6,
fontSize: 16,

},

title_exercise_background:{
  width: width,
  alignItems: 'flex-start',
  padding: 15
},

subtitle_exercise:{
color: PrimaryColor,
},

icon_get:{

fontSize: 14,
fontWeight: 'bold',
color: PrimaryColor

},

icon_exercise:{
width: 40, height: 40,
marginTop: 10,
marginBottom: 7
},

icon_videoexercise:{
width: 50, height: 50,
marginTop: 10,
marginBottom: 7
},

playButton:{
  backgroundColor: PrimaryColor,
  elevation: 0,
  shadowOpacity: 0
},

playCol_exercise:{
alignItems: 'center',
justifyContent: 'center',
margin: 15
 },

//////////////////////// START

button_start:{
minWidth: 250,
backgroundColor: 'transparent',
borderWidth: 1,
borderColor: SecondColor,
borderRadius: 100,
marginBottom: 11,
height: 53,
shadowOpacity: 0,
shadowRadius: 0,
elevation: 0,
shadowOffset: {
  width: 0,
  height: 0
}
},

button_start_text:{
fontWeight: 'bold',
color: SecondColor,
fontSize: 14

},

button_start_2:{
width: width * 0.80,
marginBottom: 11,
height: 53,
  ...Platform.select({
    ios: {
      borderRadius: 53/2,
    },
    android: {
      borderRadius: 100,
    },
  }),
alignItems: 'center',
alignContent: 'center',
justifyContent: 'center',
shadowOpacity: 0,
shadowRadius: 0,
elevation: 0,
shadowOffset: {
  width: 0,
  height: 0
},
},

logo_start:{
width: 200,
height: 200,
marginTop: 15,
marginBottom: 5},



//////////////////////// LOGIN & SIGNUP

button_auth:{
width: width * 0.80,
backgroundColor: PrimaryColor,
marginBottom: 8,
height: 53,
shadowOpacity: 0,
shadowRadius: 0,
elevation: 0,
shadowOffset: {
  width: 0,
  height: 0
},
borderRadius: 100,
alignItems: 'center',
alignContent: 'center',
justifyContent: 'center',
},

text_auth:{
backgroundColor: 'transparent',
textAlign:'center',
maxWidth: 300,
minWidth: 300,
marginTop: 5,
fontSize: 13,
color: '#808080',
shadowOpacity: 0,
shadowRadius: 0,
elevation: 0,
shadowOffset: {
  width: 0,
  height: 0
}
},

//////////////////////// HOME


listitem_home:{

borderBottomWidth: 0,
backgroundColor: 'transparent',
},

icon_home:{

	fontSize: 20,
	color: '#ddd'

},

note_home:{

  fontSize: 13,

},

//////////////////////// MENU

sideMenu:{

backgroundColor: 'white',
flexDirection:'column',
justifyContent: 'center',
alignItems: 'center',
height: height * 0.30,
marginTop: 30,
padding:30
},

container_menu: {
    backgroundColor: 'white'
},

item_menu:{

borderBottomWidth: 0,
borderBottomColor: '#FFFFFF',
marginLeft: 0,
paddingRight: 20,
paddingLeft: 40,
marginBottom: 6,
marginTop: 6
},

text_menu:{

fontSize: 14,
fontWeight: 'bold',
color: '#333'

},

iconSidemenu:{

color: PrimaryColor,
fontSize: 25

},


thumbnail_menu:{
marginRight: 10,
maxWidth: 40
},

icon_menu:{

  fontSize: 20,
  color: '#ddd',
  opacity: 0.5

},

  footer_menu: {
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },

  wrapper: {
    paddingTop: 50,
    flex: 1
  },

  modal: {

  },

  modal3: {
    height: 'auto',
    maxHeight: height * 0.60,
    width: width * 0.80,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10
  },

});
