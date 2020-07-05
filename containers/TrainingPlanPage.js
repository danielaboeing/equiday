import React from 'react';
import { View } from 'react-native';

import HeadSection from './HeadSection';
import TrainingTable from './TrainingTable';
import FootSection from './FootSection';
import BottomAction from './BottomAction';

import DatabaseConnection from '../utilities/DatabaseConnection';


import styles from '../styles/Main.style.js';


class TrainingPlanPage extends React.Component {

    constructor() {
        super()



        // TODO aus DB
        this.state = {
            entryData: [{
                key: "entry1",
                exercise: "Schritt-Trab-Übergänge",
                done: "y",
                succeeded: "1",
                improved: "+",
                repeat: "A",
                commentary: "Lief ganz gut"
            },
            {
                key: "entry2",
                exercise: "Schritt-Trab-Übergänge",
                done: "y",
                succeeded: "0",
                improved: "+",
                repeat: "A",
                commentary: "Lief ganz gut"
            },
            {
                key: "entry3",
                exercise: "Schritt-Trab-Übergänge",
                done: "y",
                succeeded: "2",
                improved: "+",
                repeat: "A",
                commentary: "Lief ganz gut"
            },
            {
                key: "entry4",
                exercise: "Schritt-Trab-Übergänge",
                done: "y",
                succeeded: "0",
                improved: "+",
                repeat: "A",
                commentary: "Lief ganz gut"
            }],
            headData: {
                date: "01.01.2020",
                durationHour: "00",
                durationMinute: "59",
                horse: { nick: "Charly" },
                selectedCategories: [{ id: '1', name: 'Gymnastizierung' }, { id: '2', name: 'Ausreiten' },],
                goal: "Hier steht ein freier Text."
            },
            footData: {
                riderMood: 1,
                horseMood: 2,
                commentary: "anything"
            },
            dbConn: new DatabaseConnection(),
        };

        
        this.state.dbConn.getPlan(1, 
        (_, result) => {
            this.setState({headData: result.headData})
            this.setState({footData: result.footData})
        }, (tx, error) => {
            console.log(error)
            //this.setStateFromDb(null)
        })


        // Head Section
        this.onDateChange = this.onDateChange.bind(this)
        this.onDurationHourChange = this.onDurationHourChange.bind(this)
        this.onDurationMinuteChange = this.onDurationMinuteChange.bind(this)
        this.onHorseChange = this.onHorseChange.bind(this)
        this.onRemoveCategory = this.onRemoveCategory.bind(this)
        this.onAddCategory = this.onAddCategory.bind(this)
        this.onGoalChange = this.onGoalChange.bind(this)

        // Table Section
        this.onExerciseChange = this.onExerciseChange.bind(this)
        this.onExerciseAdd = this.onExerciseAdd.bind(this)
        this.onDoneChange = this.onDoneChange.bind(this)
        this.onSucceededChange = this.onSucceededChange.bind(this)
        this.onImprovedChange = this.onImprovedChange.bind(this)
        this.onRepeatChange = this.onRepeatChange.bind(this)
        this.onExerciseCommentaryChange = this.onExerciseCommentaryChange.bind(this)

        // Foot Section
        this.onRiderMoodChange = this.onRiderMoodChange.bind(this)
        this.onHorseMoodChange = this.onHorseMoodChange.bind(this)
        this.onCommentaryChange = this.onCommentaryChange.bind(this)

        // Bottom Action Button
        this.saveData = this.saveData.bind(this)


    }

    setStateFromDb(rows){
        if (rows == null){
            // TODO null initializing empty plan
            return
        }

        this.setState({
            headData: {
                date: rows.date,
                durationHour: (Math.floor(rows.duration / 60)).toString(),
                durationMinute: (rows.duration % 60).toString(),
                horse: { nick: "Charly" },
                selectedCategories: [{ id: '1', name: 'Gymnastizierung' }, { id: '2', name: 'Ausreiten' },],
                goal: rows.goal
            },
            footData: {
                riderMood: rows.riderMood,
                horseMood: rows.horseMood,
                commentary: rows.commentary
            }
        })


    }

    // Bottom Action Button
    saveData() {
        console.log(this.state)
    }


    // Head Section
    onDateChange(value) {
        this.setState(function (currentState) {
            currentState.headData.date = value
            return {
                headData: currentState.headData
            }
        })
    }

    onDurationHourChange(value) {
        this.setState(function (currentState) {
            currentState.headData.durationHour = value
            return {
                headData: currentState.headData
            }
        })
    }

    onDurationMinuteChange(value) {
        this.setState(function (currentState) {
            currentState.headData.durationMinute = value
            return {
                headData: currentState.headData
            }
        })

    }

