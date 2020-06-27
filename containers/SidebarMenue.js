import React from 'react';
import { View, Text, FlatList, TouchableHighlight, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from '../styles/Main.style.js';


class SidebarMenue extends React.Component {

    constructor(){
        super()
    }

    componentDidMount(){
    }


    render(){
    return (
        <View>
            <View style={styles.sidebarTop}>
                <Image style={styles.sidebarLogo} source={require('../assets/logo.png')}></Image>
                <Text style={styles.sidebarLogoText}>Equiday</Text>
            </View>
            <View style={styles.sidebarBottom}>
                <TouchableHighlight onPress={() => Actions.frontPage()} >
                    <Text style={styles.sidebarMenuItem}>Startseite</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => console.log("Open")} >
                    <Text style={styles.sidebarMenuItem}>Pferde v</Text>
                </TouchableHighlight>
                    <TouchableHighlight onPress={() => Actions.masterDataPage()} >
                            <Text style={styles.sidebarSubItem}>Snow</Text>
                    </TouchableHighlight>

                <TouchableHighlight onPress={() => console.log("Open")} >
                    <Text style={styles.sidebarMenuItem}>Training v</Text>
                </TouchableHighlight>
                    <TouchableHighlight onPress={() => Actions.allTrainingsPage()} >
                        <Text style={styles.sidebarSubItem}>Alle Trainings</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => Actions.trainingPlanPage()} >
                        <Text style={styles.sidebarSubItem}>Trainingsplan erstellen</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => Actions.trainingPlanOverviewPage()} >
                        <Text style={styles.sidebarSubItem}>Trainingspläne ansehen</Text>
                    </TouchableHighlight>

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
