import React from 'react';
import { Text, View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet } from 'react-native';
import base64 from 'base-64';
import Button from './Button';

class ActivityModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caloriesInput: 0.0,
      durationInput: 0.0,
      nameInput: "",
      activityID: ""
    }
  }
  async postActivities(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.props.token);
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.props.username + ":" + this.props.password));

    var raw = "{\n	\"name\": \"" + this.state.nameInput + "\",\n	\"calories\" : " + this.state.caloriesInput + ",\n	\"duration\": " + this.state.durationInput + "\n}";

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try{
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/activities', requestOptions);

      let result = await response.json();
      this.props.getActivities();
      this.props.hide();
      alert('Exercise Successfully Added!')
    } catch {
      alert(error);
    }
  }

  async runPress(){
    await this.setState({nameInput: "Running"});
    await this.postActivities();
  }
  async walkPress(){
    await this.setState({nameInput: "Walking"});
    await this.postActivities();
  }
  async bikePress(){
    await this.setState({nameInput: "Cylcing"});
    await this.postActivities();
  }
  async swimPress(){
    await this.setState({nameInput: "Swimming"});
    await this.postActivities();
  }
  render() {
    const styles = StyleSheet.create({
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'dodgerblue',
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
          <TouchableWithoutFeedback onPress={() => this.props.hide()}>
            <View style={{width: screenWidth, height: screenHeight, backgroundColor: 'black', opacity: 0.75}}>
            </View>
          </TouchableWithoutFeedback>
          <View style={{position: 'absolute', width: this.props.width, height: this.props.height, left: (screenWidth - this.props.width)/2, top: (screenHeight - this.props.height)/2, backgroundColor: 'white', borderRadius: 10}}>
            <Text style={styles.instructions}>Enter the fields below and press the corresponding exercise</Text>

            <TextInput style={styles.input}  textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({caloriesInput: text})}
            placeholder= "Calories Burned"/>
            <TextInput style={styles.input}  textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({durationInput: text})}
            placeholder= "Duration of Exercise (min.)"/>
            <Button buttonStyle={styles.button} textStyle={{color: '#ffffff'}} text={'Add a Run'} onPress={() => this.runPress()}/>
            <Button buttonStyle={styles.button} textStyle={{color: '#ffffff'}} text={'Add a Walk'} onPress={() => this.walkPress()}/>
            <Button buttonStyle={styles.button} textStyle={{color: '#ffffff'}} text={'Add a Bike Ride'} onPress={() => this.bikePress()}/>
            <Button buttonStyle={styles.button} textStyle={{color: '#ffffff'}} text={'Add a Swim'} onPress={() => this.swimPress()}/>
            <Button buttonStyle={styles.closeButton} textStyle={{fontSize: 25}} text={'✕'} onPress={() => this.props.hide()}/>
          </View>
        </View>
      )
    }
    return (<View></View>)
  }
}

export default ActivityModal;
