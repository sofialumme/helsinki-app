import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Linking, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import { Button } from '@rneui/themed';
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref, remove, set } from "firebase/database"
import { auth, database } from '../../firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RenderHtml from 'react-native-render-html';
import Styles from './Styles';

export default function EventInfo({ route, navigation }) {
    const dayjs = require('dayjs')

    const { eventId } = route.params;
    const [eventDetails, setEventDetails] = useState({});

    const [isloading, setIsLoading] = useState(true)

    // variables for logged in users
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState("");
    const [favourites, setFavourites] = useState([]);

    // variables for html rendering
    const { width } = useWindowDimensions();
    let source = { html: "<p></p>" }

    // fetch event details
    const getEventDetails = (eventId) => {
        setIsLoading(true);
        fetch(`https://api.hel.fi/linkedevents/v1/event/${eventId}/?format=json`)
            .then(response => response.json())
            .then(data => {
                setEventDetails(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // render star icon if user is logged in
    const renderFavourite = () => {
        if (isLoggedIn) {
            let favourite = "star-outline";
            favourites.map(favourite_event => {
                if (eventId == favourite_event.id) {
                    favourite = "star";
                }
            })
            if (favourite == "star") {
                return <MaterialCommunityIcons
                    style={Styles.favouriteIcon}
                    name={favourite} size={30} color={'#3a0ca3'}
                    onPress={() => removeFavouriteEvent()} />;
            } else {
                return <MaterialCommunityIcons
                    style={Styles.favouriteIcon}
                    name={favourite} size={30} color={'#3a0ca3'}
                    onPress={() => saveFavouriteEvent()} />;
            }
        }
    }

    // render event start time if it exists
    const renderStartTime = () => {
        if (eventDetails.start_time) {
            if (eventDetails.start_time.length > 10) {
                return `Alkaa: ${dayjs(eventDetails.start_time).format('DD.MM.YYYY klo HH.mm')}`

            } else {
                return `Alkaa: ${dayjs(eventDetails.start_time).format('DD.MM.YYYY')}`
            }
        }
    }

    // render event end time if it exists
    const renderEndTime = () => {
        if (eventDetails.end_time) {
            if (eventDetails.end_time.length > 10) {
                return `Loppuu: ${dayjs(eventDetails.end_time).format('DD.MM.YYYY klo HH.mm')}`

            } else {
                return `Loppuu: ${dayjs(eventDetails.end_time).format('DD.MM.YYYY')}`
            }
        }
    }

    // render html description as react native component
    const renderDescription = () => {
        if (eventDetails.description?.fi) {
            source.html = eventDetails.description?.fi
            return (
                <RenderHtml
                    contentWidth={width}
                    source={source}
                />
            )
        }
    }

    // render hyperlink to event website if it exists
    const renderInfoUrl = () => {
        if (eventDetails.info_url?.fi) {
            return <Button
                buttonStyle={Styles.urlButton}
                title='Lisätietoja (avaa selaimessa)'
                onPress={() => { Linking.openURL(eventDetails.info_url?.fi) }} />
        }
    }

    // save event to user's favourites
    const saveFavouriteEvent = () => {
        set(
            ref(database, `users/${uid}/favourite_events/${eventDetails?.id}`),
            {
                'id': eventDetails?.id,
                'name': eventDetails.name?.fi,
                'start_time': eventDetails?.start_time,
                'end_time': eventDetails?.end_time
            }
        )
    }

    // remove event from favourites
    const removeFavouriteEvent = () => {
        remove(ref(database, `users/${uid}/favourite_events/${eventDetails?.id}`));
    }

    // fetch event details and determine login status
    useEffect(() => {
        getEventDetails(eventId);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // user is signed in
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
                // user is signed out
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
            <ScrollView style={Styles.eventListContainer}>
                <View style={Styles.eventNameAndFavouriteContainer}>
                    <Text style={Styles.eventName}>{eventDetails.name?.fi}</Text>
                    {renderFavourite()}
                </View>
                <Text>{renderStartTime()}</Text>
                <Text>{renderEndTime()}</Text>
                <Text>{renderDescription()}</Text>
                <View style={Styles.eventInfoButtonsContainer}>
                    <Button // button for location info modal
                        buttonStyle={Styles.locationButton}
                        title='Sijaintitiedot'
                        onPress={() => { navigation.navigate('LocationInfo', { locationUrl: eventDetails?.location["@id"] }) }} />
                    {renderInfoUrl()}
                </View>
            </ScrollView>
        );
    }
};