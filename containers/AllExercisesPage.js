import React from 'react';
import { View, Text, Image, TouchableOpacityBase } from 'react-native';
import BottomAction from './BottomAction';

import styles from '../styles/Main.style.js';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';


class AllExercisesPage extends React.Component {
    render() {
        return (
            <View>
                <View style={[styles.table, styles.exerciseTable]}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCell, { padding: 0 }]}>
                            <TouchableHighlight onPress={() => Actions.exercisesByCategoryPage({category_id: '1'})}>

                            <Image style={styles.tableImage} source={require('../assets/category_images/category_1.jpg')} />
                            </TouchableHighlight>
                            <View style={styles.imageTextContainer}>
                                <Text style={styles.imageText}>Bodenarbeit</Text>
                            </View>
                        </View>
                        <View style={[styles.tableCell, { padding: 0 }]}>
                            <Image style={styles.tableImage} source={require('../assets/category_images/category_2.jpg')} />
                            <View style={styles.imageTextContainer}>
                                <Text style={styles.imageText}>Longieren</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={[styles.tableCell, { padding: 0 }]}>
                            <Image style={styles.tableImage} source={require('../assets/category_images/category_3.jpg')} />
                            <View style={styles.imageTextContainer}>
                                <Text style={styles.imageText}>Dressur</Text>
                            </View>
                        </View>
                        <View style={[styles.tableCell, { padding: 0 }]}>
                            <Image style={styles.tableImage} source={require('../assets/category_images/category_4.jpg')} />
                            <View style={styles.imageTextContainer}>
                                <Text style={styles.imageText}>Western</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCell, { padding: 0 }]}>
                            <Image style={styles.tableImage} source={require('../assets/category_images/category_5.jpg')} />
                            <View style={styles.imageTextContainer}>
                                <Text style={styles.imageText}>Springen, Stangen und Pylonen</Text>
                            </View>
                        </View>
                        <View style={[styles.tableCell, { padding: 0 }]}>
                            <Image style={styles.tableImage} source={require('../assets/category_images/category_6.jpg')} />
                            <View style={styles.imageTextContainer}>
                                <Text style={styles.imageText}>Gymnastizierung und sonstige Reiterei</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCell, { padding: 0 }]}>
                            <Image style={styles.tableImage} source={require('../assets/category_images/category_7.jpg')} />
                            <View style={styles.imageTextContainer}>
                                <Text style={styles.imageText}>Langzügel und Doppellonge</Text>
                            </View>
                        </View>
                        <View style={[styles.tableCell, { padding: 0 }]}>
                            <Image style={styles.tableImage} source={require('../assets/category_images/category_8.jpg')} />
                            <View style={styles.imageTextContainer}>
                                <Text style={styles.imageText}>Ausreiten und Spazierengehen</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCell, { padding: 0 }]}>
                            <Image style={styles.tableImage} source={require('../assets/category_images/heart.png')} />
                            <View style={styles.imageTextContainer}>
                                <Text style={styles.imageText}>Favoriten</Text>
                            </View>
                        </View>
                        <View style={[styles.tableCell, { padding: 0 }]}>
                            <Image style={styles.tableImage} source={require('../assets/category_images/star.png')} />
                            <View style={styles.imageTextContainer}>
                                <Text style={styles.imageText}>Eigene</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>

        );
    }
}

export default AllExercisesPage;

/*





*/
