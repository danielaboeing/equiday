import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

class NavigationBar extends React.Component {

    render(){
    return (
        <View>
            <Text>Seite: {this.props.title}</Text>
            <TouchableHighlight onPress={() => Actions.drawerOpen()} >
            <Image source={require('../assets/menu.png')} />

            </TouchableHighlight>
        </View>
        
    );
}
}

export default NavigationBar;
