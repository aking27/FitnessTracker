import React from 'react';
import { Text, View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet } from 'react-native';
import base64 from 'base-64';
import Button from './Button';

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caloriesInput: 0.0,
      durationInput: 0.0,
      nameInput: "",
      activityID: ""
    }
  }

  render() {
    const styles = StyleSheet.create({
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20
        },
        closeButton: {
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          height: 70,
          position: 'absolute',
          right: 0
        },
        instructions: {
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 25,
          fontFamily: 'GillSans-SemiBold',
          color: 'black',
          marginTop: 60,
          textAlign: 'center'
        },
        input: {
          alignItems: 'center', justifyContent: 'center', borderColor: 'gray',
          margin: 5,
          height: 40,
          borderWidth: 1,
          marginTop: 10,
          borderRadius: 10,
          padding: 10,
          marginLeft: 20,
          marginRight: 20
        }
    });

    if(this.props.show) {
      const screenWidth = Math.round(Dimensions.get('window').width);
      const screenHeight = Math.round(Dimensions.get('window').height);

      return (
        <View style={{position: 'absolute'}}>
          <TouchableWithoutFeedback onPress={() => this.props.hideDeleteModal()}>
            <View style={{width: screenWidth, height: screenHeight, backgroundColor: 'black', opacity: 0.75}}>
            </View>
          </TouchableWithoutFeedback>
          <View style={{position: 'absolute', width: this.props.width, height: this.props.height, left: (screenWidth - this.props.width)/2, top: (screenHeight - this.props.height)/2, backgroundColor: 'white', borderRadius: 10}}>
            <Text style={styles.instructions}>Account Settings</Text>
            <Button buttonStyle={styles.button} textStyle={{color: '#ffffff'}} text={'Delete Account'} onPress={() => this.props.deleteUser()}/>

            <Button buttonStyle={styles.closeButton} textStyle={{fontSize: 25}} text={'✕'} onPress={() => this.props.hideDeleteModal()}/>
          </View>
        </View>
      )
    }
    return (<View></View>)
  }
}

export default DeleteModal;
