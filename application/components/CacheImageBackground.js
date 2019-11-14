import React from 'react';
import { View, Image, Platform, StyleSheet } from 'react-native';
import CacheImage from "./CacheImage";

class CacheImageBackground extends React.Component {

  render() {
    const { children, style, imageStyle, imageRef, ...props } = this.props;

    return (
      <View
        accessibilityIgnoresInvertColors={true}
        style={style}>
        <CacheImage
          {...this.props}
          style={[
            StyleSheet.absoluteFill,
            {
              width: style.width,
              height: style.height,
            },
            imageStyle,
          ]}
        />
        {children}
      </View>
    )
  }
}
export default CacheImageBackground;
