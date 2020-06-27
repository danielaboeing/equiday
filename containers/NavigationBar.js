import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from '../styles/Main.style.js';

class NavigationBar extends React.Component {

    constructor(){
        super()
    }

    render(){ 
    return (
        <View style={styles.navigationBar}>
            <Text style={styles.navbarText}>{this.props.title}</Text>
            <TouchableHighlight style={styles.hamburger}  onPress={() => Actions.drawerOpen()} >
            <Image style={styles.hamburgerPic} source={require('../assets/menu.png')} />

            </TouchableHighlight>
        </View>
        
    );
}
}


export default NavigationBar;
