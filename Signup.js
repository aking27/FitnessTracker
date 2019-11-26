import React from 'react';
import Button from './Button';

import { View, TextInput, StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      username: "",
      password: "",
      confirmPass: ""
    }
  }
  // async newUser(){ //signup
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   var raw = "{\n    \"username\": \"" + this.state.username + "\",\n    \"password\": \"" + this.state.password + "\"\n}";
  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   try{
  //     let response = await fetch('https://mysqlcs639.cs.wisc.edu/users', requestOptions);
  //     let result = await response.json();

  //     this.props.userSignedUp(); // get the created account alert
  //     this.props.login(); // log the user in and get their information (in APP)
  //   } catch {
  //     console.log(error);
  //   }
  // }
  async comparePassword(){
    if(this.state.confirmPass.length >= 5 || this.state.password.length >= 5 || this.state.username.length >= 5){
      if(this.state.confirmPass == this.state.password){
        await this.sendUsername();
        await this.sendPassword();
        await this.props.newUser();
  
      } else {
        alert('Passwords don\'t match! Try again.');
        return;
      }
    } else {
      alert('Username and passwords need to be at least 5 characters long. Try again.');
    }
  }
  sendUsername(){
    this.props.setUsernameFromSignup(this.state.username);
  }
  sendPassword(){

    this.props.setPasswordFromSignup(this.state.password);
  }
  goBack(){
    this.props.goBackSignup(!this.props.signupPage);
  }
  render() {
    const styles = StyleSheet.create({
      appName: {
        fontSize: 45,
        marginBottom: 15,
        fontFamily: 'GillSans-SemiBold',
        color: 'white'
      },
      instructions: {
        fontSize: 20,
        fontFamily: 'GillSans',
        color: 'white',
        marginBottom: 10
      },
      buttons: {
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        width: 100,
        marginTop: 10
      },
      backButton: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        width: 100,
        marginTop: 10
      },
      input: {
        width: 250,
        margin: 5,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        color: 'white'
      }
    });
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4E5851'}} behavior="padding" enabled>
          <Text style={styles.appName}>Fitness Tracker</Text>
          <Text style={styles.instructions}>Sign up below</Text>
          <TextInput style={styles.input} textStyle={{color: '#ffffff'}} placeholderTextColor={'#ededed'} onChangeText={(text) => this.setState({username: text})} placeholder= "Username" value={this.state.text}/>
          <TextInput style={styles.input} textStyle={{color: '#ffffff'}} placeholderTextColor={'#ededed'} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholder= "Password" value={this.state.text}/>
          <TextInput style={styles.input} textStyle={{color: '#ffffff'}} placeholderTextColor={'#ededed'} onChangeText={(text) => this.setState({confirmPass: text})} secureTextEntry={true} placeholder= "Confirm Password" value={this.state.text}/>
          <Button buttonStyle={styles.buttons} textStyle={{color: '#ffffff', textAlign: 'center'}} text={'Create Account'} onPress={() => this.comparePassword()}/>
          <Button buttonStyle={styles.backButton} textStyle={{color: '#ffffff'}} text={'Go Back'} onPress={() => this.goBack()}/>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );

  }
  componentDidMount() { // this is for the keyboard
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
}
export default Signup;
