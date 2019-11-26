import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'

class ActivityPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: "Run" // if nothing is selected -- default to the first value in picker
        }
    }
    updateActivity = (activity) => {
      this.setState({ activity: activity });
      this.props.changeActivity(activity);
    }


   render() {
      return (
         <View>
            <Picker selectedValue = {this.state.activity} onValueChange = {this.updateActivity}>
               <Picker.Item label = "Running" value = "Running" />
               <Picker.Item label = "Walking" value = "Walking" />
               <Picker.Item label = "Biking" value = "Biking" />
               <Picker.Item label = "Lifting" value = "Lifting" />
               <Picker.Item label = "Swimming" value = "Swimming" />
            </Picker>
         </View>
         
      )
   }
}
export default ActivityPicker

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'dodgerblue'
   }
})