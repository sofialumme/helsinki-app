import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Button } from '@rneui/themed';
import Styles from "./Styles";

export default function EventSearch({ navigation }) {
    const dayjs = require('dayjs');
    const [keyword, setKeyword] = useState('');
    const [endDate, setEndDate] = useState(dayjs().add(1, 'year').format('YYYY-MM-DD'));

    return (
        <View style={Styles.searchContainer}>
            <TextInput
                style={Styles.input}
                onChangeText={keyword => setKeyword(keyword)}
                value={keyword}
                placeholder="Etsi tapahtumia..."
            />
            <Button
                buttonStyle={Styles.searchButton}
                title='Etsi'
                onPress={() => { navigation.navigate('EventList', { categoryUrl: `https://api.hel.fi/linkedevents/v1/search/?type=event&input=${keyword}&start=today&end=${endDate}&sort=end_time`, categoryName: 'Hakutulokset' }) }} />
        </View>
    );
}