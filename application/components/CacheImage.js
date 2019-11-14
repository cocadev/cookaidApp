import React from 'react';
import { View, Image, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';
import { addCachingQueue } from "../redux/actions/imageCachingActions";
import { bindActionCreators } from "redux";
import { fetchCuisine } from "../redux/actions/cuisineActions";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

class CacheImage extends React.Component {

  state = { source: null }

  loadFile = (path) => {
    if (!this.mounted) {
      return;
    }
    this.setState({ source: { uri: path } });
  }

  downloadFile = (uri, path) => {
    this.props.addCachingQueue(uri, path)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.successTask) {
      const filted = nextProps.successTask.filter(item => item.uri === this.props.uri);
      if (filted && filted.length > 0 && filted[0]) {
        this.loadFile(filted[0].path);
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    const { uri } = this.props;
    this.mounted = true;
    const name = shorthash.unique(uri);
    const extension = (Platform.OS === 'android') ? 'file://' : '';
    const match = uri.match(/\.[0-9a-z]+$/i);
    const fileExtension = match ? match[0] || '.png' : '.png';
    const path = `${extension}${FileSystem.cacheDirectory}/${name}${fileExtension}`;

    FileSystem.getInfoAsync(path)
      .then(({ exists, isDirectory }) => {
        if (exists) {
          // console.log('prefetch', `${uri} cached`);
          this.loadFile(path);
        } else {
          this.downloadFile(uri, path);
        }
      })
  }

  render() {
    return (
      <Image style={this.props.style} source={this.state.source} />
    );
  }
}

const mapStateToProps = state => {
  return {
    successTask: state.caching.successTask,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addCachingQueue,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CacheImage);
