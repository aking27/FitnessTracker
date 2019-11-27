import React from 'react';
import { Text, View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, Picker, ScrollView } from 'react-native';
import base64 from 'base-64';
import Button from './Button';
import MealPicker from './MealPicker'

class MealModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        meal: "Breakfast",
        foodName: "",
        calories: 0.0,
        carbohydrates: 0.0,
        fat: 0.0,
        protein: 0.0,
        mealId: ""
    }
    this.mealChange = this.mealChange.bind(this);
  }
  async postMeals(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.props.token);
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.props.username + ":" + this.props.password));

    var raw = "{\n	\"name\": \"" + this.state.meal + "\"\n	\n}";

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try{
        let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals', requestOptions);
        let result = await response.json();
        this.setState({mealId: result.id}); // grab the meal id
        this.props.getMeals();
        this.props.thisMealId(this.state.mealId); // send the meal ID that was just created so that the food can be associated with this id
      } catch {
        alert(error);
    }
  }
  async postFood(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.props.token);
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.props.username + ":" + this.props.password));
    
    var raw = "{\n	\"name\" : \"" + this.state.foodName + "\",\n	\"calories\" : " + this.state.calories + ",\n	\"protein\" : " + this.state.protein + ",\n	\"carbohydrates\" : " + this.state.carbohydrates + ",\n	\"fat\" : " + this.state.fat + "\n}";
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try{
        let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + this.state.mealId + '/foods', requestOptions);
        let result = await response.json();        
        
        alert('Meal Successfully Added!');
        console.log(result)
      } catch {
        alert(error);
    }
  }
  async createMeal(){ // this function will post the meal, get the id, post the food, etc -- want to hide the modal after adding everything
    //Need to check that all the input fields are filled -- else, provide the user with an alert telling them "All fields are required to be filled before adding a meal"

    //Post the meal, get the id
    await this.postMeals();

    //Post the foods associated with the meal added
    await this.postFood();
    this.props.hide();
    await this.props.createMealModal();
  }
  mealChange(childData){ // after the meal has been selected, close the modal! -- may have to make this an ansynchonous function
    this.setState({meal: childData});
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
          marginTop: 20,
          textAlign: 'center'
        },
        input: {
          alignItems: 'center', justifyContent: 'center', borderColor: 'gray',
          margin: 5,
          height: 40,
          borderWidth: 1,
          marginTop: 5,
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
            <View style={{width: screenWidth, height: screenHeight, backgroundColor: 'black', opacity: 0.75, marginTop: -180}}>
            </View>
          </TouchableWithoutFeedback>
          <View style={{position: 'absolute', width: this.props.width, height: this.props.height, left: (screenWidth - this.props.width)/2, top: (screenHeight - this.props.height)/2, backgroundColor: 'white', borderRadius: 10, marginTop: -180}}>
            {/* <View style={{flex:1}}> */}
            <ScrollView>
              <Text style={styles.instructions}>Enter Meal</Text>
              <MealPicker mealChange = {this.mealChange}/>
              <TextInput style={styles.input} textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({foodName: text})}
              placeholder= "Food Name"/>
              <TextInput style={styles.input} textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({calories: text})}
              placeholder= "Calories"/>
              <TextInput style={styles.input} textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({carbohydrates: text})}
              placeholder= "Carbohydrates (g)"/>
              <TextInput style={styles.input} textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({fat: text})}
              placeholder= "Fat (g)"/>
              <TextInput style={styles.input} textStyle={{color: '#FFFFFF'}} placeholderTextColor={'#949494'} onChangeText={(text) => this.setState({protein: text})}
              placeholder= "Protein (g)"/>
              <Button buttonStyle={styles.button} textStyle={{color: '#ffffff'}} text={'Add Meal'} onPress={()=>this.createMeal()}/>
              
            </ScrollView>
            {/* </View> */}
            <Button buttonStyle={styles.closeButton} textStyle={{fontSize: 25}} text={'✕'} onPress={() => this.props.hide()}/>
          </View>
        </View>
      )
    }
    return (<View></View>)
  }
}

export default MealModal;
