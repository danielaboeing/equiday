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

    render(){
        return (
        <View style={styles.detailSectionWrapper}>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Datum:</Text>
                <DatePicker
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
                    }>
                    
                    <Picker.Item style={styles.detailTextEntry} label="01" value="1" />
                    <Picker.Item style={styles.detailTextEntry} label="02" value="2" />
                </Picker>
                <Picker
                    selectedValue={this.state.durationMinute}
                    style={styles.detailTextEntry}
                    onValueChange={(itemValue) =>
                        this.setState({durationMinute: itemValue})
                    }>
                    <Picker.Item style={styles.detailTextEntry} label="00" value="0" />
                    <Picker.Item style={styles.detailTextEntry} label="40" value="40" />
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
                ListFooterComponent={() => <TouchableHighlight  onPress={() => console.log("Add Cat")}>
                <Text style={styles.detailTextEntry}>+</Text>
            </TouchableHighlight>  }
                data={this.state.selectedCategories}
                renderItem={({item}) => <TouchableHighlight onPress={() => this.removeCategory(item)}><Text style={styles.detailTextEntry}>{item.name} (x) </Text></TouchableHighlight> }
            ></FlatList>

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
        return (
            <View style={styles.tableEntry} key = {entry.key}>
                <View style={styles.tableRow} key={entry.key + "_main"}>
                    <View style={styles.tableCell} >
                        <TouchableHighlight onPress={() => console.log("Select exercise")}>

                        <Text style={styles.tableEntryText}>{entry.exercise}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.tableCell} >
                    <Picker
                    selectedValue={entry.done}
                    style={styles.tableEntryText}
                    onValueChange={(itemValue) =>
                        console.log(itemValue)
                    }>
                    <Picker.Item style={styles.tableEntryText} label="YES" value="1" />
                    <Picker.Item style={styles.tableEntryText} label="NO" value="0" />
                </Picker>

                    </View>
                    <View style={styles.tableCell} >
                    <Picker
                    selectedValue={entry.succeeded}
                    style={styles.tableEntryText}
                    onValueChange={(itemValue) =>
                        console.log(itemValue)
                    }>
                    <Picker.Item style={styles.tableEntryText} label="gut" value="g" />
                    <Picker.Item style={styles.tableEntryText} label="mittel" value="m" />
                </Picker>
                    </View>
                    <View style={styles.tableCell} >
                    <Picker
                    selectedValue={entry.improved}
                    style={styles.tableEntryText}
                    onValueChange={(itemValue) =>
                        console.log(itemValue)
                    }>
                    <Picker.Item style={styles.tableEntryText} label="+" value="0" />
                    <Picker.Item style={styles.tableEntryText} label="=" value="1" />
                </Picker>

                    </View>
                    <View style={styles.tableCell} >
                    <Picker
                    selectedValue={entry.repeat}
                    style={styles.tableEntryText}
                    onValueChange={(itemValue) =>
                        console.log(itemValue)
                    }>
                    <Picker.Item style={styles.tableEntryText} label="dringend" value="A" />
                    <Picker.Item style={styles.tableEntryText} label="demnächst" value="B" />
                </Picker>

                    </View>
                </View>
                <View style={styles.tableRow} key={entry.key + "_commentary"} >
                    <View style={styles.tableCell} />
                    <View style={styles.tableCell} ><TextInput style={styles.tableEntryText}>{entry.commentary}</TextInput></View>
                </View>  
                
            </View>


        );
    }

    renderHead(){
        const head = {
            key: "head",
            exercise: "Übung",
            done: "Erledigt?",
            succeeded: "Gelungen?",
            improved: "Verbessert?",
            repeat: "Wiederholung?"
        }
        return (
            <View style={styles.tableEntry} key = {head.key}>
                <View style={styles.tableRow} key={head.key + "_main"}>
                    <View style={styles.tableCell} ><Text style={styles.tableHeadText}>{head.exercise}</Text></View>
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
                {this.renderHead()}
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
            succeeded: "g",
            improved: "+",
            repeat: "A",
            commentary: "Lief ganz gut"
        },
        {
            key: "entry2",
            exercise: "Schritt-Trab-Übergänge",
            done: "y",
            succeeded: "g",
            improved: "+",
            repeat: "A",
            commentary: "Lief ganz gut"
        },
        {
            key: "entry3",
            exercise: "Schritt-Trab-Übergänge",
            done: "y",
            succeeded: "g",
            improved: "+",
            repeat: "A",
            commentary: "Lief ganz gut"
        },
        {
            key: "entry4",
            exercise: "Schritt-Trab-Übergänge",
            done: "y",
            succeeded: "g",
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
