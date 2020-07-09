import React from 'react';
import { View, Alert, Text } from 'react-native';

import HeadSection from './HeadSection';
import TrainingTable from './TrainingTable';
import FootSection from './FootSection';
import BottomAction from './BottomAction';

import DatabaseConnection from '../utilities/DatabaseConnection';


import styles from '../styles/Main.style.js';


class TrainingPlanPage extends React.Component {


    constructor(props) {
        super()


        this.state = {
            dbConn: new DatabaseConnection(),
            plan_id: props.plan_id,
            headData: {
                date: props.date,
                durationHour: null,
                durationMinute: null,
                horse: { id: null, nick: null },
                selectedCategories: [],
                goal: null
            },
            footData: {
                riderMood: null,
                horseMood: null,
                commentary: null
            },
            entryData: [],
            allHorses: [],
            allCategories: [],
            allCurrentExercises: []


        };




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
        this.onExerciseDelete = this.onExerciseDelete.bind(this)

        // Foot Section
        this.onRiderMoodChange = this.onRiderMoodChange.bind(this)
        this.onHorseMoodChange = this.onHorseMoodChange.bind(this)
        this.onCommentaryChange = this.onCommentaryChange.bind(this)

        // Bottom Action Button
        this.saveData = this.saveData.bind(this)
        this.createPlan = this.createPlan.bind(this)


    }

    setPredefinedValues(){
        if(this.props.date){
            this.setState((currentState) => {
                currentState.headData.date = this.props.date
                return {
                    headData: currentState.headData
                }
            })
        }
        if(this.props.horse_id){
            //TODO
        }
    }

    componentDidMount() {
        this.state.dbConn.getAllHorses(
            (_, result) => this.setState({ allHorses: result }),
            (_, error) => console.log(error) // TODO debug only
        )
        this.state.dbConn.getAllCategories(
            (_, result) => this.setState({ allCategories: result }),
            (_, error) => console.log(error) // TODO debug only
        )
        this.state.dbConn.getAllExercises(
            (_, result) => this.setState({ allExercises: result }),
            (_, error) => console.log(error) // TODO debug only
        )

        if(this.props.date){
            this.createPlan()
            this.setPredefinedValues()

        }
        this.getPlanData()


    }

    getPlanData() {
        if (this.state.plan_id) {
            this.state.dbConn.getPlanMeta(this.state.plan_id,
                (_, result) => {
                    this.setState((currentState) => {
                        return {
                            headData: result.headData,
                            footData: result.footData,
                            allCurrentExercises: currentState.allExercises
                                .filter((value) =>
                                    result.headData.selectedCategories
                                        .find(x => x.id == value.category_id) != null)
                        }
                    })

                },
                (_, error) => {
                    // TODO
                    console.log(error)
                })

            this.state.dbConn.getPlanExercises(this.state.plan_id,
                (_, result) => {
                    this.setState({ entryData: result.entryData })
                },
                (_, error) => {
                    // TODO
                    console.log(error)
                }
            )
        }
    }




    // Bottom Action Button
    saveData() {
        
        this.state.dbConn.savePlanMeta(this.state.plan_id, this.state.headData, this.state.footData,
            () => this.state.dbConn.savePlanEntry(this.state.plan_id, this.state.entryData,
                () => Alert.alert("Speichern erfolgreich.", "Die Daten wurden erfolgreich gespeichert."),
                (error) => console.log(error)), //TODO Debug only
            (error) => console.log(error)) //TODO Debug only
        
    }

