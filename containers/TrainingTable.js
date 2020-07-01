import React from 'react';
import { View, Text, TouchableHighlight, ScrollView, TextInput, Picker, Image } from 'react-native';


import styles from '../styles/Main.style.js';


export default class TrainingTable extends React.Component {

    renderRow(entry) {
        // TODO aus DB
        const allExercises = [{
            id: "1",
            name: "Schritt-Trab-Übergänge"
        }, {
            id: "2",
            name: "Stangen-Doppel-T"
        }, {
            id: "3",
            name: "Ausreiten"
        }]
        return (
            <View style={styles.tableEntry} key={entry.key}>
                <View style={styles.tableRow} key={entry.key + "_title"}>
                    <View style={styles.tableCell} >
                        <Picker
                            selectedValue={entry.exercise}
                            style={styles.detailTextEntry}
                            onValueChange={(itemValue) =>
                                this.props.onExerciseChange(entry.key, itemValue)
                            }>
                            {allExercises.map((value) => <Picker.Item style={styles.detailTextEntry} key={value.id} label={value.name} value={value.name} />)}
                        </Picker>

                    </View>
                </View>
                {this.renderHead(entry.key)}
                <View style={styles.tableRow} key={entry.key + "_main"}>

                    <View style={styles.tableCell} >
                        <Picker
                            selectedValue={entry.done}
                            style={styles.tableEntryText}
                            onValueChange={(itemValue) =>
                                this.props.onDoneChange(itemValue, entry.key)
                            }>
                            <Picker.Item style={styles.tableEntryText} label="&#x2713;" value="1" />
                            <Picker.Item style={styles.tableEntryText} label="&#x2717;" value="0" />
                            <Picker.Item style={styles.tableEntryText} label="--" value="-1" />
                        </Picker>

                    </View>
                    <View style={styles.tableCell} >



                        <TouchableHighlight style={styles.trafficLightTouchable} onPress={() => this.props.onSucceededChange("0", entry.key)}>
                            {entry.succeeded === "0" ?
                                <Image source={require('../assets/selection_pics/traffic_light_green.png')} style={styles.detailImgEntry}></Image>
                                :
                                <Image source={require('../assets/selection_pics/traffic_light.png')} style={styles.detailImgEntry}></Image>

                            }
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.trafficLightTouchable} onPress={() => this.props.onSucceededChange("1", entry.key)}>
                            {entry.succeeded == 1 ?
                                <Image source={require('../assets/selection_pics/traffic_light_yellow.png')} style={styles.detailImgEntry}></Image>
                                :
                                <Image source={require('../assets/selection_pics/traffic_light.png')} style={styles.detailImgEntry}></Image>

                            }
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.trafficLightTouchable} onPress={() => this.props.onSucceededChange("2", entry.key)}>
                            {entry.succeeded == 2 ?
                                <Image source={require('../assets/selection_pics/traffic_light_red.png')} style={styles.detailImgEntry}></Image>
                                :
                                <Image source={require('../assets/selection_pics/traffic_light.png')} style={styles.detailImgEntry}></Image>

                            }
                        </TouchableHighlight>


                    </View>
                    <View style={styles.tableCell} >
                        <Picker
                            selectedValue={entry.improved}
                            style={styles.tableEntryText}
                            onValueChange={(itemValue) =>
                                this.props.onImprovedChange(itemValue, entry.key)
                            }>
                            <Picker.Item style={styles.tableEntryText} label="+" value="+" />
                            <Picker.Item style={styles.tableEntryText} label="=" value="=" />
                            <Picker.Item style={styles.tableEntryText} label="-" value="-" />
                            <Picker.Item style={styles.tableEntryText} label="---" value="-1" />
                        </Picker>

                    </View>
                    <View style={styles.tableCell} >
                        <Picker
                            selectedValue={entry.repeat}
                            style={styles.tableEntryText}
                            onValueChange={(itemValue) =>
                                this.props.onRepeatChange(itemValue, entry.key)
                            }>
                            <Picker.Item style={styles.tableEntryText} label="A" value="A" />
                            <Picker.Item style={styles.tableEntryText} label="B" value="B" />
                            <Picker.Item style={styles.tableEntryText} label="C" value="C" />
                            <Picker.Item style={styles.tableEntryText} label="--" value="-1" />
                        </Picker>

                    </View>
                </View>
                <View style={styles.tableRow} key={entry.key + "_commentary"} >
                    <View style={styles.tableCell} ><TextInput onChangeText={(text) => this.props.onExerciseCommentaryChange(text, entry.key)} style={styles.tableEntryText}>{entry.commentary}</TextInput></View>
                </View>
                <View style={styles.tableDelimiter} />
            </View>


        );
    }

    renderHead(key) {
        const head = {
            exercise: "Übung",
            done: "Erledigt?",
            succeeded: "Gelungen?",
            improved: "Verbessert?",
            repeat: "Wiederholen?"
        }
        return (
            <View style={styles.tableEntry} key={key + "_head"}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCell} ><Text style={styles.tableHeadText}>{head.done}</Text></View>
                    <View style={styles.tableCell} ><Text style={styles.tableHeadText}>{head.succeeded}</Text></View>
                    <View style={styles.tableCell} ><Text style={styles.tableHeadText}>{head.improved}</Text></View>
                    <View style={styles.tableCell} ><Text style={styles.tableHeadText}>{head.repeat}</Text></View>
                </View>
            </View>


        );
    }


    render() {

        return (


            <ScrollView >
                <View style={styles.table}>

                    {
                        this.props.data.map((datum) => {
                            return this.renderRow(datum);
                        })
                    }

                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}>
                            <Picker
                                selectedValue={"Übung hinzufügen"}
                                style={styles.tableEntryText}
                                onValueChange={(itemValue) =>
                                    this.props.onExerciseAdd(itemValue)
                                }>
                                <Picker.Item style={styles.tableEntryText} label="Übung hinzufügen" value="" />
                                <Picker.Item style={styles.tableEntryText} label="Schritt-Galopp-Übergänge" value="Schritt-Galopp-Übergänge" />
                                <Picker.Item style={styles.tableEntryText} label="Ausreiten" value="Ausreiten" />
                            </Picker>
                        </View>
                    </View>

                </View>
            </ScrollView>
        );
    }

}
