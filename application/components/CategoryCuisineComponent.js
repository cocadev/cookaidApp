import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import ColorsApp from "../utils/ColorsApp";
import { Text } from "native-base";
import { withNavigation } from "react-navigation";
import { StringI18 } from "../utils/Strings";

class CategoryCuisineComponent extends React.PureComponent {

  gotoCategoryScreen = (item) => {
    const { isCategoryButton } = this.props;
    if (!isCategoryButton) {
      return;
    }
    this.props.navigation.replace('RecipesByCategoryScreen', { IdCategory: item.category_title, TitleCategory: item.category_title, Category: item.category_title });
  }

  renderCategoryTitle = (item) => {
    if (!item || !item.category_title) {
      return null;
    }

    const { isCategoryButton } = this.props;
    return (
      <TouchableOpacity activeOpacity={isCategoryButton ? 0.8 : 1} onPress={() => this.gotoCategoryScreen(item)}>
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
          <Text style={{ color: '#FFF', fontSize: 11, textTransform: 'capitalize' }}>{StringI18.translateIfNotExist(item.category_title)}</Text>
        </LinearGradient>
      </TouchableOpacity>
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
        {StringI18.t(item.chef_title)}
      </Text>
    )
  }

  render() {
    const { item } = this.props;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
        {this.renderCategoryTitle(item)}
        {this.renderCuisine(item)}
      </View>
    )
  }
}

export default withNavigation(CategoryCuisineComponent);
