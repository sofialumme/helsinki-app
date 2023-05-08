import { StyleSheet } from "react-native";

export default StyleSheet.create({
    headerStyle: {
        backgroundColor: '#560bad'
    },
    homeScreenContainer: {
        marginLeft: 5,
        marginRight: 5,
    },
    profileContainer: {
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    eventListContainer: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5
    },
    searchContainer: {
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nextAndPreviousButtons: {
        flexDirection: 'row'
    },
    eventListDivider: {
        backgroundColor: '#858585',
        marginBottom: 5,
        marginTop: 5
    },
    eventNameAndFavouriteContainer: {
        flexDirection: 'row'
    },
    eventName: {
        fontSize: 20,
        color: '#3a0ca3',
        marginRight: 40
    },
    favouriteIcon: {
        marginLeft: 'auto'
    },
    profileTitle: {
        marginVertical: 5,
        fontSize: 25
    },
    categoryTitle: {
        marginVertical: 5,
        fontSize: 25,
        alignSelf: 'center'
    },
    categoryButtonsContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 5,
        marginBottom: 10,
        alignItems: 'center'
    },
    eventInfoButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    frontPageButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    categoryButton: {
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
        width: 140,
        marginHorizontal: 20,
        marginTop: 20,
    },
    locationButton: {
        backgroundColor: '#f72585',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
        width: 140,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 5
    },
    urlButton: {
        backgroundColor: '#4895ef',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
        width: 140,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 5
    },
    searchButton: {
        backgroundColor: '#b5179e',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
        width: 140,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 5
    },
    logInButton: {
        backgroundColor: '#4361ee',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
        width: 140,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 5
    },
    logOutButton: {
        backgroundColor: '#f72585',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
        width: 140,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 5
    },
    signUpButton: {
        backgroundColor: '#4895ef',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
        width: 140,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 5
    },
    input: {
        width: 200,
        height: 30,
        borderColor: '#858585',
        borderWidth: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
        marginTop: 10
    },
    locationMap: {
        flex: 1,
        margin: 10,
        height: 450,
        width: 340
    },
    hyperlinkText: {
        color: '#4895ef'
    }
})