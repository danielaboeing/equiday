import React from 'react';
import { View, Text } from 'react-native';
import {Actions} from 'react-native-router-flux';

class SidebarMenue extends React.Component {

    render(){

    return (
        <View>
            <Text>SidebarMenu Area</Text>
            <Text>Placeholder</Text>
            <Text onPress={() =>  Actions.masterDataPage()}>Stammdaten</Text>
        </View>
        
    );
}
}

export default SidebarMenue;
