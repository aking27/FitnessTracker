import React from 'react';
import { View, TextInput, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import Modal from './Modal';
import Button from './Button';
import base64 from 'base-64';
import Profile from './Profile';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      username: "",
      password: "",
      token: "",
      firstName: "",
      lastName: "",
      goalDailyActivity: "",
      goalDailyCalories: "",
      goalDailyCarbohydrates: "",
      goalDailyFat: "",
      goalDailyProtein: "",
      viewOne: true,
      signup: false
    }
    // this.homeView = this.homeView.bind(this);
  }

  //In here -- check all the bad messages -- if something is invalid, don't log them in.
  //Change the views to a navigation format -- there may be a video posted in the future.


  async login(){ //login the user
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.state.username + ":" + this.state.password));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/login', requestOptions);

      let result = await response.json();

      this.setState({token: result.token});
      await this.userProfile(); // get the user information

      // console.log("login--token: " + this.state.token);
      console.log(result.message);
      if(result.message !== "Could not verify"){
        if( this.state.signup === true ){
          alert('You have created an account!');
        } else {
          alert('You are logged in!');
        }

        this.changeView();
      } else {
        alert('Log in failed! Check your username or password.');
      }
    } catch(error) {
      console.log(error); // later would probably want to alert the user
      alert('Log in failed!');
    }

  }
  async userProfile(){ //get the user information
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.state.token);
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.state.username + ":" + this.state.password));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    try {
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/users/'+ this.state.username, requestOptions);

      let result = await response.json();

      this.setState({firstName: result.firstName});
      this.setState({lastName: result.lastName});
      this.setState({goalDailyActivity: result.goalDailyActivity});
      this.setState({goalDailyCalories: result.goalDailyCalories});
      this.setState({goalDailyCarbohydrates: result.goalDailyCarbohydrates});
      this.setState({goalDailyFat: result.goalDailyFat});
      this.setState({goalDailyProtein: result.goalDailyProtein});

    } catch(error) {
      console.log(error); // later would probably want to alert the user

    }
  }


  async newUser(){ //signup
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = "{\n    \"username\": \"" + this.state.username + "\",\n    \"password\": \"" + this.state.password + "\"\n}";

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try{
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/users', requestOptions);

      let result = await response.json();
      this.setState({signup: true}); // account has successfully been created
      this.login();
    } catch {
      console.log(error);
    }
  }


  changeView(){
    this.setState({viewOne: !this.state.viewOne});
  }
  render() {


    if(!this.state.viewOne){
      return <Profile changeView = {this.changeView}
                firstName = {this.state.firstName}
                lastName = {this.state.lastName}
                goalDailyActivity = {this.state.goalDailyActivity}
                goalDailyCalories = {this.state.goalDailyCalories}
                goalDailyCarbohydrates = {this.state.goalDailyCarbohydrates}
                goalDailyFat = {this.state.goalDailyFat}
                goalDailyProtein = {this.state.goalDailyProtein}
                viewOne = {this.state.viewOne}
                username = {this.state.username}
                token = {this.state.token}
                password = {this.state.password}
                />
    }
    const styles = StyleSheet.create({
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4E5851'}}>
        <Text style={{fontSize: 45, marginBottom: 15, fontFamily: 'GillSans-SemiBold', color: 'white'}}>Fitness Tracker</Text>
        <Text style={{fontSize: 20, fontFamily: 'GillSans', color: 'white'}}>Fill in username and password</Text>
        <TextInput style={styles.input} textStyle={{color: '#ffffff'}} placeholderTextColor={'#ededed'} onChangeText={(text) => this.setState({username: text})}
          placeholder= "Username"/>
        <TextInput style={styles.input} textStyle={{color: '#ffffff'}} placeholderTextColor={'#ededed'} onChangeText={(text) => this.setState({password: text})}
          secureTextEntry={true} placeholder= "Password"/>
        <Button buttonStyle={{backgroundColor: 'dodgerblue', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10, marginTop: 5}} textStyle={{color: '#ffffff'}} text={'Login'} onPress={() => this.login()}/>
        <Button buttonStyle={{backgroundColor: 'dodgerblue', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10, marginTop: 10}} textStyle={{color: '#ffffff'}} text={'Signup'} onPress={() => this.newUser()}/>
      </View>
    );
  }
}

export default App;