    onHorseChange(value) {
        this.setState(function (currentState) {
            currentState.headData.horse.nick = value
            return {
                headData: currentState.headData
            }
        })
    }

    onRemoveCategory(item) {
        this.setState(function (currentState) {
            currentState.headData.selectedCategories = currentState.headData.selectedCategories.filter((value) => value != item)
            return {
                headData: currentState.headData
            }
        })
    }

    onAddCategory(item) {
        //TODO get info from DB
        let catName = "";
        if (item == "0") {
            catName = "Western"
        }
        else if (item == "1") {
            catName = "Stangenarbeit"
        }
        else {
            return
        }
        this.setState(function (currentState) {
            currentState.headData.selectedCategories = currentState.headData.selectedCategories.concat({ id: item, name: catName })
            return {
                headData: currentState.headData
            }
        })
    }

    onGoalChange(value) {
        this.setState(function (currentState) {
            currentState.headData.goal = value
            return {
                headData: currentState.headData
            }
        })
    }

    // Foot Section
    onRiderMoodChange(value) {
        this.setState(function (currentState) {
            currentState.footData.riderMood = value
            return {
                footData: currentState.footData
            }
        })

    }

    onHorseMoodChange(value) {
        this.setState(function (currentState) {
            currentState.footData.horseMood = value
            return {
                footData: currentState.footData
            }
        })
    }

    onCommentaryChange(value) {
        this.setState(function (currentState) {
            currentState.footData.commentary = value
            return {
                footData: currentState.footData
            }
        })

    }

    // Training Table
    onExerciseChange(id_old, id_new) {
        this.setState(function (currentState) {
            //TODO get info from DB with id_new
            const new_value = id_new
            currentState.entryData.filter((value) => value.key == id_old).map((value) => value.exercise = new_value)
            console.log(currentState.entryData.filter((value) => value.key == id_old))
            return {
                entryData: currentState.entryData
            }
        })
    }

    onExerciseAdd(id) {
        this.setState(function (currentState) {
            //TODO get info from DB with id_new
            const name = id

            return {
                entryData: currentState.entryData.concat({
                    key: id,
                    exercise: name,
                    done: "-1",
                    succeeded: "-1",
                    improved: "-1",
                    repeat: "-1",
                    commentary: ""
                })
            }
        })

    }

    onDoneChange(newValue, id) {
        this.setState(function (currentState) {
            currentState.entryData.filter((value) => value.key == id).map((value) => value.done = newValue)
            return {
                entryData: currentState.entryData
            }
        })

    }

    onSucceededChange(newValue, id) {
        this.setState(function (currentState) {
            currentState.entryData.filter((value) => value.key == id).map((value) => value.succeeded = newValue)
            return {
                entryData: currentState.entryData
            }
        })

    }

    onImprovedChange(newValue, id) {
        this.setState(function (currentState) {
            currentState.entryData.filter((value) => value.key == id).map((value) => value.improved = newValue)
            return {
                entryData: currentState.entryData
            }
        })

    }

    onRepeatChange(newValue, id) {
        this.setState(function (currentState) {
            currentState.entryData.filter((value) => value.key == id).map((value) => value.repeat = newValue)
            return {
                entryData: currentState.entryData
            }
        })

    }

    onExerciseCommentaryChange(newValue, id) {
        this.setState(function (currentState) {
            currentState.entryData.filter((value) => value.key == id).map((value) => value.commentary = newValue)
            return {
                entryData: currentState.entryData
            }
        })

    }

    render() {
        return (
            <View style={styles.tableEntry}>
                <HeadSection
                    onDateChange={this.onDateChange}
                    onDurationHourChange={this.onDurationHourChange}
                    onDurationMinuteChange={this.onDurationMinuteChange}
                    onHorseChange={this.onHorseChange}
                    onRemoveCategory={this.onRemoveCategory}
                    onAddCategory={this.onAddCategory}
                    onGoalChange={this.onGoalChange}
                    data={this.state.headData}
                />
                <TrainingTable
                    onExerciseChange={this.onExerciseChange}
                    onExerciseAdd={this.onExerciseAdd}
                    onDoneChange={this.onDoneChange}
                    onSucceededChange={this.onSucceededChange}
                    onImprovedChange={this.onImprovedChange}
                    onRepeatChange={this.onRepeatChange}
                    onExerciseCommentaryChange={this.onExerciseCommentaryChange}
                    data={this.state.entryData}
                />
                <FootSection
                    onRiderMoodChange={this.onRiderMoodChange}
                    onHorseMoodChange={this.onHorseMoodChange}
                    onCommentaryChange={this.onCommentaryChange}
                    data={this.state.footData}
                />
                <BottomAction
                    textPrimary="Speichern"
                    onClickActionPrimary={this.saveData}
                />
            </View>
        );
    }

}

export default TrainingPlanPage;
