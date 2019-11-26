import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'

class MealPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meal: "Breakfast"// if nothing is selected -- default to the first value in picker
        }
      }
   updateMeal = (meal) => {
      this.setState({ meal: meal });
      this.props.mealChange(meal);
   }
   render() {
      return (
         <View>
            <Picker selectedValue = {this.state.meal} onValueChange = {this.updateMeal}>
               <Picker.Item label = "Breakfast" value = "Breakfast" />
               <Picker.Item label = "Lunch" value = "Lunch" />
               <Picker.Item label = "Dinner" value = "Dinner" />
               <Picker.Item label = "Snack" value = "Snack" />
            </Picker>
         </View>
      )
   }
}
export default MealPicker

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   }
})