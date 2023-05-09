import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { Divider } from '@rneui/themed';
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref, set, remove } from "firebase/database"
import { auth, database } from '../../firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Styles from './Styles';

export default function EventList({ route, navigation }) {
    const dayjs = require('dayjs');
    const { categoryUrl, categoryName } = route.params;
    const [events, setEvents] = useState([]);

    // variables for logged in users
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState("");
    const [favourites, setFavourites] = useState([]);

    const [isloading, setIsLoading] = useState(true);

    // fetch events
    const getEvents = (url) => {
        setIsLoading(true)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setEvents(data);
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error);
            });
    }

    // render button for previous page
    const previousButton = () => {
        if (events.meta?.previous) { // button is pressable
            return (
                <MaterialCommunityIcons
                    name='arrow-left-drop-circle'
                    size={60}
                    color='#3f37c9'
                    onPress={() => getEvents(events.meta?.previous)} />
            );
        } else { // not pressable
            return (
                <MaterialCommunityIcons
                    name='arrow-left-drop-circle'
                    size={60}
                    color='#858585' />
            );
        }
    }

    // render button for next page
    const nextButton = () => {
        if (events.meta?.next) { // button is pressable
            return (
                <MaterialCommunityIcons
                    name='arrow-right-drop-circle'
                    size={60}
                    color='#3f37c9'
                    style={{ marginLeft: 'auto' }}
                    onPress={() => getEvents(events.meta?.next)} />
            );
        } else { // not pressable
            return (
                <MaterialCommunityIcons
                    name='arrow-right-drop-circle'
                    size={60}
                    color='#858585'
                    style={{ marginLeft: 'auto' }} />
            );
        }
    }

    // return text if no events are found
    const noResults = () => {
        if (events.meta?.count == 0) {
            return <Text>Ei tuloksia.</Text>
        }
    }

    // render start and/or end date/time
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

    // render star icons if user is logged in
    const renderFavourite = (item) => {
        if (isLoggedIn) {
            let favourite = "star-outline"
            favourites.map(favourite_event => {
                if (item.id == favourite_event.id) {
                    favourite = "star"
                }
            })
            if (favourite == "star") {
                return <MaterialCommunityIcons
                    style={Styles.favouriteIcon}
                    name={favourite} size={30} color={'#3a0ca3'}
                    onPress={() => removeFavouriteEvent(item)} />;
            } else {
                return <MaterialCommunityIcons
                    style={Styles.favouriteIcon}
                    name={favourite} size={30} color={'#3a0ca3'}
                    onPress={() => saveFavouriteEvent(item)} />;
            }
        }
    }

    // save event to user's favourites
    const saveFavouriteEvent = (item) => {
        set(
            ref(database, `users/${uid}/favourite_events/${item.id}`),
            {
                'id': item.id,
                'name': item.name?.fi,
                'start_time': item?.start_time,
                'end_time': item?.end_time
            }
        )
    }

    // remove event from favourites
    const removeFavouriteEvent = (item) => {
        remove(ref(database, `users/${uid}/favourite_events/${item.id}`));
    }

    // fetch events and determine login status
    useEffect(() => {
        getEvents(categoryUrl);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUid(user.uid);
                setIsLoggedIn(true)
                const itemsRef = ref(database, `users/${user.uid}/favourite_events`);
                onValue(itemsRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        setFavourites(Object.values(data));
                    }
                })
            } else {
                // User is signed out
                setUid("");
                setFavourites([]);
                setIsLoggedIn(false);
            }
        });
    }, []);

    if (isloading) {
        return (
            <SafeAreaView style={Styles.eventListContainer}>
                <ActivityIndicator size={'large'} />
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={Styles.eventListContainer}>
                <Text style={Styles.categoryTitle}>{categoryName}</Text>
                <View style={Styles.nextAndPreviousButtons}>
                    {previousButton()}
                    {nextButton()}
                </View>
                {noResults()}
                <FlatList
                    data={events.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View>
                            <View style={Styles.eventNameAndFavouriteContainer}>
                                <Text
                                    style={Styles.eventName}
                                    onPress={() => { navigation.navigate('EventInfo', { eventId: item.id }) }}>{item.name?.fi}</Text>
                                {renderFavourite(item)}
                            </View>
                            {renderTime(item)}
                            <Text>{item.short_description?.fi}</Text>
                            <Divider style={Styles.eventListDivider} />
                        </View>
                    }
                />
            </SafeAreaView>
        );
    }

};