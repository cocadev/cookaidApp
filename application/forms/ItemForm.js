import React, {Component} from 'react';
import {options, Comment} from './Comment';
import t from 'tcomb-form-native';

const Form = t.form.Form;
import {View, TouchableOpacity} from "react-native";
import {Button, Text} from 'native-base';
import * as firebase from 'firebase';
import Strings from '../utils/Strings';

import {LinearGradient} from 'expo-linear-gradient';
import ColorsApp from '../utils/ColorsApp';

var styles = require('../../assets/files/Styles');

export default class ItemForm extends Component {
  constructor(props) {
    super(props);
    var user = firebase.auth().currentUser;
    var date = new Date().toDateString();

    this.state = {
      comment: {
        comment: '',
        rating: 1,
        user: user.displayName,
        date: date
      }
    };
  }

  randomFunction() {
    this.props.closeModal();
  }

  addComment() {
    var user = firebase.auth().currentUser;
    var date = new Date().toDateString();

    const validate = this.refs.form.getValue();
    if (validate) {
      let data = {};
      let comment = Object.assign({}, validate);
      let ref = firebase.database().ref().child('itemComments');
      const key = ref.push().key;

      data[`${this.props.itemId}/${key}`] = comment;

      ref.update(data).then(() => {
        this.setState((prevState, props) => {
          return {
            comment: {
              comment: '',
              rating: 1,
              user: user.displayName,
              date: date

            }
          }
        });

        this.randomFunction();


      })


    }


  }

  onChange(comment) {
    this.setState({comment});
  }

  render() {
    const {comment} = this.state;
    return (
      <View>
        <Form
          ref="form"
          type={Comment}
          options={options}
          value={comment}
          onChange={(v) => this.onChange(v)}
        />
        <TouchableOpacity onPress={this.addComment.bind(this)} activeOpacity={1}>
          <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]}
                          style={styles.postCommentButton}>
            <Text style={styles.postCommentText}>{Strings.ST61.toUpperCase()}</Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>


    )
  }
}