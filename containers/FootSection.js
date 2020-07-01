import React from 'react';
import { View, Text, TouchableHighlight, TextInput, Image } from 'react-native';


import styles from '../styles/Main.style.js';



export default function FootSection(props) {

    return (
        <View style={styles.detailSectionWrapper}>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Reiterstimmung: </Text>
                <TouchableHighlight onPress={() => props.onRiderMoodChange(3)}>
                    {props.data.riderMood == 3
                        ?
                        <Image source={require('../assets/selection_pics/mood_good_selected.png')} style={styles.detailImgEntry} ></Image>
                        :
                        <Image source={require('../assets/selection_pics/mood_good.png')} style={styles.detailImgEntry} ></Image>
                    }
                </TouchableHighlight>
                <TouchableHighlight onPress={() => props.onRiderMoodChange(2)}>
                    {props.data.riderMood == 2
                        ?
                        <Image source={require('../assets/selection_pics/mood_ok_selected.png')} style={styles.detailImgEntry}></Image>
                        :
                        <Image source={require('../assets/selection_pics/mood_ok.png')} style={styles.detailImgEntry}></Image>
                    }
                </TouchableHighlight>

                <TouchableHighlight onPress={() => props.onRiderMoodChange(1)}>
                    {props.data.riderMood == 1
                        ?
                        <Image source={require('../assets/selection_pics/mood_bad_selected.png')} style={styles.detailImgEntry}></Image>
                        :
                        <Image source={require('../assets/selection_pics/mood_bad.png')} style={styles.detailImgEntry}></Image>
                    }
                </TouchableHighlight>
            </View>

            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Pferdestimmung:</Text>
                <TouchableHighlight onPress={() => props.onHorseMoodChange(3)}>
                    {props.data.horseMood == 3
                        ?
                        <Image source={require('../assets/selection_pics/mood_good_selected.png')} style={styles.detailImgEntry} ></Image>
                        :
                        <Image source={require('../assets/selection_pics/mood_good.png')} style={styles.detailImgEntry} ></Image>
                    }
                </TouchableHighlight>
                <TouchableHighlight onPress={() => props.onHorseMoodChange(2)}>
                    {props.data.horseMood == 2
                        ?
                        <Image source={require('../assets/selection_pics/mood_ok_selected.png')} style={styles.detailImgEntry}></Image>
                        :
                        <Image source={require('../assets/selection_pics/mood_ok.png')} style={styles.detailImgEntry}></Image>
                    }
                </TouchableHighlight>
                <TouchableHighlight onPress={() => props.onHorseMoodChange(1)}>
                    {props.data.horseMood == 1
                        ?
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
                <TextInput style={styles.detailTextEntry} onChangeText={(text) => props.onCommentaryChange(text)} value={props.data.commentary} />
            </View>
        </View>
    );
}
