import React from 'react';
import { View, Text, TouchableHighlight, ScrollView, TextInput, Picker, FlatList, Image} from 'react-native';
import {Router, Scene, Drawer, Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';

import styles from '../styles/Main.style.js';

class BottomAction extends React.Component {
    render(){
        return (
            <View>
                <TouchableHighlight style={styles.bottomActionBtn}  onPress={() => this.props.onClickAction()} >
                    <Text style={styles.bottomActionText}>Speichern</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

class HeadSection extends React.Component{

constructor(props){
    super()
    this.state = {
        goal: props.data.goal,
        date: props.data.date,
        horse: props.data.horse.nick,
        durationHour: props.data.durationHour,
        durationMinte: props.data.durationMinute,
        selectedCategories: props.data.categories
    }
}


removeCategory(item){
    this.setState(function (currentState) { return {
        selectedCategories: currentState.selectedCategories.filter((value) => value != item)
    }})
}

addCategory(item){
    //TODO get info from DB
    let catName = "";
    if (item == "0"){
        catName = "Western"
    }
    else if (item == "1") {
        catName = "Stangenarbeit"
    }
    else{
        return
    }
    this.setState(function (currentState) { console.log(currentState.selectedCategories.concat(item)); return {
        selectedCategories: currentState.selectedCategories.concat({id: item, name: catName})
    }})
}

    render(){
        return (
        <View style={styles.detailSectionWrapper}>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Datum:</Text>
                <DatePicker style={ {marginRight: 10, flex: 1, height: 40}}
        date={this.state.date}
        mode="date"
        format="DD.MM.YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={styles.detailTextEntry}
        onDateChange={(date) => {this.setState({date: date})}}
      />
</View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Dauer:</Text>
                <Picker
                    selectedValue={this.state.durationHour}
                    style={styles.detailTextEntry}
                    onValueChange={(itemValue) =>
                        this.setState({durationHour: itemValue})
                    }
                    
                    >
                    { [...Array(9).keys()].map((value) => <Picker.Item style={styles.detailTextEntry} label={value.toString() + ":"} value={value.toString()} /> ) }
                </Picker>
                <Picker
                    selectedValue={this.state.durationMinute}
                    style={styles.detailTextEntry}
                    onValueChange={(itemValue) =>
                        this.setState({durationMinute: itemValue})
                    }>
                    { [...Array(60).keys()].map((value) => <Picker.Item style={styles.detailTextEntry} label={value.toString()} value={value.toString()} /> ) }
                </Picker>
                <Text style={styles.detailTextEntry}> h </Text>
            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Pferd:</Text>
                <Picker
                    selectedValue={this.state.horse}
                    style={styles.detailTextEntry}
                    onValueChange={(itemValue) =>
                        this.setState({horse: itemValue})
                    }>
                    <Picker.Item style={styles.detailTextEntry} label="Snow" value="Snow" />
                    <Picker.Item style={styles.detailTextEntry} label="Charly" value="Charly" />
                </Picker>
            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Kategorie(n):</Text>
                <FlatList style={styles.sidebarBottom}
                data={this.state.selectedCategories}
                renderItem={({item}) => <TouchableHighlight onPress={() => this.removeCategory(item)}><Text style={styles.detailTextEntry}>{item.name} &#x2717; </Text></TouchableHighlight> }
            ></FlatList>

</View>
<View style={styles.detailSection}>
            <Picker
                    selectedValue="Kategorie hinzufügen &#x2795;"
                    style={styles.detailTextEntry}
                    onValueChange={(itemValue) =>
                        this.addCategory(itemValue)
                    }>
                    <Picker.Item style={styles.detailTextEntry} label="Kategorie hinzufügen &#x2795;" value="" />
                    <Picker.Item style={styles.detailTextEntry} label="Stangenarbeit" value="1" />
                    <Picker.Item style={styles.detailTextEntry} label="Western" value="0" />
                </Picker>
                </View>     
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Ziel:</Text>
                <TextInput style={styles.detailTextEntry} onChangeText={(text) => this.setState({goal: text})} value={this.state.goal}></TextInput>
            </View>
        </View>
    ); }
}



class FootSection extends React.Component {

    constructor(props){
        super()
        this.state = {
            riderMood: props.data.riderMood,
            horseMood: props.data.horseMood,
            commentary: props.data.commentary
        }
    }

    render(){
    return (
        <View style={styles.detailSectionWrapper}>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Reiterstimmung: </Text>
                <TouchableHighlight onPress={() => this.setState({riderMood: 3})}>
                    {this.state.riderMood == 3 ? 
                    <Image source={require('../assets/selection_pics/mood_good_selected.png')}   style={styles.detailImgEntry} ></Image>
                    : 
                    <Image source={require('../assets/selection_pics/mood_good.png')}   style={styles.detailImgEntry} ></Image>

                }
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.setState({riderMood: 2})}>
                {this.state.riderMood == 2 ? 
                    <Image source={require('../assets/selection_pics/mood_ok_selected.png')} style={styles.detailImgEntry}></Image>
                    : 
                    <Image source={require('../assets/selection_pics/mood_ok.png')} style={styles.detailImgEntry}></Image>

                }
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.setState({riderMood: 1})}>
                {this.state.riderMood == 1 ? 
                    <Image source={require('../assets/selection_pics/mood_bad_selected.png')} style={styles.detailImgEntry}></Image>
                    : 
                    <Image source={require('../assets/selection_pics/mood_bad.png')} style={styles.detailImgEntry}></Image>

                }
                </TouchableHighlight>


            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Pferdestimmung:</Text>
                <TouchableHighlight onPress={() => this.setState({horseMood: 3})}>
                    {this.state.horseMood == 3 ? 
                    <Image source={require('../assets/selection_pics/mood_good_selected.png')}   style={styles.detailImgEntry} ></Image>
                    : 
                    <Image source={require('../assets/selection_pics/mood_good.png')}   style={styles.detailImgEntry} ></Image>

                }
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.setState({horseMood: 2})}>
                {this.state.horseMood == 2 ? 
                    <Image source={require('../assets/selection_pics/mood_ok_selected.png')} style={styles.detailImgEntry}></Image>
                    : 
                    <Image source={require('../assets/selection_pics/mood_ok.png')} style={styles.detailImgEntry}></Image>

                }
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.setState({horseMood: 1})}>
                {this.state.horseMood == 1 ? 
                    <Image source={require('../assets/selection_pics/mood_bad_selected.png')} style={styles.detailImgEntry}></Image>
                    : 
                    <Image source={require('../assets/selection_pics/mood_bad.png')} style={styles.detailImgEntry}></Image>

                }
                </TouchableHighlight>

           </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Kommentar: </Text>
            </View>
            <View style={styles.detailSection}>
                <TextInput style={styles.detailTextEntry} onChangeText={(text) => this.setState({commentary: text})} value={this.state.commentary} />
            </View>
        </View>
    );
}
}

class TrainingTable extends React.Component {

    renderRow(entry) {
        const allExercises= [{
            id: "1",
            name: "Schritt-Trab-Übergänge"
        },{
            id: "2",
            name: "Stangen-Doppel-T"
        }]
        return (
            <View style={styles.tableEntry} key = {entry.key }>
                <View style={styles.tableRow} key={entry.key + "_title"}>
                    <View style={styles.tableCell} >
                    <Picker
                    selectedValue={entry.exercise}
                    style={styles.detailTextEntry}
                    onValueChange={(itemValue) =>
                        entry.exercise = itemValue
                    }>
                    {allExercises.map((value) => <Picker.Item style={styles.detailTextEntry} label={value.name} value={value.name} /> )}
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
                        console.log(itemValue)
                    }>
                    <Picker.Item style={styles.tableEntryText} label="&#x2713;" value="1" />
                    <Picker.Item style={styles.tableEntryText} label="&#x2717;" value="0" />
                </Picker>

                    </View>
                    <View style={styles.tableCell} >
 


                <TouchableHighlight style={styles.trafficLightTouchable} onPress={() => console.log("Change Item")}>
                {entry.succeeded == 0 ? 
                    <Image source={require('../assets/selection_pics/traffic_light_green.png')} style={styles.detailImgEntry}></Image>
                    : 
                    <Image source={require('../assets/selection_pics/traffic_light.png')} style={styles.detailImgEntry}></Image>

                }
                </TouchableHighlight>
                <TouchableHighlight style={styles.trafficLightTouchable} onPress={() => console.log("Change Item")}>
                {entry.succeeded == 1 ? 
                    <Image source={require('../assets/selection_pics/traffic_light_yellow.png')} style={styles.detailImgEntry}></Image>
                    : 
                    <Image source={require('../assets/selection_pics/traffic_light.png')} style={styles.detailImgEntry}></Image>

                }
                </TouchableHighlight>

                <TouchableHighlight style={styles.trafficLightTouchable} onPress={() => console.log("Change Item")}>
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
                        console.log(itemValue)
                    }>
                    <Picker.Item style={styles.tableEntryText} label="+" value="1" />
                    <Picker.Item style={styles.tableEntryText} label="=" value="0" />
                    <Picker.Item style={styles.tableEntryText} label="-" value="-1" />
                </Picker>

                    </View>
                    <View style={styles.tableCell} >
                    <Picker
                    selectedValue={entry.repeat}
                    style={styles.tableEntryText}
                    onValueChange={(itemValue) =>
                        console.log(itemValue)
                    }>
                    <Picker.Item style={styles.tableEntryText} label="A" value="A" />
                    <Picker.Item style={styles.tableEntryText} label="B" value="B" />
                    <Picker.Item style={styles.tableEntryText} label="C" value="C" />
                </Picker>

                    </View>
                </View>
                <View style={styles.tableRow} key={entry.key + "_commentary"} >
                    <View style={styles.tableCell} ><TextInput style={styles.tableEntryText}>{entry.commentary}</TextInput></View>
                </View>  
                <View style={styles.tableDelimiter} />
            </View>


        );
    }

    renderHead(key){
        const head = {
            exercise: "Übung",
            done: "Erledigt?",
            succeeded: "Gelungen?",
            improved: "Verbessert?",
            repeat: "Wiederholen?"
        }
        return (
            <View style={styles.tableEntry} key = {key + "_head"}>
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

                </View>
            </ScrollView>
        );
    }

}

class TrainingPlanPage extends React.Component {
    
constructor(){
    super()
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
            horse: {nick: "Charly"},
            categories: [{id: '1', name: 'Gymnastizierung'}, {id: '2', name:'Ausreiten'},],
            goal: "Hier steht ein freier Text."
        },
        footData: {
            riderMood: 1,
            horseMood: 2,
            commentary: "anything"
        }
    };
    this.saveData = this.saveData.bind(this)
}

saveData(){
    console.log(this.state.headData.goal)
}

    render(){
        return (
            <View style={styles.tableEntry}>
                <HeadSection data={this.state.headData} />
                <TrainingTable data={this.state.entryData} />
                <FootSection data={this.state.footData} />
                <BottomAction onClickAction={this.saveData} />
            </View>
        );
    }

}

export default TrainingPlanPage;
