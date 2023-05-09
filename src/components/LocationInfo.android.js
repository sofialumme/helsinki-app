import React, { useState, useEffect } from 'react';
import { View, Text, Linking, ScrollView, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Styles from './Styles';

export default function LocationInfo({ route }) {
    const { locationUrl } = route.params;
    const [locationDetails, setLocationDetails] = useState({});

    const [isloading, setIsLoading] = useState(true);

    // fetch location data
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

    // render location description if it exists
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

    // render map with marker at location coordinates
    const renderMap = () => {
        if (locationDetails.position?.coordinates) {
            return (<MapView
                style={Styles.locationMap}
                region={{
                    latitude: locationDetails.position?.coordinates[1],
                    longitude: locationDetails.position?.coordinates[0],
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221,
                }}>
                <Marker
                    coordinate={{
                        latitude: locationDetails.position?.coordinates[1],
                        longitude: locationDetails.position?.coordinates[0],
                    }}
                    title={locationDetails.name?.fi} />
            </MapView>)
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
                {renderMap()}
                <Text>{locationDetails.name?.fi}</Text>
                {renderAddress()}
                {renderPhoneNum()}
                {renderWebsiteUrl()}
                {renderDescription()}
            </ScrollView>
        );
    }
};