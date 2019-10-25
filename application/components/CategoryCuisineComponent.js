import React from 'react';
import {View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import ColorsApp from "../utils/ColorsApp";
import {Text} from "native-base";

class CategoryCuisineComponent extends React.PureComponent {

  renderCategoryTitle = (item) => {
    if (!item || (!item.category_title && !item.chef_title)) {
      return null;
    }

    return (
      <LinearGradient
        colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]}
        start={[0, 0]} end={[1, 0]}
        style={{
          paddingHorizontal: 10,
          padding: 3,
          borderRadius: 10, // category border-radius
          marginLeft: -1,
          backgroundColor: ColorsApp.PRIMARY
        }}>
        <Text style={{color: '#FFF', fontSize: 11, textTransform: 'capitalize'}}>{item.category_title || item.chef_title}</Text>
      </LinearGradient>
    )
  }
  renderCuisine = (item) => {
    if (!item || !item.chef_title || !item.category_title) {
      return;
    }
    return (
      <Text
        style={{
          color: '#FFF',
          fontSize: 11,
          paddingLeft: 8,
          paddingHorizontal: 10,
          padding: 6,
          textTransform: 'capitalize'
        }}>
        {item.chef_title}
      </Text>
    )
  }

  render() {
    const {item} = this.props;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5,}}>
        {this.renderCategoryTitle(item)}
        {this.renderCuisine(item)}
      </View>
    )
  }
}

export default CategoryCuisineComponent;
