import React from 'react';
import {View, Text} from "react-native";
import StarRating from 'react-native-star-rating';

export default sliderTemplate = (locals) => {
  const help = (
    <Text style={{marginBottom: 8}}>{locals.help}</Text>
  );
  return (
    <View>
      <StarRating
        ref="input"
        disabled={false}
        maxStars={5}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        rating={parseInt(locals.value)}
        containerStyle={{width: 160}}
        starSize={30}
        selectedStar={value => locals.onChange(value)}
        starStyle={{color: '#ffc107'}}
      />
      {help}
    </View>
  )
}