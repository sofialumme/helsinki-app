import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Categories } from './Categories';
import Styles from './Styles';

export default function CategoryList({ navigation }) {
    const dayjs = require('dayjs');

    // variable for end date of fetched events (1 year from present)
    const [endDate, setEndDate] = useState(dayjs().add(1, 'year').format('YYYY-MM-DD'));

    // buttons for categories
    const categoryButtons = () => {
        let buttons = [];
        Categories.forEach(category => {
            buttons.push(<Button
                key={category.id}
                buttonStyle={[Styles.categoryButton, { backgroundColor: category.colour }]}
                onPress={() => { navigation.navigate('EventList', { categoryUrl: `https://api.hel.fi/linkedevents/v1/event/?format=json&keyword=${category.id}&start=today&end=${endDate}&sort=end_time`, categoryName: category.name }) }}>
                {category.name} <MaterialCommunityIcons name={category.iconName} size={25} color={'#fff'} />
            </Button>)
        })
        return buttons;
    }

    return (
        <ScrollView style={Styles.eventListContainer}>
            <View style={Styles.categoryButtonsContainer}>{categoryButtons()}</View>
        </ScrollView>
    );
}