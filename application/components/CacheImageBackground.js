import React from 'react' ;
import { View, Image, Platform, StyleSheet } from 'react-native';
import CacheImage from "./CacheImage";

class CacheImageBackground extends React.Component {

  render(){
    const {children, style, imageStyle, imageRef, ...props} = this.props;

    return(
      <View
        accessibilityIgnoresInvertColors={true}
        style={style}>
        <CacheImage
          {...this.props}
          style={[
            StyleSheet.absoluteFill,
            {
              // Temporary Workaround:
              // Current (imperfect yet) implementation of <Image> overwrites width and height styles
              // (which is not quite correct), and these styles conflict with explicitly set styles
              // of <ImageBackground> and with our internal layout model here.
              // So, we have to proxy/reapply these styles explicitly for actual <Image> component.
              // This workaround should be removed after implementing proper support of
              // intrinsic content size of the <Image>.
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
export default CacheImageBackground ;
