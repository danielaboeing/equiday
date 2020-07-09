import React from 'react';
import { View, Text, Image, TouchableOpacityBase } from 'react-native';
import BottomAction from './BottomAction';

import styles from '../styles/Main.style.js';
import { TouchableHighlight } from 'react-native-gesture-handler';
import DatabaseConnection from '../utilities/DatabaseConnection';
import { Actions } from 'react-native-router-flux';


class ExercisesByCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: []
        }

        if (props.category_id) {
            let dbConn = new DatabaseConnection()
            dbConn.getExercisesByCategory(props.category_id,
                (_, result) => {
                    this.setState({
                        exercises: result
                    })
                },
                (_, error) => console.log(error) // TODO debug onyl
            )
        }
    }



    render() {
        if (this.props.category_id) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.wrapper}>

                        {
                            this.state.exercises.map((value, index) =>
                                <View key={index} style={styles.exerciseEntryWrapper}>
                                    <Text style={styles.exerciseEntry}>{value.name}</Text>
                                    <View >
                                        <TouchableHighlight onPress={() => Actions.singleExercisePage({ exercise_id: value.id, edit: true })}>
                                            <Text style={styles.exerciseEntry}>&#9999;</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => Actions.singleExercisePage({ exercise_id: value.id, edit: false })}>
                                            <Text style={styles.exerciseEntry}> &#x1F50D;</Text>
                                        </TouchableHighlight>

                                    </View>

                                </View>
                            )
                        }
                    </View>
                    <BottomAction
                        textPrimary="Training hinzufügen"
                        onClickActionPrimary={this.addExercise}

                    />
                </View>

            );

        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.wrapper}>
                        <Text>Es wurde keine Kategorie ausgewählt.</Text>
                    </View>
                </View>

            );

        }
    }
}

export default ExercisesByCategory;

/*





*/
