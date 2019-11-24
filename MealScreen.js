import React from 'react';
import { Text, View, TouchableWithoutFeedback, TextInput, StyleSheet } from 'react-native';
import Button from './Button';
import base64 from 'base-64';

class MealScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }
  showModal() {
    this.setState({showModal: true});
  }
  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("x-access-token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Inlha2l0b3JpIiwiZXhwIjoxNTczOTQzNzk0fQ.H82JPZF1jUw49AwQ5Q-dFW0m1_7T3KwnVc4ytPkmY74");
  // myHeaders.append("Authorization", "Basic eWFraXRvcmk6cGFzc3dvcmQ=");
  //
  // var raw = "{\n	\"name\": \"Dinner\"\n}";
  //
  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: 'follow'
  // };
  //
  // fetch('https://mysqlcs639.cs.wisc.edu/meals', requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));

  hideModal() {
    this.setState({showModal: false});
  }
  mealGoBack(){
    this.props.mealScreenView();
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
      mealInformation: {
        fontSize: 20,
        fontFamily: 'GillSans',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      },
      mealHeader:{
        fontSize: 24,
        fontFamily: 'GillSans-SemiBold',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5
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
      }
      // mealBox: {
      //   borderColor: 'gray',
      //   borderWidth: 1,
      //   marginTop: 10,
      //   borderRadius: 10,
      //   padding: 20
      // }
    });
    var day = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#4E5851'}}>
        <Text style={styles.welcome}>Nutrition Hub</Text>
        <Text style={styles.dayView}>Daily Meal Summary</Text>
        <Text style={styles.date}>{month} / {day} / {year}</Text>

        <Text style={styles.mealHeader}>Breakfast: Scrambled Eggs</Text>
        <Text style={styles.mealInformation}>Calories: 78</Text>
        <Text style={styles.mealInformation}>Carbohydrates: 0.6g</Text>
        <Text style={styles.mealInformation}>Fat: 5g</Text>
        <Text style={styles.mealInformation}>Protein: 6g</Text>

        <Text style={styles.mealHeader}>Lunch: Hamburger</Text>
        <Text style={styles.mealInformation}>Calories: 266</Text>
        <Text style={styles.mealInformation}>Carbohydrates: 30.2g</Text>
        <Text style={styles.mealInformation}>Fat: 10.1g</Text>
        <Text style={styles.mealInformation}>Protein: 13.3g</Text>

        <Text style={styles.mealHeader}>Snack: Chips</Text>
        <Text style={styles.mealInformation}>Calories: 160</Text>
        <Text style={styles.mealInformation}>Carbohydrates: 15g</Text>
        <Text style={styles.mealInformation}>Fat: 10g</Text>
        <Text style={styles.mealInformation}>Protein: 2g</Text>

        <Text style={styles.mealHeader}>Dinner: Salmon</Text>
        <Text style={styles.mealInformation}>Calories: 185</Text>
        <Text style={styles.mealInformation}>Carbohydrates: 0g</Text>
        <Text style={styles.mealInformation}>Fat: 5.5g</Text>
        <Text style={styles.mealInformation}>Protein: 32g</Text>
        <Button buttonStyle={{backgroundColor: 'dodgerblue', alignItems: 'center', justifyContent: 'center', padding: 10, width: 150, borderRadius: 10, marginTop: 30}} textStyle={{color: '#ffffff'}} text={'Add Meal'}/>
        <Button buttonStyle={{backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', padding: 10, width: 150, borderRadius: 10, marginTop: 15, marginBottom: 40}} textStyle={{color: '#ffffff'}} text={'Go Back'} onPress={() => this.mealGoBack()}/>
      </View>
    )
  }
}
export default MealScreen;
