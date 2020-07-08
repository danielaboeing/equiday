import React from 'react';
import { View, Text } from 'react-native';
import {Calendar, Agenda, CalendarList} from 'react-native-calendars';

class TrainingPlanOverviewPage extends React.Component {

  constructor(){
    super()
  }

  render(){
    return (
      <Calendar 
        onDayPress={(day) => console.log(day)} 
      />
        
    );
    }
}

export default TrainingPlanOverviewPage;
