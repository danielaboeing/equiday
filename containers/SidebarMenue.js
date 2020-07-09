import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from '../styles/Main.style.js';


class SidebarMenue extends React.Component {

    constructor() {
        super()
        this.state = {
            showHorsesMenu: false,
            showTrainingMenu: false,
            horses: [{ nick: "Snow", id: 1 }] // TODO aus DB
        }
    }



    render() {
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

                    <TouchableHighlight onPress={() => this.setState({ showHorsesMenu: !this.state.showHorsesMenu })} >
                        <Text style={styles.sidebarMenuItem}>Pferde</Text>
                    </TouchableHighlight>
                    {this.state.showHorsesMenu && [this.state.horses.map((item) => ([
                        <TouchableHighlight key={item.id} onPress={() => Actions.masterDataPage({ id: item.id, editable: false })} >
                            <Text style={styles.sidebarSubItem}>{item.nick}</Text>
                        </TouchableHighlight>,
                    ])),
                    <TouchableHighlight key="addHorse" onPress={() => Actions.masterDataPage({ editable: true })} >
                        <Text style={styles.sidebarSubItem}>Pferd hinzufügen</Text>
                    </TouchableHighlight>
                    ]}

                    <TouchableHighlight onPress={() => this.setState({ showTrainingMenu: !this.state.showTrainingMenu })} >
                        <Text style={styles.sidebarMenuItem}>Training</Text>
                    </TouchableHighlight>
                    {this.state.showTrainingMenu && ([
                        <TouchableHighlight key="allExercises" onPress={() => Actions.allExercisesPage()} >
                            <Text style={styles.sidebarSubItem}>Alle Trainings</Text>
                        </TouchableHighlight>,
                        <TouchableHighlight key="trainingPlan" onPress={() => Actions.trainingPlanPage()} >
                            <Text style={styles.sidebarSubItem}>Trainingsplan erstellen</Text>
                        </TouchableHighlight>,
                        <TouchableHighlight key="trainingPlanOverview" onPress={() => Actions.trainingPlanOverviewPage()} >
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

export default SidebarMenue;
