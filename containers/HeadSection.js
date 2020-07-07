import React from 'react';
import { View, Text, TouchableHighlight, TextInput, Picker, FlatList } from 'react-native';
import DatePicker from 'react-native-datepicker';


import styles from '../styles/Main.style.js';



export default class HeadSection extends React.Component {



    render() {
        return (
            <View style={styles.detailSectionWrapper}>
                <View style={styles.detailSection}>
                    <Text style={styles.detailText}>Datum:</Text>
                    <DatePicker style={{ marginRight: 10, flex: 1, height: 40 }}
                        date={this.props.data.date}
                        mode="date"
                        format="DD.MM.YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={styles.detailTextEntry}
                        onDateChange={(date) => { this.props.onDateChange(date) }}
                    />
                </View>
                <View style={styles.detailSection}>
                    <Text style={styles.detailText}>Dauer:</Text>
                    <Picker
                        selectedValue={this.props.data.durationHour}
                        style={styles.detailTextEntry}
                        onValueChange={(itemValue) => this.props.onDurationHourChange(itemValue)}

                    >
                        {[...Array(9).keys()].map((value) => <Picker.Item style={styles.detailTextEntry} key={value} label={value.toString() + ":"} value={value.toString()} />)}
                    </Picker>
                    <Picker
                        selectedValue={this.props.data.durationMinute}
                        style={styles.detailTextEntry}
                        onValueChange={(itemValue) => this.props.onDurationMinuteChange(itemValue)}>
                        {[...Array(60).keys()].map((value) => <Picker.Item style={styles.detailTextEntry} key={value} label={value.toString()} value={value.toString()} />)}
                    </Picker>
                    <Text style={styles.detailTextEntry}> h </Text>
                </View>
                <View style={styles.detailSection}>
                    <Text style={styles.detailText}>Pferd:</Text>
                    <Picker
                        selectedValue={this.props.data.horse.id}
                        style={styles.detailTextEntry}
                        onValueChange={(itemValue) => this.props.onHorseChange(itemValue)}>
                        <Picker.Item style={styles.detailTextEntry} label="Pferd auswählen..." value="" />
                        {
                            this.props.allHorses.map((value) => 
                                <Picker.Item style={styles.detailTextEntry} key={value.id} label={value.name} value={value.id} />
                            )
                        }
                    </Picker>
                </View>
                <View style={styles.detailSection}>
                    <Text style={styles.detailText}>Kategorie(n):</Text>
                    <FlatList style={styles.sidebarBottom}
                        data={this.props.data.selectedCategories}
                        renderItem={({ item }) => <TouchableHighlight onPress={() => this.props.onRemoveCategory(item)}><Text style={styles.detailTextEntry}>{item.name} &#x2717; </Text></TouchableHighlight>}
                    />

                </View>
                <View style={styles.detailSection}>
                    <Picker
                        selectedValue="Kategorie hinzufügen &#x2795;"
                        style={styles.detailTextEntry}
                        onValueChange={(itemValue) =>
                            this.props.onAddCategory(itemValue)
                        }>
                        <Picker.Item style={styles.detailTextEntry} label="Kategorie hinzufügen &#x2795;" value="" />
                        {
                            this.props.allCategories.map((value) => 
                                <Picker.Item style={styles.detailTextEntry} key={value.id} label={value.name} value={value.id.toString()} />
                            )
                        }
                    </Picker>
                </View>
                <View style={styles.detailSection}>
                    <Text style={styles.detailText}>Ziel:</Text>
                    <TextInput style={styles.detailTextEntry} onChangeText={(text) => this.props.onGoalChange(text)} value={this.props.data.goal}></TextInput>
                </View>
            </View>
        );
    }
}

