import React, { useState, useEffect } from 'react';
import { View, Text, Linking, ScrollView, ActivityIndicator } from 'react-native';
import Styles from './Styles';

// web version without map
export default function LocationInfo({ route }) {
    const { locationUrl } = route.params;
    const [locationDetails, setLocationDetails] = useState({});

    const [isloading, setIsLoading] = useState(true);

    const getLocationDetails = (locationUrl) => {
        setIsLoading(true);
        fetch(locationUrl)
            .then(response => response.json())
            .then(data => {
                setLocationDetails(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getLocationDetails(locationUrl);
    }, []);

    const renderDescription = () => {
        if (locationDetails.description?.fi) {
            return <Text>{locationDetails.description?.fi}</Text>
        }
    }

    const renderAddress = () => {
        if (locationDetails.street_address?.fi && locationDetails.address_locality?.fi) {
            return (<View><Text>{locationDetails.street_address?.fi}</Text>
                <Text>{locationDetails.address_locality?.fi}</Text></View>)
        }
    }

    const renderPhoneNum = () => {
        if (locationDetails.telephone?.fi) {
            return <Text>Puh. {locationDetails.telephone?.fi}</Text>
        }
    }

    const renderWebsiteUrl = () => {
        if (locationDetails.info_url?.fi) {
            return <Text
                style={{ color: '#4895ef' }}
                onPress={() => { Linking.openURL(locationDetails.info_url?.fi) }}>Linkki verkkosivuille</Text>
        }
    }

    if (isloading) {
        return (
            <ScrollView style={Styles.eventListContainer}>
                <ActivityIndicator size={'large'} />
            </ScrollView>
        );
    } else {
        return (
            <ScrollView style={Styles.eventListContainer}>
                <Text>{locationDetails.name?.fi}</Text>
                {renderAddress()}
                {renderPhoneNum()}
                {renderWebsiteUrl()}
                {renderDescription()}
            </ScrollView>
        );
    }
};