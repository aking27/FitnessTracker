import React from 'react';
import { Text, View, TouchableWithoutFeedback, TextInput, StyleSheet } from 'react-native';
import Button from './Button';
import base64 from 'base-64';
import ActivityModal from './ActivityModal';
import EditActivity from './EditActivity';

class ActivityScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showActivityModal: false,
      activityScreen: false,
      editModal: false
    }
  }
  activityGoBack(){
    this.props.activityScreenView();
  }
  showModal() {
    this.setState({showModal: true});
    // console.log(this.state.showModal)
  }

  hideModal() {
    this.setState({showModal: false});
  }
  showEditModal() {
    this.setState({editModal: true});
    // console.log(this.state.editModal)
  }

  hideEditModal() {
    this.setState({editModal: false});
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
      activityInformation: {
        fontSize: 20,
        fontFamily: 'GillSans',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      },
      activityHeader: {
        fontSize: 30,
        fontFamily: 'GillSans',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      },
      activityBox: {
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
        padding: 20
      }
    });
    let times = [];
    for(let j = 0; j < this.props.activities.length; j++){
      // let thisTime = this.props.activities[j].date;
      // let myDate = new Date(thisTime).toLocaleString("en-US", {timeZone: "America/Chicago"});
      // myDate = new Date(myDate);
      let myDate = getParsedDate(this.props.activities[j].date);
      times.push(myDate);
    }

    // console.log(this.props.activities.length);

    let activityRows = [];

    for(let i = 0; i < this.props.activities.length; i++){
        if(i == (this.props.activities.length - 1)){ // this is the last one in the list of activities
          activityRows.push(<Text style={styles.activityHeader}>Went {this.props.activities[i].name}{"\n"}</Text>);
          activityRows.push(<Text style={styles.activityInformation}>When: {times[i]}{"\n"}</Text>);
          activityRows.push(<Text style={styles.activityInformation}>Calories Burned: {this.props.activities[i].calories}{"\n"}</Text>);
          activityRows.push(<Text style={styles.activityInformation}>Time: {this.props.activities[i].duration} minutes</Text>);
        } else {
          activityRows.push(<Text style={styles.activityHeader}>Went {this.props.activities[i].name}{"\n"}</Text>);
          activityRows.push(<Text style={styles.activityInformation}>When: {times[i]}{"\n"}</Text>);
          activityRows.push(<Text style={styles.activityInformation}>Calories Burned: {this.props.activities[i].calories}{"\n"}</Text>);
          activityRows.push(<Text style={styles.activityInformation}>Time: {this.props.activities[i].duration} minutes{"\n"}</Text>);
        }
    }
    if(this.props.activities.length == 0){ // base case -- no activities added to user
      activityRows.push(<Text style={styles.activityHeader}>No exercises posted</Text>);
    }

    function getParsedDate(date){ // parse the date
      date = String(date).split('T');
      var days = String(date[0]).split('-');
      var hours = String(date[1]).split(':');
      return [parseInt(days[1]), parseInt("-" + days[2]), parseInt("-" + days[0])]; //, parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])
    }

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4E5851'}}>
        <Text style={styles.welcome}>Activity Hub</Text>
        <Text style={styles.activityBox}>{activityRows}</Text>
        <Button buttonStyle={{backgroundColor: 'dodgerblue', alignItems: 'center', justifyContent: 'center', padding: 10, width: 150, borderRadius: 10, marginTop: 30}} textStyle={{color: '#ffffff'}} text={'Add Activity'} onPress={() => this.showModal()}/>
        <Button buttonStyle={{backgroundColor: 'dodgerblue', alignItems: 'center', justifyContent: 'center', padding: 10, width: 150, borderRadius: 10, marginTop: 15}} textStyle={{color: '#ffffff'}} text={'Edit Entries'} onPress={() => this.showEditModal()}/>
        <Button buttonStyle={{backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', padding: 10, width: 150, borderRadius: 10, marginTop: 15}} textStyle={{color: '#ffffff'}} text={'Go Back'} onPress={() => this.activityGoBack()}/>
        <ActivityModal width={300} height={600} show={this.state.showModal} hide={() => this.hideModal()}
                  firstName = {this.props.firstName}
                  lastName = {this.props.lastName}
                  username = {this.props.username}
                  token = {this.props.token}
                  activities = {this.props.activities}
                  getActivities = {()=>this.props.getActivities()}/>
        <EditActivity width={300} height={600} show={this.state.editModal} hideEditModal={() => this.hideEditModal()}
                  firstName = {this.props.firstName}
                  lastName = {this.props.lastName}
                  username = {this.props.username}
                  token = {this.props.token}
                  activities = {this.props.activities}
                  getActivities = {()=>this.props.getActivities()}/>
      </View>
    )
  }
}
export default ActivityScreen;
