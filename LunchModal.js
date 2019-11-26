import React from 'react';
import { Text, View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, Picker } from 'react-native';
import Button from './Button';

class LunchModal extends React.Component {

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
          marginBottom: 10,
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
        },
        mealInformation: {
            fontSize: 18,
            fontFamily: 'GillSans',
            color: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        },
        mealHeader: {
            fontSize: 20,
            fontFamily: 'GillSans-SemiBold',
            color: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: 10
        }
    });
    let foodRows = [];
    let totalRows = [];
    let caloriesTotal = 0.0;
    let carbohydratesTotal = 0.0;
    let fatTotal = 0.0;
    let proteinTotal = 0.0;

    
    for(let i = 0; i < this.props.lunchArray.length; i++){
        caloriesTotal += this.props.lunchArray[i].calories;
        carbohydratesTotal += this.props.lunchArray[i].carbohydrates;
        fatTotal += this.props.lunchArray[i].fat;
        proteinTotal += this.props.lunchArray[i].protein;

        foodRows.push(<Text style={styles.mealHeader}>{this.props.lunchArray[i].name}{"\n"}</Text>);
        foodRows.push(<Text style={styles.mealInformation}>Calories: {this.props.lunchArray[i].calories}{"\n"}</Text>);
        foodRows.push(<Text style={styles.mealInformation}>Carbohydrates: {this.props.lunchArray[i].carbohydrates} (g){"\n"}</Text>);
        foodRows.push(<Text style={styles.mealInformation}>Fat: {this.props.lunchArray[i].fat} (g){"\n"}</Text>);
        foodRows.push(<Text style={styles.mealInformation}>Protein: {this.props.lunchArray[i].protein} (g){"\n"}</Text>);
        foodRows.push(<Text>{"\n"}</Text>);
    }

    if(this.props.lunchArray.length != 0){ // don't want to list the total if nothing is there
        totalRows.push(<Text style={styles.mealHeader}>Lunch Totals:{"\n"}</Text>);
        totalRows.push(<Text style={styles.mealInformation}>Calories: {caloriesTotal}{"\n"}</Text>);
        totalRows.push(<Text style={styles.mealInformation}>Carbohydrates: {carbohydratesTotal} (g){"\n"}</Text>);
        totalRows.push(<Text style={styles.mealInformation}>Fat: {fatTotal} (g){"\n"}</Text>);
        totalRows.push(<Text style={styles.mealInformation}>Protein: {proteinTotal} (g)</Text>);
    }
    if(this.props.lunchArray.length == 0){ // base case -- no activities added to user
        foodRows.push(<Text style={styles.mealHeader}>No food posted{"\n"}</Text>);
    }
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
            <Text style={styles.instructions}>Lunch</Text>
            <Text>{foodRows}</Text>
            {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: this.props.height}}> */}
                
                <Text>{totalRows}</Text>
            {/* </View> */}
            
            <Button buttonStyle={{alignItems: 'center', justifyContent: 'center', width: 70, height: 70, position: 'absolute', right: 0}} textStyle={{fontSize: 25}} text={'✕'} onPress={() => this.props.hide()}/>
          </View>
        </View>
      )
    }
    return (<View></View>)
  }
}

export default LunchModal;