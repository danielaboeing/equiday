import React from 'react';
import { View, Text } from 'react-native';
import { Calendar} from 'react-native-calendars';

import styles from '../styles/Main.style.js';
import { TouchableHighlight } from 'react-native-gesture-handler';
import DatabaseConnection from '../utilities/DatabaseConnection.js';
import { Actions } from 'react-native-router-flux';
import BottomAction from './BottomAction.js';

class TrainingPlanOverviewPage extends React.Component {

  constructor() {
    super()
    let curDate = new Date()
    const month = (curDate.getMonth() + 1 > 9 ? curDate.getMonth() + 1 : "0" + (curDate.getMonth() + 1))
    const date = (curDate.getDate() > 9 ? curDate.getDate() : "0" + (curDate.getDate()))

    let markedDates = {}
    markedDates[curDate.getFullYear() + "-" + month + "-" + date] = { selected: true, selectedColor: '#6AA95B' }

    this.state = {
      selected_date_map: markedDates,
      selected_date: {
        "dateString": curDate.getFullYear() + "-" + month + "-" + date,
        "day": curDate.getDate(),
        "month": curDate.getMonth() + 1,
        "timestamp": Date.now(),
        "year": curDate.getFullYear()
      },
      todaysPlans: [],
      dbConn: new DatabaseConnection()
    }
    this.getPlansForDay()

  }

  getPlansForDay(){
    const month = (this.state.selected_date.month > 9 ? this.state.selected_date.month : "0" + this.state.selected_date.month)
    const date = (this.state.selected_date.day > 9 ? this.state.selected_date.day : "0" + this.state.selected_date.day)

    const dbDay = date + "." + month + "." + this.state.selected_date.year
    this.state.dbConn.getPlansForDay(dbDay,
      (_, result) => {
        this.setState({ todaysPlans: result })
      },
      (_, error) => { console.log(error) }) // TODO debug only


  }

  componentDidUpdate(_, prevState) {
    if (prevState.selected_date != this.state.selected_date) {
      this.getPlansForDay()
    }
  }

  setCurrentDate(day) {
    this.setState(() => {
      let markedDates = {}
      markedDates[day.dateString] = { selected: true, selectedColor: '#6AA95B' }
      return {
        selected_date_map: markedDates,
        selected_date: day
      }
    })

  }

  render() {
    const month = (this.state.selected_date.month > 9 ? this.state.selected_date.month : "0" + this.state.selected_date.month)
    const date = (this.state.selected_date.day > 9 ? this.state.selected_date.day : "0" + this.state.selected_date.day)

    const dbDay = date + "." + month + "." + this.state.selected_date.year

    return (
      <View style={{flex: 1}}>
        <Calendar
          theme={{ todayTextColor: '#6AA95B', arrowColor: '#6AA95B' }}
          onDayPress={(day) => this.setCurrentDate(day)}
          onDayLongPress={(day) => this.setCurrentDate(day)}
          markedDates={this.state.selected_date_map}
        />
        <View style={styles.detailCalendarView}>
          <Text style={styles.dateText}> {dbDay}</Text>
          {this.state.todaysPlans.length == 0 &&
            <Text style={styles.tableEntry}>Keine Pläne für diesen Tag.</Text>
          }
          {this.state.todaysPlans.map((value, index) => {
            return (
              <View style={[styles.tableRow, styles.detailRow]} key={index}>
                <Text style={styles.tableEntry}>{value.horse? value.horse: "Kein Pferd ausgewählt."}</Text>
                <Text style={styles.tableEntry}>Ziel: {value.goal? value.goal : "Kein Ziel festgelegt."}</Text>
                <TouchableHighlight style={styles.tableEntry} onPress={() => Actions.trainingPlanPage({plan_id: value.id})}>
                  <Text  style={styles.tableEntry} >&#9999;</Text>
                </TouchableHighlight>
              </View>
            )
          })}
        </View>
        <BottomAction
            textPrimary="Neuen Plan erstellen"
            onClickActionPrimary={() => Actions.trainingPlanPage({date: dbDay})}
        
        />
      </View>

    );
  }
}

export default TrainingPlanOverviewPage;
