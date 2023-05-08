import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { Button, Divider } from '@rneui/themed';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onValue, ref } from "firebase/database"
import { auth, database } from '../../firebase';
import Styles from './Styles';

export default function Profile({ navigation }) {
    const dayjs = require('dayjs');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState("");
    const [events, setEvents] = useState([])

    // determine if user is logged in
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUid(user.uid);
                setIsLoggedIn(true)
                const itemsRef = ref(database, `users/${user.uid}/favourite_events`);
                onValue(itemsRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        setEvents(Object.values(data));
                    }
                })
            } else {
                // User is signed out
                setUid("");
                setEvents([]);
                setIsLoggedIn(false);
            }
        });

    }, [])

    // render list of favourite events if user has them
    const renderFavouriteEvents = () => {
        if (events) {
            return <View style={Styles.eventListContainer}>
                <FlatList
                    data={events}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View>
                            <Text
                                style={Styles.eventName}
                                onPress={() => { navigation.navigate('EventInfo', { eventId: item.id }) }}>{item.name}</Text>
                            {renderTime(item)}
                            <Divider style={Styles.eventListDivider} />
                        </View>
                    }
                />
            </View>
        } else {
            return <Text>Sinulla ei ole vielä suosikkitapahtumia. Voit lisätä suosikkeja
                painamalla tapahtuman viereistä tähteä.
            </Text>
        }
    }

    // time for events
    const renderTime = (item) => {
        if (item.start_time && item.end_time) {
            if (dayjs(item.start_time).format('DDMMYYYY') == dayjs(item.end_time).format('DDMMYYYY')) {
                return <Text>{dayjs(item.start_time).format('DD.MM.YYYY')}</Text>
            }
            return <Text>{dayjs(item.start_time).format('DD.MM.YYYY')}–{dayjs(item.end_time).format('DD.MM.YYYY')}</Text>

        } else if (item.start_time) {
            return <Text>{dayjs(item.start_time).format('DD.MM.YYYY')}</Text>
        }
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigation.navigate("HomeScreen")
        }).catch((error) => {
            console.log(error)
        });
    }

    // render login/signup buttons if logged out
    const renderSignIn = () => {
        if (isLoggedIn) {
            return <View style={Styles.profileContainer}>
                <Text style={Styles.profileTitle}>Tervetuloa!</Text>
                <Button
                    buttonStyle={Styles.logOutButton}
                    title='Kirjaudu ulos'
                    onPress={() => handleLogout()} />
                <Text style={Styles.profileTitle}>Omat suosikit:</Text>
            </View>

        } else {
            return <View style={Styles.profileContainer}>
                <Text style={Styles.profileTitle}>Kirjaudu sisään lisätäksesi suosikkeja!</Text>
                <Button
                    buttonStyle={Styles.logInButton}
                    title='Kirjaudu sisään'
                    onPress={() => { navigation.navigate('LogInScreen') }} />
                <Button
                    buttonStyle={Styles.signUpButton}
                    title='Luo käyttäjätili'
                    onPress={() => { navigation.navigate('SignUpScreen') }} />
            </View>
        }

    }

    return (
        <SafeAreaView style={Styles.eventListContainer}>
            {renderSignIn()}
            {renderFavouriteEvents()}
        </SafeAreaView>
    );
}