import React from 'react';
import { Text, View, TouchableWithoutFeedback, TextInput, StyleSheet, Dimensions} from 'react-native';
import Button from './Button';

class EditActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityID: "",
      calories: 0.0,
      duration: 0.0

    }
  }
  async deleteActivities(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.props.token);
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.props.username + ":" + this.props.password));

    var raw = "{\n	\"name\": \"Cycling\",\n	\"calories\" : 500,\n	\"duration\": 13.1\n}";

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try{ // need the id for the activities
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/activities' + this.state.activityID, requestOptions);
      let result = await response.json();
      this.props.getActivities();
      alert('Exercise Successfully Deleted!')
    } catch {
      alert(error);
    }
  }
  async editActivities(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.props.token);
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.props.username + ":" + this.props.password));

    var raw = "{\n	\"calories\" : " + this.state.calories + ",\n	\"duration\" : " + this.state.duration + "\n}";

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try{ // need the id for the activities
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/activities' + this.state.activityID, requestOptions);
      let result = await response.json();
      this.props.getActivities();
      alert('Exercise Successfully Edited!')
    } catch {
      alert(error);
    }
  }
  getActivityID(){ // get the activity id, set the state, and then call the edit function
    let activityRows = [];

    for(let i = 0; i < this.props.activities.length; i++){
          activityRows.push(this.props.activities[i].id);
    }
    // console.log(activityRows);
    // ()=>this.editActivities();
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
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      },
      activityHeader: {
        fontSize: 30,
        fontFamily: 'GillSans',
        color: 'black',
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
    let activityRows = [];

    for(let i = 0; i < this.props.activities.length; i++){
        if(i == (this.props.activities.length - 1)){ // this is the last one in the list of activities
          activityRows.push(<Text style={styles.activityHeader}>Went {this.props.activities[i].name}{"\n"}</Text>);
          activityRows.push(<Text style={styles.activityInformation}>When: {times[i]}{"\n"}</Text>);
        } else {
          activityRows.push(<Text style={styles.activityHeader}>Went {this.props.activities[i].name}{"\n"}</Text>);
          activityRows.push(<Text style={styles.activityInformation}>When: {times[i]}{"\n"}</Text>);
        }
    }

        function getParsedDate(date){ // parse the date
          date = String(date).split('T');
          var days = String(date[0]).split('-');
          var hours = String(date[1]).split(':');
          return [parseInt(days[1]), parseInt("-" + days[2]), parseInt("-" + days[0])]; //, parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])
        }

    if(this.props.show) {
      const screenWidth = Math.round(Dimensions.get('window').width);
      const screenHeight = Math.round(Dimensions.get('window').height);

      return (
        <View style={{position: 'absolute'}}>
          <TouchableWithoutFeedback onPress={() => this.props.hideEditModal()}>
            <View style={{width: screenWidth, height: screenHeight, backgroundColor: 'black', opacity: 0.75}}>
            </View>
          </TouchableWithoutFeedback>
          <View style={{position: 'absolute', width: this.props.width, height: this.props.height, left: (screenWidth - this.props.width)/2, top: (screenHeight - this.props.height)/2, backgroundColor: 'white', borderRadius: 10}}>
            <Text>{activityRows}</Text>
            <Button buttonStyle={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'dodgerblue', padding: 10, borderRadius: 10, marginTop: 20, marginLeft: 20, marginRight: 20}} textStyle={{color: '#ffffff'}} text={'Save Changes'} onPress={() => this.getActivityID()}/>
            <Button buttonStyle={{alignItems: 'center', justifyContent: 'center', width: 70, height: 70, position: 'absolute', right: 0}} textStyle={{fontSize: 25}} text={'✕'} onPress={() => this.props.hideEditModal()}/>
          </View>
        </View>
      )
    }
    return (<View></View>)
  }
}

export default EditActivity;
