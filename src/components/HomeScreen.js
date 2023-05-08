import React from 'react';
import { View, Text, SafeAreaView, Linking } from 'react-native';
import { Button } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Styles from './Styles';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={Styles.homeScreenContainer}>
            <Text style={Styles.profileTitle}>Helsinki App</Text>
            <Text>Tervetuloa käyttämään Helsinki App -sovellusta!</Text>
            <Text>Sovelluksessa voit tutkia Helsingin kaupungin tapahtumia.
                Kirjautumalla sisään voit myös lisätä kiinnostavia tapahtumia suosikeiksi.</Text>
            <View style={Styles.frontPageButtonsContainer}>
                <Button
                    buttonStyle={Styles.locationButton}
                    title='Selaa tapahtumia kategorioittain'
                    onPress={() => { navigation.navigate('EventStack') }} />
                <Button
                    buttonStyle={Styles.searchButton}
                    title='Hae tapahtumia hakusanalla'
                    onPress={() => { navigation.navigate('SearchStack') }} />
            </View>
            <Text>Sovelluksen käyttämä tapahtumadata on peräisin Helsingin kaupungin <Text
                style={Styles.hyperlinkText}
                onPress={() => { Linking.openURL('https://api.hel.fi/linkedevents/v1/') }}>Helsinki Linked Events APIsta.</Text></Text>
            <Text>Data on lisensoitu <Text
                style={Styles.hyperlinkText}
                onPress={() => { Linking.openURL('https://creativecommons.org/licenses/by/4.0/deed.fi') }}>Creative Commons Nimeä 4.0 Kansainvälinen -käyttöluvalla.</Text></Text>
            <Text>Sovellus on tehty Haaga-Helian Mobiiliohjelmointi-kurssin lopputyönä.</Text>
            <Button
                buttonStyle={Styles.urlButton}
                onPress={() => { Linking.openURL('https://github.com/sofialumme/helsinki-app') }}>
                Github <MaterialCommunityIcons name={'github'} size={25} color={'#fff'} />
            </Button>
        </SafeAreaView>
    );
};