import React from 'react';
import { Text, View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet } from 'react-native';
import Button from './Button';
import base64 from 'base-64';
class ProfileEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      profilefirstName: this.props.firstName,
      profilelastName: this.props.lastName,
      profilegoalDailyActivity: this.props.goalDailyActivity,
      profilegoalDailyCalories: this.props.goalDailyCalories,
      profilegoalDailyCarbohydrates: this.props.goalDailyCarbohydrates,
      profilegoalDailyFat: this.props.goalDailyFat,
      profilegoalDailyProtein: this.props.goalDailyProtein
    }
  }
  async editInformation(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.props.token);
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.props.username + ":" + this.props.password));

    var raw = "{\n    \"firstName\": \"" + this.state.profilefirstName + "\",\n    \"goalDailyActivity\": " + this.state.profilegoalDailyActivity + ",\n    \"goalDailyCalories\": " + this.state.profilegoalDailyCalories + ",\n    \"goalDailyCarbohydrates\": " + this.state.profilegoalDailyCarbohydrates + ",\n    \"goalDailyFat\": " + this.state.profilegoalDailyFat + ",\n    \"goalDailyProtein\": " + this.state.profilegoalDailyProtein + ",\n    \"lastName\": \"" + this.state.profilelastName + "\"\n}";

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try{
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/users/'+ this.props.username, requestOptions);

      let result = await response.json();
      if(result.message === "User has been updated!"){
        this.props.login;
        this.props.hide();
        this.props.userProfile();
        alert('Information has been updated!');
      } else {
        alert('Information was not updated. Please check for correct input.');
        return; // failed
      }
    } catch {
      console.log(error);

    }
  }
  setFirstName(){
    this.setState({profileSelection: "firstName"});
  }
  render() {
    const styles = StyleSheet.create({
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
      },
      instructions: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 25,
        fontFamily: 'GillSans-SemiBold',
        color: 'black',
        marginTop: 60,
        marginLeft: 10,
        marginRight: 5
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
            <Text style={styles.instructions}>Make your changes below</Text>
            <TextInput style={styles.input}  textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({profilefirstName: text})}
            placeholder= "Edit First Name"/>
            <TextInput style={styles.input}  textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({profilelastName: text})}
            placeholder= "Edit Last Name"/>
            <TextInput style={styles.input}  textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({profilegoalDailyActivity: text})}
            placeholder= "Edit Daily Active Minutes Goal"/>
            <TextInput style={styles.input}  textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({profilegoalDailyCalories: text})}
            placeholder= "Edit Daily Calorie Goal"/>
            <TextInput style={styles.input}  textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({profilegoalDailyCarbohydrates: text})}
            placeholder= "Edit Daily Carbohydrate Goal (g)"/>
            <TextInput style={styles.input}  textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({profilegoalDailyFat: text})}
            placeholder= "Edit Daily Fat Goal (g)"/>
            <TextInput style={styles.input}  textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({profilegoalDailyProtein: text})}
            placeholder= "Edit Daily Protein Goal (g)"/>
            <Button buttonStyle={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'dodgerblue', padding: 10, borderRadius: 10, marginTop: 20, marginLeft: 20, marginRight: 20}} textStyle={{color: '#ffffff'}} text={'Save Changes'} onPress={() => this.editInformation()}/>
            <Button buttonStyle={{alignItems: 'center', justifyContent: 'center', width: 70, height: 70, position: 'absolute', right: 0}} textStyle={{fontSize: 25}} text={'✕'} onPress={() => this.props.hide()}/>
          </View>
        </View>
      )
    }
    return (<View></View>)
  }
}

export default ProfileEditModal;
