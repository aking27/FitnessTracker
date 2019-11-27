import React from 'react';
import { Text, View, TouchableWithoutFeedback, TextInput, StyleSheet } from 'react-native';
import Button from './Button';
import base64 from 'base-64';
import ProfileEditModal from './ProfileEditModal';
import ActivityScreen from './ActivityScreen';
import MealScreen from './MealScreen';
import DeleteModal from './DeleteModal';
import ProgressModal from './ProgressModal';
// import {Navigation} from 'react-native-navigation';
// import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import Screens from './screens';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showActivityModal: false,
      activityScreen: true,
      mealScreen: true,
      deleteModal: false,
      showProgressModal: false
    }
  }
  async deleteUser(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.props.token);
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.props.username + ":" + this.props.password));

    var raw = "";

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try{
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.props.username, requestOptions);
      let result = await response.json();
      alert('Your account has been deleted.');
      this.profileGoBack();
    } catch {
      console.log(error);
    }
  }
  showModal() {
    this.setState({showModal: true});
  }

  hideModal() {
    this.setState({showModal: false});
  }
  showProgressModal() {
    this.setState({showProgressModal: true});
  }

  hideProgressModal() {
    this.setState({showProgressModal: false});
  }
  showActivityModal() {
    this.setState({showActivityModal: true});
  }

  hideActivityModal() {
    this.setState({showActivityModal: false});
  }
  profileGoBack(){
    this.props.goBack(!this.props.viewOne);
    this.props.removeUserInfo();
  }
  activityScreenView(){ // used to go back and forth through the activity screens
    this.setState({activityScreen: !this.state.activityScreen});
  }
  mealScreenView(){ // used to go back and forth through the meal screens
    this.setState({mealScreen: !this.state.mealScreen});
  }
  showDeleteModal(){
    this.setState({deleteModal: true});
  }
  hideDeleteModal(){
    this.setState({deleteModal: false});
  }

  render() {
    const styles = StyleSheet.create({
      welcome: {
        fontSize: 45,
        fontFamily: 'GillSans-SemiBold',
        color: 'white',
        marginBottom: 30,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 50
      },
      profileHeader: {
        fontSize: 35,
        fontFamily: 'GillSans',
        color: 'white',
        marginBottom: 35
      },
      profileInformation: {
        fontSize: 20,
        fontFamily: 'GillSans',
        color: 'white'
      },
      goals: {
        fontSize: 20,
        fontFamily: 'GillSans-SemiBold',
        color: 'white',
        marginBottom: 2
      },
      buttons: {
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        padding: 15,
        borderRadius: 10,
        marginTop: 30
      },
      settingsButton: {
        backgroundColor: 'dimgray',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        padding: 15,
        borderRadius: 10,
        marginTop: 30
      },
      backButton: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        width: 150,
        marginTop: 30
      }
    });
    if(!this.state.activityScreen){
      return <ActivityScreen activityScreen = {this.state.activityScreen}
                firstName = {this.props.firstName}
                username = {this.props.username}
                token = {this.props.token}
                password = {this.props.password}
                profileGoBack = {this.profileGoBack}
                activityScreenView = {()=>this.activityScreenView()}
                activities = {this.props.activities}
                getActivities = {()=>this.props.getActivities()}/>
    }
    if(!this.state.mealScreen){
      return <MealScreen mealScreen = {this.state.mealScreen}
                firstName = {this.props.firstName}
                username = {this.props.username}
                token = {this.props.token}
                password = {this.props.password}
                mealScreenView = {()=>this.mealScreenView()}
                getMeals = {()=>this.props.getMeals()}
                meals = {this.props.meals}
                getFoods = {()=>this.getFoods()}
                breakfastArray = {this.props.breakfastArray}
                lunchArray = {this.props.lunchArray}
                dinnerArray = {this.props.dinnerArray}
                snackArray = {this.props.snackArray}
                createMealModal = {()=>this.props.createMealModal()}/>
    }


    return (

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4E5851'}}>
        <Text style={styles.welcome}>Fitness Tracker</Text>
        <Text style={styles.profileHeader}>Hi, {this.props.firstName}!</Text>
        <Text style={styles.goals}>Your Daily Goals:</Text>
        <Text style={styles.profileInformation}>Active Minutes: {this.props.goalDailyActivity}</Text>
        <Text style={styles.profileInformation}>Calorie Goal: {this.props.goalDailyCalories}</Text>
        <Text style={styles.profileInformation}>Carbohydrates Goal: {this.props.goalDailyCarbohydrates}g</Text>
        <Text style={styles.profileInformation}>Fat Goal: {this.props.goalDailyFat}g</Text>
        <Text style={styles.profileInformation}>Protein Goal: {this.props.goalDailyProtein}g</Text>

        <Button buttonStyle={styles.buttons} textStyle={{color: '#ffffff'}} text={'Edit Profile'} onPress={() => this.showModal()}/>
        <Button buttonStyle={styles.buttons} textStyle={{color: '#ffffff'}} text={'Activity Hub'} onPress={() => this.activityScreenView()}/>

        <Button buttonStyle={styles.buttons} textStyle={{color: '#ffffff'}} text={'Nutrition Hub'} onPress={() => this.mealScreenView()} />
        <Button buttonStyle={styles.buttons} textStyle={{color: '#ffffff'}} text={'View Progress'} onPress={() => this.showProgressModal()} />
        <Button buttonStyle={styles.settingsButton} textStyle={{color: '#ffffff'}} text={'Settings'} onPress={() => this.showDeleteModal()}/>

        <Button buttonStyle={styles.backButton} textStyle={{color: '#ffffff'}} text={'Logout'} onPress={() => this.profileGoBack()}/>
        <ProgressModal width={300} height={600} show={this.state.showProgressModal} hideDeleteModal={() => this.hideProgressModal()}
                  firstName = {this.props.firstName}
                  lastName = {this.props.lastName}
                  breakfastArray = {this.props.breakfastArray}
                  lunchArray = {this.props.lunchArray}
                  dinnerArray = {this.props.dinnerArray}
                  snackArray = {this.props.snackArray}
                  activities = {this.props.activities}/>
        <DeleteModal width={300} height={600} show={this.state.deleteModal} hideDeleteModal={() => this.hideDeleteModal()}
                  firstName = {this.props.firstName}
                  lastName = {this.props.lastName}
                  viewOne = {this.props.viewOne}
                  username = {this.props.username}
                  token = {this.props.token}
                  password = {this.props.password}
                  deleteUser = {()=>this.deleteUser()}/>
        <ProfileEditModal width={300} height={600} show={this.state.showModal} hide={() => this.hideModal()}
                  firstName = {this.props.firstName}
                  lastName = {this.props.lastName}
                  goalDailyActivity = {this.props.goalDailyActivity}
                  goalDailyCalories = {this.props.goalDailyCalories}
                  goalDailyCarbohydrates = {this.props.goalDailyCarbohydrates}
                  goalDailyFat = {this.props.goalDailyFat}
                  goalDailyProtein = {this.props.goalDailyProtein}
                  viewOne = {this.props.viewOne}
                  username = {this.props.username}
                  token = {this.props.token}
                  password = {this.props.password}
                  login = {this.props.login}
                  userProfile = {()=> this.props.userProfile()}/>
                  
      </View>
    )
  }
}

export default Profile;


