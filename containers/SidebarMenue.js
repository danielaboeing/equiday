import React from 'react';
import { View, Text, FlatList } from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from '../styles/Main.style.js';


class SidebarMenue extends React.Component {

    render(){

    return (
        <View>
            <Text>Placeholder</Text>
            <FlatList style={styles.sidebarBottom}
                data={[
                    {key: "frontPage", text: "Startseite", action: Actions.frontPage},
                    {key: "masterDataPage", text: "Stammdaten", action: Actions.masterDataPage},
                    {key: "trainingPlanPage", text: "Trainingsplan erstellen", action: Actions.trainingPlanPage},
                ]}
                renderItem={({item}) => <Text onPress={() =>  {item.action()}}>{item.text}</Text> }
            />
            
        </View>
        
    );
}
}

export default SidebarMenue;
