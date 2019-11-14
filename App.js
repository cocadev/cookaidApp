import React from 'react';
import { Asset } from 'expo-asset'
import * as Font from 'expo-font';
import { Root } from "native-base";
import { AppLoading, Notifications } from 'expo'
import { Platform, StatusBar } from "react-native";
import AppPreLoader from "./application/components/AppPreLoader";
import LoggedNavigation from './application/navigations/Logged';
import OfflineBar from "./application/components/OfflineBar";
import { Provider } from 'react-redux';
import { getStore } from "./application/redux";
import { fetchCategory } from "./application/redux/actions/categoryActions";
import { fetchCuisine } from "./application/redux/actions/cuisineActions";
import { fetchRandomRecipes } from "./application/redux/actions/recipesActions";
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import NotificationPopup from 'react-native-push-notification-popup';
import Strings from "./application/utils/Strings";
import CustomPopupNotification from "./application/components/CustomPopupNotification";

Sentry.init({
  dsn: 'PRIMIARY_KEY',
  enableInExpoDevelopment: false,
  debug: true
});

Sentry.setRelease(Constants.manifest.revisionId);

console.disableYellowBox = true;

export let notificationPopUp;

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const store = getStore();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      isReady: false,
      notifications: [],
    }
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/images/header.jpg'),
      require('./assets/images/logo.png'),
      require('./assets/images/logo_dark.png'),
      require('./assets/images/logo_home.png'),
      require('./assets/images/emptylist.png'),
      require('./assets/images/chef.png'),
      require('./assets/images/nointernet.png'),
      require('./assets/images/contact.png'),
      require('./assets/images/servings.png'),
      require('./assets/images/calories.png'),
      require('./assets/images/checked.png'),
      require('./assets/images/cooktime.png'),
      require('./assets/images/thumb.png'),
      require('./assets/images/health_icon.png'),
    ]);
    store.dispatch(fetchCategory());
    store.dispatch(fetchCuisine());
    store.dispatch(fetchRandomRecipes(6));
    await Promise.all([...imageAssets]);
  }

  async componentDidMount() {

    await Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });

    if (Platform.OS === 'android') {
      await Notifications.createChannelAndroidAsync(Strings.ChannelId, {
        name: Strings.AppName,
        description: Strings.ChannelDescription,
        sound: true,
        vibrate: true,
        badge: false,
      });
    }

    this.setState({
      loaded: true
    });

  }

  dimissNotification = ({ title, body }) => {
    const filted = this.state.notifications.filter(item => {
      return !!(item && item.data && item.data.title == title && item.data.body == body);
    })
    if (!filted || !(filted.length > 0)) {
      return;
    }
    const notification = filted[0];
    Notifications.dismissNotificationAsync(notification.notificationId)
      .then(() => {
        console.log('dismissNotificationAsync', 'finish')
      })
      .catch(e => {
        console.log('dismissNotificationAsync', 'error', e)
      })
  }

  componentWillUnmount() {

  }

  renderCustomPopup = ({ appIconSource, appTitle, timeText, title, body }) => (
    <CustomPopupNotification
      appIconSource={appIconSource}
      appTitle={appTitle}
      timeText={timeText}
      title={title}
      body={body}
      onDismiss={() => this.dimissNotification({ title, body })}
    />
  );

  render() {

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    const { loaded, isReady } = this.state;

    if (!loaded) {
      return (
        <AppPreLoader />
      );
    }

    if (isReady) {
      return (
        <Provider store={store}>
          <Root>
            <OfflineBar />
            <StatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'} />
            <LoggedNavigation />
            <NotificationPopup
              ref={ref => notificationPopUp = ref}
              renderPopupContent={this.renderCustomPopup} />
          </Root>
        </Provider>
      );
    }
  }
}


