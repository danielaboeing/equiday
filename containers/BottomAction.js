import React from 'react';
import { View, Text, TouchableHighlight} from 'react-native';

import styles from '../styles/Main.style.js';


export default function BottomAction (props) {
        return (
            <View style={styles.bottomActionBtnWrapper}>
                <TouchableHighlight style={styles.bottomActionBtn}  onPress={() => props.onClickActionPrimary()} >
                    <Text style={styles.bottomActionText}>{props.textPrimary}</Text>
                </TouchableHighlight>
                { props.textSecondary && [,
                <TouchableHighlight style={[styles.bottomActionBtn, styles.bottomDelimiter]}  onPress={() => props.onClickActionSecondary()} >
                    <Text style={styles.bottomActionText}>{props.textSecondary}</Text>
                </TouchableHighlight>
                ]}
            </View>
        )
    }
