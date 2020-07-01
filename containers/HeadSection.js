import React from 'react';
import { View, Text, TouchableHighlight, TextInput, Picker, FlatList } from 'react-native';
import DatePicker from 'react-native-datepicker';


import styles from '../styles/Main.style.js';



export default function HeadSection(props) {

    return (
        <View style={styles.detailSectionWrapper}>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Datum:</Text>
                <DatePicker style={{ marginRight: 10, flex: 1, height: 40 }}
                    date={props.data.date}
                    mode="date"
                    format="DD.MM.YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    customStyles={styles.detailTextEntry}
                    onDateChange={(date) => { props.onDateChange(date) }}
                />
            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Dauer:</Text>
                <Picker
                    selectedValue={props.data.durationHour}
                    style={styles.detailTextEntry}
                    onValueChange={(itemValue) => props.onDurationHourChange(itemValue)}

                >
                    {[...Array(9).keys()].map((value) => <Picker.Item style={styles.detailTextEntry} key={value} label={value.toString() + ":"} value={value.toString()} />)}
                </Picker>
                <Picker
                    selectedValue={props.data.durationMinute}
                    style={styles.detailTextEntry}
                    onValueChange={(itemValue) => this.onDurationMinuteChange(itemValue)}>
                    {[...Array(60).keys()].map((value) => <Picker.Item style={styles.detailTextEntry} key={value} label={value.toString()} value={value.toString()} />)}
                </Picker>
                <Text style={styles.detailTextEntry}> h </Text>
            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Pferd:</Text>
                <Picker
                    selectedValue={props.data.horse.nick}
                    style={styles.detailTextEntry}
                    onValueChange={(itemValue) => this.onHorseChange(itemValue)}>
                    <Picker.Item style={styles.detailTextEntry} label="Snow" value="Snow" />
                    <Picker.Item style={styles.detailTextEntry} label="Charly" value="Charly" />
                </Picker>
            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Kategorie(n):</Text>
                <FlatList style={styles.sidebarBottom}
                    data={props.data.selectedCategories}
                    renderItem={({ item }) => <TouchableHighlight onPress={() => props.onRemoveCategory(item)}><Text style={styles.detailTextEntry}>{item.name} &#x2717; </Text></TouchableHighlight>}
                />

            </View>
            <View style={styles.detailSection}>
                <Picker
                    selectedValue="Kategorie hinzufügen &#x2795;"
                    style={styles.detailTextEntry}
                    onValueChange={(itemValue) =>
                        props.onAddCategory(itemValue)
                    }>
                    <Picker.Item style={styles.detailTextEntry} label="Kategorie hinzufügen &#x2795;" value="" />
                    <Picker.Item style={styles.detailTextEntry} label="Stangenarbeit" value="1" />
                    <Picker.Item style={styles.detailTextEntry} label="Western" value="0" />
                </Picker>
            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailText}>Ziel:</Text>
                <TextInput style={styles.detailTextEntry} onChangeText={(text) => props.onGoalChange(text)} value={props.data.goal}></TextInput>
            </View>
        </View>
    );
}

