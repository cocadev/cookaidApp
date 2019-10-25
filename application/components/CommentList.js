import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import StarRating from 'react-native-star-rating';

var styles = require('../../assets/files/Styles');

import {Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base';
import * as firebase from 'firebase';

export default class CommentList extends Component {
  render() {
    const {comment} = this.props;
    var user = firebase.auth().currentUser;
    var photoUrl;

    if (user != null) {
      photoUrl = user.photoURL;
    }
    return (

      <ListItem avatar
                style={{marginBottom: 5, marginLeft: 0, borderBottomWidth: 1, borderColor: '#eee', paddingBottom: 5}}>
        <Body style={{borderBottomWidth: 0}}>
        <StarRating
          disabled={true}
          maxStars={5}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          rating={comment.rating}
          containerStyle={{width: 60}}
          starSize={15}
          starStyle={{color: '#ffc107'}}
        />

        <Text note numberOfLines={5} style={{fontSize: 12}}>{comment.comment}</Text>
        </Body>
        <Right style={{borderBottomWidth: 0}}>
          <Text note style={{color: '#333'}}>{comment.user}</Text>
          <Text note style={{fontSize: 10}}>{comment.date}</Text>
        </Right>
      </ListItem>

    )
  }
}