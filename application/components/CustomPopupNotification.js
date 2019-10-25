import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

class CustomPopupNotification extends React.Component {
  componentWillUnmount() {
    if (this.props.onDismiss && typeof this.props.onDismiss === "function") {
      this.props.onDismiss();
    }
  }

  render() {
    const {appIconSource, appTitle, timeText, title, body} = this.props;
    return (
      <View style={styles.popupContentContainer}>
        <View style={styles.popupHeaderContainer}>
          <View style={styles.headerIconContainer}>
            <Image style={styles.headerIcon} source={appIconSource || null}/>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText} numberOfLines={1}>
              {appTitle || ''}
            </Text>
          </View>
          <View style={styles.headerTimeContainer}>
            <Text style={styles.headerTime} numberOfLines={1}>
              {timeText || ''}
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          {!!title &&<View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{title || ''}</Text>
          </View>}
          <View style={styles.contentTextContainer}>
            <Text style={styles.contentText}>{body || ''}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  popupContentContainer: {
    backgroundColor: 'white',  // TEMP
    borderRadius: 12,
    minHeight: 86,
    // === Shadows ===
    // Android
    elevation: 2,
    // iOS
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  popupHeaderContainer: {
    height: 42,
    backgroundColor: '#F1F1F1',  // TEMP
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIconContainer: {
    height: 22,
    width: 22,
    marginTop: 15,
    marginBottom: 13,
    marginLeft: 12,
    marginRight: 6,
    borderRadius: 4,
  },
  headerIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 14,
    color: '#808080',
    lineHeight: 20,
  },
  headerTimeContainer: {
    marginHorizontal: 16,
  },
  headerTime: {
    fontSize: 12,
    color: '#808080',
    lineHeight: 14,
  },
  contentContainer: {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  contentTitleContainer: {},
  contentTitle: {
    fontSize: 20,
    // lineHeight: 18,
    color: 'black',
  },
  contentTextContainer: {},
  contentText: {
    fontSize: 15,
    color: '#808080',
    marginTop: 6,
    marginBottom: 6,
  },
});

export default CustomPopupNotification;