    createPlan() {
        this.state.dbConn.createPlan(
            (_, result) => {
                this.setState({ plan_id: result })
            },
            (_, error) => console.log(error) // TODO debug only
        )
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

    onHorseChange(item) {
        this.setState(function (currentState) {
            currentState.headData.horse = this.state.allHorses.filter((value) => value.id == item)[0]
            return {
                headData: currentState.headData
            }
        })
    }

    onRemoveCategory(item) {
        if (this.state.entryData.find(x => x.category_id == item.id) != null) {
            Alert.alert("Fehler", "Vor Löschung der Kategorie bitte erst alle zugehörigen Übungen löschen.")
        }
        else {
            this.setState(function (currentState) {
                currentState.headData.selectedCategories = currentState.headData.selectedCategories.filter((value) => value != item)
                return {
                    headData: currentState.headData,
                    allCurrentExercises: currentState.allExercises
                        .filter((value) =>
                            currentState.headData.selectedCategories
                                .find(x => x.id == value.category_id) != null)

                }
            })

        }
    }

    onAddCategory(item) {

        this.setState(function (currentState) {
            currentState.headData.selectedCategories = currentState.headData.selectedCategories.concat(this.state.allCategories.filter((value) => value.id == item))
            return {
                headData: currentState.headData,
                allCurrentExercises: currentState.allExercises
                    .filter((value) =>
                        currentState.headData.selectedCategories
                            .find(x => x.id == value.category_id) != null)

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
            currentState.entryData
                .filter((value) => value.id == id_old)
                .map((value) => {
                    value.id = id_new
                    value.name = this.state.allCurrentExercises.filter((value) => value.id == id_new)[0].name
                    value.category_id = this.state.allCurrentExercises.filter((value) => value.id == id_new)[0].category_id
                })
            return {
                entryData: currentState.entryData
            }
        })
    }

    onExerciseAdd(id_new) {
        this.setState(function (currentState) {
            return {
                entryData: currentState.entryData.concat({
                    id: id_new,
                    name: this.state.allCurrentExercises.filter((value) => value.id == id_new)[0].name,
                    done: "-1",
                    succeeded: "-1",
                    improved: "-1",
                    repeat: "-1",
                    commentary: "",
                    category_id: this.state.allCurrentExercises.filter((value) => value.id == id_new)[0].category_id
                })
            }
        })

    }

    onDoneChange(newValue, id) {
        this.setState(function (currentState) {
            currentState.entryData.filter((value) => value.id == id).map((value) => value.done = newValue)
            return {
                entryData: currentState.entryData
            }
        })

    }

    onSucceededChange(newValue, id) {
        this.setState(function (currentState) {
            currentState.entryData.filter((value) => value.id == id).map((value) => value.succeeded = newValue)
            return {
                entryData: currentState.entryData
            }
        })

    }

    onImprovedChange(newValue, id) {
        this.setState(function (currentState) {
            currentState.entryData.filter((value) => value.id == id).map((value) => value.improved = newValue)
            return {
                entryData: currentState.entryData
            }
        })

    }

    onRepeatChange(newValue, id) {
        this.setState(function (currentState) {
            currentState.entryData.filter((value) => value.id == id).map((value) => value.repeat = newValue)
            return {
                entryData: currentState.entryData
            }
        })

    }

    onExerciseCommentaryChange(newValue, id) {
        this.setState(function (currentState) {
            currentState.entryData.filter((value) => value.id == id).map((value) => value.commentary = newValue)
            return {
                entryData: currentState.entryData
            }
        })

    }

    onExerciseDelete(id) {
        this.setState((currentState) => {
            return {
                entryData: currentState.entryData.filter((value) => value.id != id)
            }
        })
    }

    render() {
        if (this.state.plan_id) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.wrapper}>
                        <HeadSection
                            onDateChange={this.onDateChange}
                            onDurationHourChange={this.onDurationHourChange}
                            onDurationMinuteChange={this.onDurationMinuteChange}
                            onHorseChange={this.onHorseChange}
                            onRemoveCategory={this.onRemoveCategory}
                            onAddCategory={this.onAddCategory}
                            onGoalChange={this.onGoalChange}
                            data={this.state.headData}
                            allHorses={this.state.allHorses}
                            allCategories={this.state.allCategories}
                        />
                        <TrainingTable
                            onExerciseChange={this.onExerciseChange}
                            onExerciseAdd={this.onExerciseAdd}
                            onDoneChange={this.onDoneChange}
                            onSucceededChange={this.onSucceededChange}
                            onImprovedChange={this.onImprovedChange}
                            onRepeatChange={this.onRepeatChange}
                            onExerciseCommentaryChange={this.onExerciseCommentaryChange}
                            onExerciseDelete={this.onExerciseDelete}
                            data={this.state.entryData}
                            allCurrentExercises={this.state.allCurrentExercises}
                        />
                        <FootSection
                            onRiderMoodChange={this.onRiderMoodChange}
                            onHorseMoodChange={this.onHorseMoodChange}
                            onCommentaryChange={this.onCommentaryChange}
                            data={this.state.footData}
                        />
                    </View>
                    <BottomAction
                        textPrimary="Speichern"
                        onClickActionPrimary={this.saveData}
                    />
                </View>

            );
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.wrapper}>
                    <Text>Kein Plan ausgewählt.</Text>
                </View>
                <BottomAction
                    textPrimary="Neuen Plan erstellen"
                    onClickActionPrimary={this.createPlan}
                />
            </View>
        )

    }

}

export default TrainingPlanPage;
