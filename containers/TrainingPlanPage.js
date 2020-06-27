import React from 'react';
import { View, Text, TouchableHighlight, ScrollView } from 'react-native';
import {Router, Scene, Drawer, Actions} from 'react-native-router-flux';

import styles from '../styles/Main.style.js';

class BottomAction extends React.Component {
    render(){
        return (
            <View>
            <TouchableHighlight style={styles.bottomActionBtn}  onPress={() => console.log("pressed")} >
                <Text style={styles.bottomActionText}>Speichern</Text>
            </TouchableHighlight>

            </View>
        )
    }
}

const HeadSection = (props) => {
    return (
        <View style={styles.detailSectionWrapper}>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Datum:</Text>
                <Text style={styles.detailTextEntry}>{props.data.date}</Text>
                <Text style={styles.detailText}>Dauer:</Text>
                <Text style={styles.detailTextEntry}>{props.data.duration}</Text>
            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Pferd:</Text>
                <Text style={styles.detailTextEntry}>{props.data.horse.nick}</Text>
            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Kategorie(n):</Text>
                <Text style={styles.detailTextEntry}>{props.data.categories.map((item) => item + "   ")}</Text>
            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Ziel:</Text>
                <Text style={styles.detailTextEntry}>{props.data.goal}</Text>
            </View>
        </View>
    );
}

const FootSection = (props) => {
    return (
        <View style={styles.detailSectionWrapper}>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Reiterstimmung: </Text>
                <Text style={styles.detailTextEntry}>:/</Text>
            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Pferdestimmung:</Text>
                <Text style={styles.detailTextEntry}>:)</Text>
            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Kommentar: </Text>
            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailTextEntry}>{props.data.commentary}</Text>
            </View>
        </View>
    );
}

class TrainingTable extends React.Component {

    renderRow(entry) {
        const textStyle = (!entry.commentary? styles.tableHeadText : styles.tableEntryText)
        return (
            <View style={styles.tableEntry} key = {entry.key}>
                <View style={styles.tableRow} key={entry.key + "_main"}>
                    <View style={styles.tableCell} ><Text style={textStyle}>{entry.exercise}</Text></View>
                    <View style={styles.tableCell} ><Text style={textStyle}>{entry.done}</Text></View>
                    <View style={styles.tableCell} ><Text style={textStyle}>{entry.succeeded}</Text></View>
                    <View style={styles.tableCell} ><Text style={textStyle}>{entry.improved}</Text></View>
                    <View style={styles.tableCell} ><Text style={textStyle}>{entry.repeat}</Text></View>
                </View>
                { entry.commentary && 
                <View style={styles.tableRow} key={entry.key + "_commentary"} >
                    <View style={styles.tableCell} />
                    <View style={styles.tableCell} ><Text  style={textStyle}>{entry.commentary}</Text></View>
                </View>  
               }
                
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
        return this.renderRow(head, true)
    }

    render() {
        
        return (
            

            <ScrollView contentContainerStyle={styles.table}>
                {this.renderHead()}
            {
                this.props.data.map((datum) => { 
                    return this.renderRow(datum);
                })
            }
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
        }],
        headData: {
            date: "01.01.2020",
            duration: "00:59h",
            horse: {nick: "Charly"},
            categories: ["Dressur", "Gymnastizierung"],
            goal: "Hier steht ein freier Text."
        },
        footData: {
            riderMood: "good",
            horseMood: "good",
            commentary: "anything"
        }
    };
}

    render(){
        return (
            <View style={styles.tableEntry}>
                <HeadSection data={this.state.headData} />
                <TrainingTable data={this.state.entryData} />
                <FootSection data={this.state.footData} />
                <BottomAction />
            </View>
        );
    }

}

export default TrainingPlanPage;
