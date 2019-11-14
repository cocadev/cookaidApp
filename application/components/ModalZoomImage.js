import React, { Component } from 'react'
import { Modal, StyleSheet, StatusBar, TextInput, Text, View, TouchableHighlight, TouchableOpacity, Dimensions, Image, Button } from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';
import ConfigApp from "../utils/ConfigApp";
import Icono from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get('window');

class ModalZoomImage extends Component {

  constructor(props) {
    super(props)
    this.state = { source: { uri: this.props.src }, width: width, height: height * 0.4 };
  }

  componentWillMount() {
    Image.getSize(this.props.src, (width, height) => {
      this.setState({
        width: width,
        height: width * height / width,
      });
    });
  }

  render() {

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}>
        <View style={styles.modalContainer}>
          <StatusBar backgroundColor={'rgba(0, 0, 0, 0.7)'} />
          <View style={styles.modalContent}>
            <View style={[styles.viewClose, { 'top': (height - this.state.height) / 2 + 8 }]}>
              <TouchableOpacity onPress={this.props.onClose}  >
                <Icon name="cross" style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <TouchableHighlight onPress={this.props.onClose} style={[styles.viewTop, { 'height': (height - this.state.height) / 2 }]}>
              <View style={[styles.viewTop, { 'height': (height - this.state.height) / 2 }]}>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.props.onClose} style={[styles.viewBottom, { 'top': (height - this.state.height) / 2 + this.state.height }, { 'height': (height - this.state.height) / 2 }]}>
              <View style={[styles.viewBottom, { 'top': (height - this.state.height) / 2 + this.state.height }, { 'height': (height - this.state.height) / 2 }]}>
              </View>
            </TouchableHighlight>
            <ImageZoom
              cropWidth={width}
              cropHeight={this.state.height}
              imageWidth={this.state.width}
              imageHeight={this.state.height}>
              <Image
                style={{ height: this.state.height, width: this.state.width, zIndex: 20 }}
                source={this.state.source}
              />
            </ImageZoom>
          </View>
        </View>
      </Modal>
    )
  }

}

let styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: 'transparent'
  },
  modalContent: {
    width: width,
    height: height,
    borderRadius: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  viewTop: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: width,
    left: 0,
    top: 0,
    zIndex: 10,
  },

  viewBottom: {
    position: 'absolute',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: width,
    left: 0,
    zIndex: 10,
    flex: 1,
    justifyContent: 'center',
  },
  viewClose: {
    position: 'absolute',
    right: 8,
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    zIndex: 130,
    alignItems: 'flex-end'
  },
  closeIcon: {
    fontSize: 20,
    width: 20,
    height: 20,
    color: '#ffffff'
  },
})

ModalZoomImage.propTypes = {

}

export default ModalZoomImage;
