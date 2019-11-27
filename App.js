import React from 'react';
import { View, TextInput, StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {Navigation} from 'react-native-navigation';
import Button from './Button';
import base64 from 'base-64';
import Profile from './Profile';
import Signup from './Signup';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

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
      viewOne: false, // Profile View
      activities: [],
      meals: [],
      signupPage: true,
      // foods: [], // changing this to food sorted by meal
      breakfastID: [],
      lunchID: [],
      dinnerID: [],
      snackID: [],
      currMealID: "",
      breakfastArray: [],
      lunchArray: [],
      dinnerArray: [],
      snackArray: [],
      concatBreakfast: false,
      concatLunch: false,
      concatDinner: false,
      concatSnack: false,
      dayViewing: "",
      loggedIn: false
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
//   {    ---- get the information from meals -- id is pretty important -- maybe an array? -- concat
//     "meals": [
//         {
//             "date": "2019-11-23T22:30:03.746351",
//             "id": 163,
//             "name": "Snack"
//         },
//         {
//             "date": "2019-11-23T23:54:28.267410",
//             "id": 177,
//             "name": "Breakfast"
//         }
//     ]
// }
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
    } catch {
      console.log(error);
    }
  }
  async getFoods(){ // the message that is created is similar to meals in that it is in an array
    
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
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + this.state.currMealID + '/foods', requestOptions);
      let result = await response.json();
      // console.log(result.foods);
      if(this.state.concatBreakfast){ // need to clear the array contents before concatenating them -- array just keeps getting bigger
        // this.setState({breakfastArray: []}); // need to reset the array to be populated again
        this.setState({breakfastArray: this.state.breakfastArray.concat(result.foods)});
      } else if (this.state.concatLunch) {
        // this.setState({lunchArray: []});
        this.setState({lunchArray: this.state.lunchArray.concat(result.foods)});
      } else if (this.state.concatDinner) {
        // this.setState({dinnerArray: []});
        this.setState({dinnerArray: this.state.dinnerArray.concat(result.foods)});
      } else if (this.state.concatSnack) {
        // this.setState({snackArray: []});
        // console.log("Result");
        
        // console.log("array");
        // console.log(this.state.snackArray);
        this.setState({snackArray: this.state.snackArray.concat(result.foods)});
      }
      
    } catch {
      console.log(error);
    }
  }
  getIdByMealName(){
    for(let i = 0; i < this.state.meals.length; i++){ //going through the meals and sorting the IDs by meal type (name)
      if(this.state.meals[i].name == "Breakfast"){ //then grab the ID
        this.setState({breakfastID: this.state.breakfastID.concat(this.state.meals[i].id)});
      } else if (this.state.meals[i].name == "Lunch"){
        // console.log("getIdbymealname")
        this.setState({lunchID: this.state.lunchID.concat(this.state.meals[i].id)});
      } else if (this.state.meals[i].name == "Dinner"){
        this.setState({dinnerID: this.state.dinnerID.concat(this.state.meals[i].id)});
      } else if (this.state.meals[i].name == "Snack"){
        this.setState({snackID: this.state.snackID.concat(this.state.meals[i].id)});
      }
    }
  }
  async getFoodForEachID(){
    for(let i = 0; i < this.state.breakfastID.length; i++){
      // This will help sort out the foods by meal -- further sorted by date
      this.setState({concatBreakfast: true});
      this.setState({concatLunch: false});
      this.setState({concatDinner: false});
      this.setState({concatSnack: false});

      this.setState({currMealID: this.state.breakfastID[i]});
      await this.getFoods(); // getting the foods for each meal ID
    }
    for(let i = 0; i < this.state.lunchID.length; i++){
      this.setState({concatBreakfast: false});
      this.setState({concatLunch: true});
      this.setState({concatDinner: false});
      this.setState({concatSnack: false});
      // console.log("lunch loop: " + this.state.lunchID[i])
      this.setState({currMealID: this.state.lunchID[i]});
      await this.getFoods();
    }
    for(let i = 0; i < this.state.dinnerID.length; i++){
      this.setState({concatBreakfast: false});
      this.setState({concatLunch: false});
      this.setState({concatDinner: true});
      this.setState({concatSnack: false});

      this.setState({currMealID: this.state.dinnerID[i]});
      await this.getFoods();
      
    }for(let i = 0; i < this.state.snackID.length; i++){
      this.setState({concatBreakfast: false});
      this.setState({concatLunch: false});
      this.setState({concatDinner: false});
      this.setState({concatSnack: true}); 

      this.setState({currMealID: this.state.snackID[i]});
      await this.getFoods();
    }
  }
  async createMealModal(){ //creating a meal in the meal modal
    this.setState({breakfastArray: []}); //reset all the meal arrays
    this.setState({lunchArray: []});
    this.setState({dinnerArray: []});
    this.setState({snackArray: []});

    this.setState({breakfastID: []}); // restet all the IDs too
    this.setState({lunchID: []});
    this.setState({dinnerID: []});
    this.setState({snackID: []});

    await this.getMeals();
    this.getIdByMealName();
    await this.getFoodForEachID();
  }
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
      if(result.message === "Could not verify" || result.message === "\"username\" and/or \"password\" not found in auth"
        || result.message ==="No auth found!"){
        alert('Could not verify. Please try again.');
        return;
      } else {
        await this.userProfile(); // get the user information
        await this.getActivities(); // get user activities
        await this.getMeals(); // get user meals
        this.getIdByMealName(); // need to get the IDs for each meal first
        await this.getFoodForEachID(); // this method calls get foods for each meal id
        // await this.getFoods(); // get user foods for each meal
        this.setState({loggedIn: true});
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
  goBack(childData){
    this.setState({viewOne: childData});

  }
  goBackSignup(childData){
    this.setState({signupPage: childData});
  }
  removeUserInfo(){ // sign the user out.
    this.setState({token: ""});
    this.setState({username: ""});
    this.setState({password: ""});
    this.setState({breakfastArray: []});
    this.setState({lunchArray: []});
    this.setState({dinnerArray: []});
    this.setState({snackArray: []});
    this.setState({breakfastID: []});
    this.setState({lunchID: []});
    this.setState({dinnerID: []});
    this.setState({snackID: []});
  }
  changeView(){ //change the view to show the user profile

    // if(this.state.signupPage == true){ // I think this was for after creating an account, to go to the next screen -- dont need it
    //   this.setState({signupPage: !this.state.signupPage});
    // }
    this.setState({viewOne: !this.state.viewOne});
  }
  changeToSignup(){ // when the user presses the signup button -- bring them to the signup page
    this.setState({signupPage: !this.state.signupPage});
    console.log("changeToSignup: " + this.state.signupPage);
  }
  setUsernameFromSignup(userData){
    this.setState({username: userData});
  }
  setPasswordFromSignup(passData){
    this.setState({password: passData});
  }
  signupPageComplete(){
    this.setState({signupPage: !this.state.signupPage});
  }
  userSignedUp(){
    this.setState({signup: true}); // account has successfully been created
  }
  initialDayView(){ //base case -- show user's info for today
    var date = new Date().getDate();
    this.setState({dayViewing: date});
    console.log("date: " + this.state.dayViewing);
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
                meals = {this.state.meals}
                activities = {this.state.activities}
                userProfile = {()=>this.userProfile()}
                getActivities = {()=>this.getActivities()}
                removeUserInfo = {()=>this.removeUserInfo()}
                getMeals = {()=>this.getMeals()}
                getFoods = {()=>this.getFoods()}
                breakfastArray = {this.state.breakfastArray}
                lunchArray = {this.state.lunchArray}
                dinnerArray = {this.state.dinnerArray}
                snackArray = {this.state.snackArray}
                createMealModal = {()=>this.createMealModal()}/>
    }
    if(!this.state.signupPage){
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
        padding: 15,
        borderRadius: 10,
        width: 100,
        marginTop: 20
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