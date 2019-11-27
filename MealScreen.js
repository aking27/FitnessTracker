import React from 'react';
import { Text, View, TouchableWithoutFeedback, TextInput, StyleSheet } from 'react-native';
import Button from './Button';
import base64 from 'base-64';
import MealModal from './MealModal'
import BreakfastModal from './BreakfastModal'
import LunchModal from './LunchModal'
import DinnerModal from './DinnerModal'
import SnackModal from './SnackModal'
import MealDatePicker from './MealDatePicker'

class MealScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      currMealId: "",
      showBreakfast: false,
      showLunch: false,
      showDinner: false,
      showSnack: false
    }
    this.thisMealId = this.thisMealId.bind(this);
  }

  showModal() {
    this.setState({showModal: true});
  }

  hideModal() {
    this.setState({showModal: false});
  }
  showBreakfastModal(){
    this.setState({showBreakfast: true});
  }
  hideBreakfastModal(){
    this.setState({showBreakfast: false});
  }
  showLunchModal(){
    this.setState({showLunch: true});
  }
  hideLunchModal(){
    this.setState({showLunch: false});
  }
  showDinnerModal(){
    this.setState({showDinner: true});
  }
  hideDinnerModal(){
    this.setState({showDinner: false});
  }
  showSnackModal(){
    this.setState({showSnack: true});
  }
  hideSnackModal(){
    this.setState({showSnack: false});
  }
  mealGoBack(){
    this.props.mealScreenView();
  }
  thisMealId(childData){
    this.setState({currMealId: childData});
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
      todayTotals: {
        fontSize: 22,
        fontFamily: 'GillSans-SemiBold',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 20
      },
      dayView: {
        fontSize: 30,
        position: 'absolute',
        fontFamily: 'GillSans',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        top: 110
      },
      date: {
        fontSize: 27,
        position: 'absolute',
        fontFamily: 'GillSans',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 10,
        top: 150
      },
      mealInformation: {
          fontSize: 18,
          fontFamily: 'GillSans',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
      },
      mealHeader: {
          fontSize: 20,
          fontFamily: 'GillSans-SemiBold',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          marginTop: 10
      },
      mealButton: {
        backgroundColor: 'dodgerblue', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 15, 
        //height: 40,
        width: 150, 
        borderRadius: 10, 
        marginTop: 30
      },
      buttons: {
        backgroundColor: 'dodgerblue', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 15, 
        width: 150, 
        borderRadius: 10, 
        marginTop: 30
      },
      backButton: {
        backgroundColor: 'red', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 15, 
        width: 150, 
        borderRadius: 10, 
        marginTop: 30, 
        marginBottom: 40
      }
    });

    let mealRows = [];

    for(let i = 0; i < this.props.meals.length; i++){
        if(i == (this.props.meals.length - 1)){ // this is the last one in the list of activities
          mealRows.push(<Text style={styles.mealHeader}>When {this.props.meals[i].date}{"\n"}</Text>);
          mealRows.push(<Text style={styles.mealInformation}>Id number: {this.props.meals[i].id}{"\n"}</Text>);
          mealRows.push(<Text style={styles.mealInformation}>Meal: {this.props.meals[i].name}</Text>);
        } else {
          mealRows.push(<Text style={styles.mealHeader}>When {this.props.meals[i].date}{"\n"}</Text>);
          mealRows.push(<Text style={styles.mealInformation}>Id number: {this.props.meals[i].id}{"\n"}</Text>);
          mealRows.push(<Text style={styles.mealInformation}>Meal: {this.props.meals[i].name}{"\n"}</Text>);
        }
    }
    if(this.props.meals.length == 0){ // base case -- no activities added to user
      mealRows.push(<Text style={styles.mealHeader}>No meals posted</Text>);
    }

    // function getParsedDate(date){ // parse the date
    //   date = String(date).split('T');
    //   var days = String(date[0]).split('-');
    //   var hours = String(date[1]).split(':');
    //   return [parseInt(days[1]), parseInt("-" + days[2]), parseInt("-" + days[0])]; //, parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])
    // }
    
    var day = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    //totals tracker
    let totalRows = [];
    let caloriesTotal =  0.0;
    let carbohydratesTotal = 0.0;
    let fatTotal = 0.0;
    let proteinTotal = 0.0;

    for(let i = 0; i < this.props.breakfastArray.length; i++){
      caloriesTotal += this.props.breakfastArray[i].calories;
      carbohydratesTotal += this.props.breakfastArray[i].carbohydrates;
      fatTotal += this.props.breakfastArray[i].fat;
      proteinTotal += this.props.breakfastArray[i].protein;
    }
    for(let i = 0; i < this.props.lunchArray.length; i++){
      caloriesTotal += this.props.lunchArray[i].calories;
      carbohydratesTotal += this.props.lunchArray[i].carbohydrates;
      fatTotal += this.props.lunchArray[i].fat;
      proteinTotal += this.props.lunchArray[i].protein;
    }
    for(let i = 0; i < this.props.dinnerArray.length; i++){
      caloriesTotal += this.props.dinnerArray[i].calories;
      carbohydratesTotal += this.props.dinnerArray[i].carbohydrates;
      fatTotal += this.props.dinnerArray[i].fat;
      proteinTotal += this.props.dinnerArray[i].protein;
    }
    for(let i = 0; i < this.props.snackArray.length; i++){
      caloriesTotal += this.props.snackArray[i].calories;
      carbohydratesTotal += this.props.snackArray[i].carbohydrates;
      fatTotal += this.props.snackArray[i].fat;
      proteinTotal += this.props.snackArray[i].protein;
    }
    if(this.props.breakfastArray.length != 0 || this.props.lunchArray.length != 0 ||
      this.props.dinnerArray.length != 0 || this.props.snackArray.length != 0){ // don't want to list the total if nothing is there
      totalRows.push(<Text style={styles.mealInformation}>Calories: {caloriesTotal}{"\n"}</Text>);
      totalRows.push(<Text style={styles.mealInformation}>Carbohydrates: {carbohydratesTotal} (g){"\n"}</Text>);
      totalRows.push(<Text style={styles.mealInformation}>Fat: {fatTotal} (g){"\n"}</Text>);
      totalRows.push(<Text style={styles.mealInformation}>Protein: {proteinTotal} (g)</Text>);
    } else {
      totalRows.push(<Text style={styles.mealInformation}>{"\n"}No Foods Have Been Posted!{"\n"}</Text>)
    }
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4E5851'}}>
        <Text style={styles.welcome}>Nutrition Hub</Text>
        <Text style={styles.dayView}>Daily Meal Summary</Text>
        <Text style={styles.date}>{month} / {day} / {year}</Text>


      <View style={{flex: 1, alignItems: 'center', justifyContent: 'top', marginTop: 180}}>
        
        <Text style={styles.todayTotals}>Today's Totals:</Text>
        <Text>{totalRows}</Text>
        <MealDatePicker/>
        <Button buttonStyle={styles.mealButton} textStyle={{color: '#ffffff'}} text={'Breakfast View'} onPress={()=>this.showBreakfastModal()}/>
        <Button buttonStyle={styles.mealButton} textStyle={{color: '#ffffff'}} text={'Lunch View'} onPress={()=>this.showLunchModal()}/>
      
        <Button buttonStyle={styles.mealButton} textStyle={{color: '#ffffff'}} text={'Dinner View'} onPress={()=>this.showDinnerModal()}/>
        <Button buttonStyle={styles.mealButton} textStyle={{color: '#ffffff'}} text={'Snack View'} onPress={()=>this.showSnackModal()}/>
        


        
        <Button buttonStyle={styles.buttons} textStyle={{color: '#ffffff'}} text={'Add Meal'} onPress={() => this.showModal()}/>
        {/* <Button buttonStyle={styles.buttons} textStyle={{color: '#ffffff'}} text={'Edit Meal'} onPress={() => this.showModal()}/> */}
        
        <Button buttonStyle={styles.backButton} textStyle={{color: '#ffffff'}} text={'Go Back'} onPress={() => this.mealGoBack()}/>
        <MealModal width={300} height={600} show={this.state.showModal} hide={() => this.hideModal()}
                  firstName = {this.props.firstName}
                  lastName = {this.props.lastName}
                  username = {this.props.username}
                  token = {this.props.token}
                  activities = {this.props.activities}
                  getMeals = {()=>this.props.getMeals()}
                  thisMealId = {this.thisMealId}
                  createMealModal = {()=>this.props.createMealModal()}/>
                  
        <BreakfastModal width={300} height={600} show={this.state.showBreakfast} hide={() => this.hideBreakfastModal()}
                  firstName = {this.props.firstName}
                  lastName = {this.props.lastName}
                  username = {this.props.username}
                  token = {this.props.token}
                  activities = {this.props.activities}
                  getMeals = {()=>this.props.getMeals()}
                  meals = {this.props.meals}
                  thisMealId = {this.thisMealId}
                  breakfastArray = {this.props.breakfastArray}/>

        <LunchModal width={300} height={600} show={this.state.showLunch} hide={() => this.hideLunchModal()}
                  firstName = {this.props.firstName}
                  lastName = {this.props.lastName}
                  username = {this.props.username}
                  token = {this.props.token}
                  activities = {this.props.activities}
                  getMeals = {()=>this.props.getMeals()}
                  meals = {this.props.meals}
                  thisMealId = {this.thisMealId}
                  lunchArray = {this.props.lunchArray}/>
        <DinnerModal width={300} height={600} show={this.state.showDinner} hide={() => this.hideDinnerModal()}
                  firstName = {this.props.firstName}
                  lastName = {this.props.lastName}
                  username = {this.props.username}
                  token = {this.props.token}
                  activities = {this.props.activities}
                  getMeals = {()=>this.props.getMeals()}
                  meals = {this.props.meals}
                  thisMealId = {this.thisMealId}
                  dinnerArray = {this.props.dinnerArray}/>   
        <SnackModal width={300} height={600} show={this.state.showSnack} hide={() => this.hideSnackModal()}
                  firstName = {this.props.firstName}
                  lastName = {this.props.lastName}
                  username = {this.props.username}
                  token = {this.props.token}
                  activities = {this.props.activities}
                  getMeals = {()=>this.props.getMeals()}
                  meals = {this.props.meals}
                  thisMealId = {this.thisMealId}
                  snackArray = {this.props.snackArray}/> 
                    
        </View>
      </View>
    )
  }
}
export default MealScreen;
