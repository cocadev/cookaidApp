import React from 'react';
import {Asset} from 'expo-asset'
import * as Font from 'expo-font';
import {Root} from "native-base";
import {AppLoading, Notifications} from 'expo'
import {Platform, StatusBar} from "react-native";
import AppPreLoader from "./application/components/AppPreLoader";

import LoggedNavigation from './application/navigations/Logged';
import OfflineBar from "./application/components/OfflineBar";
// import ColorsApp from './application/utils/ColorsApp';
import {Provider} from 'react-redux';
import {getStore} from "./application/redux";
import {fetchCategory} from "./application/redux/actions/categoryActions";
import {fetchCuisine} from "./application/redux/actions/cuisineActions";
import {fetchRandomRecipes} from "./application/redux/actions/recipesActions";
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import NotificationPopup from 'react-native-push-notification-popup';
import Strings from "./application/utils/Strings";
import CustomPopupNotification from "./application/components/CustomPopupNotification";
// import * as Amplitude from 'expo-analytics-amplitude';

// Amplitude.initialize("480a0845a87dbe75769c39caa0a09aac")
// Amplitude.logEvent(eventName)

// import * as firebase from 'firebase';

//var firebaseConfig = {
 //   apiKey: "AIzaSyDs1F7MQFhS4Pho5JesTbpNlfvFCklH5z8",
 //   authDomain: "cookaid-ltd.firebaseapp.com",
 //   databaseUrl: "https://cookaid-ltd.firebaseio.com",
 //   projectId: "cookaid-ltd",
 //   storageBucket: "cookaid-ltd.appspot.com",
 //   messagingSenderId: "132759157675",
 //   appId: "1:132759157675:ios:d4dc244509b644eff370ee",
 //   measurementId: "G-QFB73SNHM7"
//  };

// firebase.initializeApp(firebaseConfig);

Sentry.init({
  dsn: 'https://916c23c6a44d4379808b60bcaa79fced@sentry.io/1767347',
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
    // store.dispatch(getRandomSpoonacularRecipes(ConfigApp.HOME_MAX_RANDOM_RECIPES));
    store.dispatch(fetchRandomRecipes(6));
    await Promise.all([...imageAssets]);
  }

  async componentDidMount() {

    await Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      // 'simple-line-icons': require('@expo/vector-icons/SimpleLineIcons.ttf'),
      // SimpleLineIcons: require('@expo/vector-icons/SimpleLineIcons.ttf'),
      // Entypo: require('@expo/vector-icons/Entypo.ttf'),
      // Ionicons: require('@expo/vector-icons/Ionicons.ttf'),
      // 'Material Icons': require('@expo/vector-icons/MaterialIcons.ttf'),
      // 'MaterialIcons': require('@expo/vector-icons/MaterialIcons.ttf'),


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

    /*this.notificationListener = Notifications.addListener(notification => {
      // console.log('Notifications', notification);
      if (notification && notification.data && this.popup) {
        const data = notification.data;
        this.popup.show({
          onPress: () => this.dimissNotification({title: data.title, body: data.body}),
          appIconSource: require('./assets/icon-android.png'),
          appTitle: Strings.AppName,
          timeText: 'Now',
          title: data.title,
          body: data.body,
          slideOutTime: data.slideOutTime,
        });
        this.state.notifications.push(notification)
      }
    })*/

    this.setState({
      loaded: true
    });

  }

  dimissNotification = ({title, body}) => {
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
    /*if (this.notificationListener) {
      this.notificationListener();
    }*/
  }

  renderCustomPopup = ({ appIconSource, appTitle, timeText, title, body }) => (
    <CustomPopupNotification
      appIconSource={appIconSource}
      appTitle={appTitle}
      timeText={timeText}
      title={title}
      body={body}
      onDismiss={() => this.dimissNotification({title, body})}
    />
  );

  render() {

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({isReady: true})}
          onError={console.warn}
        />
      );
    }

    const {loaded, isReady} = this.state;

    if (!loaded) {
      return (
        <AppPreLoader/>
      );
    }

    if (isReady) {
      return (
        <Provider store={store}>
          <Root>
            <OfflineBar/>
            <StatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'}/>
            <LoggedNavigation/>
            <NotificationPopup
              ref={ref => notificationPopUp = ref}
              renderPopupContent={this.renderCustomPopup}/>
          </Root>
        </Provider>
      );
    }
  }
}


