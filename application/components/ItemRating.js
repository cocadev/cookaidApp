import React, { PureComponent } from 'react';
import * as firebase from 'firebase';
import { View } from "react-native";
import StarRating from 'react-native-star-rating';

export default class ItemRating extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
    const { itemId } = props;
    const { starWidth } = props;
    this.commentsRef = firebase.database().ref(`itemComments/${itemId}`);
  }

  componentDidMount() {
    this.commentsRef.on("child_added", snapshot => {
      this.commentsRef.on("value", snap => {
        let comments = [];
        snap.forEach(row => {
          comments.push(parseInt(row.val().rating));
        });

        this.setState({
          rating: comments.reduce((previous, current) => previous + current, 0) / comments.length
        });

      })
    });
  }

  render() {
    const { rating } = this.state;
    return (
      <View>
        <StarRating
          ref="rating"
          disabled={true}
          maxStars={5}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          rating={rating}
          containerStyle={{ width: this.props.starWidth }}
          starSize={this.props.starSize}
          starStyle={{ color: '#ffc107' }}
        />
      </View>
    )
  }
}