import React from 'react';
import { View, Text, FlatList, TouchableHighlight, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from '../styles/Main.style.js';


class SidebarMenue extends React.Component {

    constructor(){
        super()
        this.state = {
            showHorsesMenu: false,
            showTrainingMenu: false,
            horses: [{nick: "Snow", id: 1}]
        }
    }



    render(){
    return (
        <View>
            <View style={styles.sidebarTop}>
                <Image style={styles.sidebarLogo} source={require('../assets/icon.png')}></Image>
                <Text style={styles.sidebarLogoText}>Equiday</Text>
            </View>
            <View style={styles.sidebarBottom}>
                <TouchableHighlight onPress={() => Actions.frontPage()} >
                    <Text style={styles.sidebarMenuItem}>Startseite</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.setState({showHorsesMenu: !this.state.showHorsesMenu})} >
                    <Text style={styles.sidebarMenuItem}>Pferde</Text>
                </TouchableHighlight>
                    {this.state.showHorsesMenu && [this.state.horses.map((item) => ([
                    <TouchableHighlight key={item.id} onPress={() => Actions.masterDataPage({id: item.id, editable: false})} >
                            <Text style={styles.sidebarSubItem}>{item.nick}</Text>
                    </TouchableHighlight>,
                    ])), 
                    <TouchableHighlight key="addHorse" onPress={() => Actions.masterDataPage({editable: true})} >
                        <Text style={styles.sidebarSubItem}>Pferd hinzufügen</Text>
                    </TouchableHighlight>
                    ]}

                <TouchableHighlight onPress={() => this.setState({showTrainingMenu: !this.state.showTrainingMenu})} >
                    <Text style={styles.sidebarMenuItem}>Training</Text>
                </TouchableHighlight>
                    {this.state.showTrainingMenu && ([
                    <TouchableHighlight key="allExercises" onPress={() => Actions.allExercisesPage()} >
                        <Text style={styles.sidebarSubItem}>Alle Trainings</Text>
                    </TouchableHighlight>,
                    <TouchableHighlight  key="trainingPlan" onPress={() => Actions.trainingPlanPage()} >
                        <Text style={styles.sidebarSubItem}>Trainingsplan erstellen</Text>
                    </TouchableHighlight>,
                    <TouchableHighlight  key="trainingPlanOverview" onPress={() => Actions.trainingPlanOverviewPage()} >
                        <Text style={styles.sidebarSubItem}>Trainingspläne ansehen</Text>
                    </TouchableHighlight>
                    ])}

                <TouchableHighlight onPress={() => console.log("Termine")} >
                    <Text style={styles.sidebarMenuItem}>Termine</Text>
                </TouchableHighlight> 

            </View>
        </View>
        
    );
}
}

/*
            <FlatList style={styles.sidebarBottom}
                data={[
                    {key: "frontPage", title: "Startseite", action: Actions.frontPage},
                    {key: "masterDataPage", title: "Stammdaten", action: Actions.masterDataPage},
                    {key: "trainingPlanPage", title: "Trainingsplan erstellen", action: Actions.trainingPlanPage},
                    {key: "allTrainingsPage", title:"Trainings", action: Actions.allTrainingsPage},
                    {key:"trainingPlanOverviewPage", title:"Trainingspläne", action: Actions.trainingPlanOverviewPage },
                    {key:"singleTrainingPage", title:"Übungsübersicht" , action: Actions.singleTrainingPage }
                ]}
                renderItem={({item}) => <Text onPress={() =>  {item.action()}}>{item.title}</Text> }
            />

            */

export default SidebarMenue;
