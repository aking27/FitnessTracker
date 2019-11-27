import React from 'react';
import { Text, View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet } from 'react-native';
import base64 from 'base-64';
import Button from './Button';

class ProgressModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caloriesInput: 0.0,
      durationInput: 0.0,
      nameInput: "",
      activityID: ""
    }
  }

  render() {
    const styles = StyleSheet.create({
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
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
          marginTop: 10,
          borderRadius: 10,
          padding: 10,
          marginLeft: 20,
          marginRight: 20
        },
        profileInformation: {
          fontSize: 20,
          fontFamily: 'GillSans',
          color: 'black',
          textAlign: 'center',
          marginTop: 10
        },
        todayTotals: {
          fontSize: 22,
          fontFamily: 'GillSans-SemiBold',
          color: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          marginTop: 20
        },
        mealInformation: {
            fontSize: 18,
            fontFamily: 'GillSans',
            color: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }
    });
        //totals tracker
        let totalRows = [];
        let burnedRows = [];
        let caloriesTotal =  0.0;
        let carbohydratesTotal = 0.0;
        let fatTotal = 0.0;
        let proteinTotal = 0.0;
        let calsBurned = 0.0;
    
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
        for(let i = 0; i < this.props.activities.length; i++){
            calsBurned += this.props.activities[i].calories;
        }
        if(this.props.activities.length != 0){ // don't want to list the total if nothing is there
            burnedRows.push(<Text style={styles.mealInformation}>{"\n"}Calories Burned: {calsBurned}{"\n"}</Text>);
          } else {
            burnedRows.push(<Text style={styles.mealInformation}>{"\n"}No Activities Have Been Posted!{"\n"}</Text>)
        }
    if(this.props.show) {
      const screenWidth = Math.round(Dimensions.get('window').width);
      const screenHeight = Math.round(Dimensions.get('window').height);

      return (
        <View style={{position: 'absolute'}}>
          <TouchableWithoutFeedback onPress={() => this.props.hideDeleteModal()}>
            <View style={{width: screenWidth, height: screenHeight, backgroundColor: 'black', opacity: 0.75}}>
            </View>
          </TouchableWithoutFeedback>
          <View style={{position: 'absolute', width: this.props.width, height: this.props.height, left: (screenWidth - this.props.width)/2, top: (screenHeight - this.props.height)/2, backgroundColor: 'white', borderRadius: 10}}>
            <Text style={styles.instructions}>Your Progress</Text>
            <Text style={styles.profileInformation}></Text>
            <Text style={styles.todayTotals}>Today's Totals:</Text>
            <Text>{totalRows}</Text>
            <Text>{burnedRows}</Text>
            <Button buttonStyle={styles.closeButton} textStyle={{fontSize: 25}} text={'✕'} onPress={() => this.props.hideDeleteModal()}/>
          </View>
        </View>
      )
    }
    return (<View></View>)
  }
}

export default ProgressModal;
