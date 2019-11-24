import React from 'react';
import { View, TextInput, StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from './Button';
import base64 from 'base-64';
import Profile from './Profile';
import Signup from './Signup';

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
      viewOne: true, // Profile View
      activities: [],
      meals: [],
      signupPage: true
    }
    this.goBack = this.goBack.bind(this);
    this.goBackSignup = this.goBackSignup.bind(this);
    this.setUsernameFromSignup = this.setUsernameFromSignup.bind(this);
    this.setPasswordFromSignup = this.setPasswordFromSignup.bind(this);
  }
  async getActivities(){ //get user activities
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.state.token);
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.state.username + ":" + this.state.password));

    var raw = "";

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try{
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/activities', requestOptions);
      let result = await response.json();
      this.setState({activities: result.activities});
    } catch {
      console.log(error);
    }
  }
  async getMeals(){ //get user meals
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.state.token);
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.state.username + ":" + this.state.password));

    var raw = "";

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try{
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals', requestOptions);
      let result = await response.json();
      this.setState({meals: result.meals});
      console.log(result.meals);
    } catch {
      console.log(error);
    }
  }

  async login(){ //login the user
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.state.username + ":" + this.state.password));
    console.log("this is the login function")
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/login', requestOptions);
      let result = await response.json();
      this.setState({token: result.token});
      if(result.message === "Could not verify" || result.message === "\"username\" and/or \"password\" not found in auth"
        || result.message ==="No auth found!" || result.message === "Could not verify"){
        alert('Could not verify. Please try again.');
        return;
      } else {
        await this.userProfile(); // get the user information
        await this.getActivities(); // get user activities
        await this.getMeals(); // get user meals
      }
      if(result.message !== "Could not verify"){
        if( this.state.signup === true ){
          alert('You have created an account!');
        } else {
          // alert('You are logged in!');
        }
        this.changeView();
      } else {
        alert('Log in failed! Check your username or password.');
      }
    } catch(error) {
      console.log(error);
      alert(error);
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

      //set all the user information
      this.setState({firstName: result.firstName});
      this.setState({lastName: result.lastName});
      this.setState({goalDailyActivity: result.goalDailyActivity});
      this.setState({goalDailyCalories: result.goalDailyCalories});
      this.setState({goalDailyCarbohydrates: result.goalDailyCarbohydrates});
      this.setState({goalDailyFat: result.goalDailyFat});
      this.setState({goalDailyProtein: result.goalDailyProtein});
    } catch(error) {
      console.log(error);
    }
  }
  async newUser(){ //signup
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log("APP: newUser function")
    console.log(this.state.password)
// console.log("APP: " + this.state.username + "  " + this.state.password);
    var raw = "{\n    \"username\": \"" + this.state.username + "\",\n    \"password\": \"" + this.state.password + "\"\n}";
    console.log("raw")
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
  goBack(childData){
    this.setState({viewOne: childData});

  }
  goBackSignup(childData){
    console.log(childData)
    this.setState({signupPage: childData});
    console.log(this.state.signupPage)
  }
  removeUserInfo(){ // sign the user out.
    this.setState({token: ""});
    this.setState({username: ""});
    this.setState({password: ""});
  }
  changeView(){ //change the view to show the user profile

    if(this.state.signupPage == true){
      this.setState({signupPage: !this.state.signupPage});
    }
    this.setState({viewOne: !this.state.viewOne});
  }
  changeToSignup(){ // when the user presses the signup button -- bring them to the signup page
    this.setState({signupPage: !this.state.signupPage});
  }
  setUsernameFromSignup(userData){
// console.log("User " + userData)
    this.setState({username: userData});
    console.log("Username state: " + this.state.username)

  }
  setPasswordFromSignup(passData){
// console.log("Pass " + passData)
    this.setState({password: passData});
    console.log("Password state: " + this.state.password)
  }
  signupPageComplete(){
    this.setState({signupPage: !this.state.signupPage});
  }
  userSignedUp(){
    this.setState({signup: true}); // account has successfully been created
  }
  render() {


    if(!this.state.viewOne){ // then show the profile screen
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
                goBack = {this.goBack}
                login = {this.login}
                activities = {this.state.activities}
                userProfile = {()=>this.userProfile()}
                getActivities = {()=>this.getActivities()}
                removeUserInfo = {()=>this.removeUserInfo()}/>
    }
    if(!this.state.signupPage){
    /*  try{
        let response = await fetch('https://mysqlcs639.cs.wisc.edu/users', requestOptions);
        let result = await response.json();
        this.setState({signup: true}); // account has successfully been created
        this.login();
      } catch {
        console.log(error);
      }*/
      return <Signup changeToSignup = {this.changeToSignup}
                firstName = {this.state.firstName}
                lastName = {this.state.lastName}
                newUser = {()=>this.newUser()}
                setUsernameFromSignup = {this.setUsernameFromSignup}
                setPasswordFromSignup = {this.setPasswordFromSignup}
                goBackSignup = {this.goBackSignup}
                signupPage = {this.state.signupPage}
                login = {this.login}
                signup = {this.state.signup}
                userSignedUp = {this.userSignedUp}/>
    }
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
          <Text style={styles.instructions}>Enter username and password</Text>
          <TextInput style={styles.input} textStyle={{color: '#ffffff'}} placeholderTextColor={'#ededed'} onChangeText={(text) => this.setState({username: text})} placeholder= "Username" value={this.state.text}/>
          <TextInput style={styles.input} textStyle={{color: '#ffffff'}} placeholderTextColor={'#ededed'} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholder= "Password" value={this.state.text}/>
          <Button buttonStyle={styles.buttons} textStyle={{color: '#ffffff'}} text={'Login'} onPress={() => this.login()}/>
          <Button buttonStyle={styles.buttons} textStyle={{color: '#ffffff'}} text={'Signup'} onPress={() => this.changeToSignup()}/>
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
export default App;
