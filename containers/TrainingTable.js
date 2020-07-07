import React from 'react';
import { View, Text, TouchableHighlight, ScrollView, TextInput, Picker, Image } from 'react-native';


import styles from '../styles/Main.style.js';


export default class TrainingTable extends React.Component {

 
    renderRow(entry, index) {
        return (
            <View style={styles.tableEntry} key={index}>
                <View style={styles.tableRow} key={index + "_title"}>
                    <View style={styles.tableCell} >
                        <Picker
                            selectedValue={entry.id}
                            style={styles.detailTextEntry}
                            onValueChange={(itemValue) =>
                                this.props.onExerciseChange(entry.id, itemValue)
                            }>
                            {this.props.allCurrentExercises.filter((value) => this.props.data.find(x => x.id == value.id) == null || value.id == entry.id).map((value) => 
                                <Picker.Item style={styles.detailTextEntry} key={value.id} label={value.name} value={value.id} />
                            )}
                        </Picker>

                    </View>
                </View>
                {this.renderHead(index)}
                <View style={styles.tableRow} key={index + "_main"}>

                    <View style={styles.tableCell} >
                        <Picker
                            selectedValue={entry.done.toString()}
                            style={styles.tableEntryText}
                            onValueChange={(itemValue) =>
                                this.props.onDoneChange(itemValue, entry.id)
                            }>
                            <Picker.Item style={styles.tableEntryText} label="--" value="-1" />
                            <Picker.Item style={styles.tableEntryText} label="&#x2713;" value="1" />
                            <Picker.Item style={styles.tableEntryText} label="&#x2717;" value="0" />
                        </Picker>

                    </View>
                    <View style={styles.tableCell} >



                        <TouchableHighlight style={styles.trafficLightTouchable} onPress={() => this.props.onSucceededChange("0", entry.id)}>
                            {entry.succeeded === "0" ?
                                <Image source={require('../assets/selection_pics/traffic_light_green.png')} style={styles.detailImgEntry}></Image>
                                :
                                <Image source={require('../assets/selection_pics/traffic_light.png')} style={styles.detailImgEntry}></Image>

                            }
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.trafficLightTouchable} onPress={() => this.props.onSucceededChange("1", entry.id)}>
                            {entry.succeeded == 1 ?
                                <Image source={require('../assets/selection_pics/traffic_light_yellow.png')} style={styles.detailImgEntry}></Image>
                                :
                                <Image source={require('../assets/selection_pics/traffic_light.png')} style={styles.detailImgEntry}></Image>

                            }
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.trafficLightTouchable} onPress={() => this.props.onSucceededChange("2", entry.id)}>
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
                                this.props.onImprovedChange(itemValue, entry.id)
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
                                this.props.onRepeatChange(itemValue, entry.id)
                            }>
                            <Picker.Item style={styles.tableEntryText} label="A" value="A" />
                            <Picker.Item style={styles.tableEntryText} label="B" value="B" />
                            <Picker.Item style={styles.tableEntryText} label="C" value="C" />
                            <Picker.Item style={styles.tableEntryText} label="--" value="-1" />
                        </Picker>

                    </View>
                </View>
                <View style={styles.tableRow} key={index + "_commentary"} >
                    <View style={styles.tableCell} ><TextInput onChangeText={(text) => this.props.onExerciseCommentaryChange(text, entry.id)} style={styles.tableEntryText}>{entry.commentary}</TextInput></View>
                </View>
                <View style={styles.tableRow} key={index + "_foot"} >
                    <View style={styles.tableCell} >
                        <TouchableHighlight onPress={() => this.props.onExerciseDelete(entry.id)}>
                            <Text style={[styles.tableEntryText, {textAlign: "right"}]}>Übung löschen &#x2717;</Text>
                        </TouchableHighlight>
                    </View>
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
        console.log(this.props.allCurrentExercises.filter((value) => this.props.data.find(x => x.id == value.id) != null))
        return (


            <ScrollView >
                <View style={styles.table}>

                    {
                        this.props.data.map((datum, index) => {
                            return this.renderRow(datum, index);
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
                                {
                                    this.props.allCurrentExercises.filter((value) => this.props.data.find(x => x.id == value.id) == null).map((value) => 
                                        <Picker.Item style={styles.tableEntryText} key={value.id} label={value.name} value={value.id} />
                                    )
                                }
                            </Picker>
                        </View>
                    </View>

                </View>
            </ScrollView>
        );
    }

}
