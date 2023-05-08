import React, { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Text, TextInput, View } from "react-native";
import { Button } from '@rneui/themed';
import Styles from "./Styles";

export default function LogInScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async () => {
        await signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                navigation.navigate('Profile');
            })
            .catch((error) => {
                console.log(error);
                setErrorMsg('Tapahtui virhe. Tarkista, että sähköposti ja salasana ovat oikein.')
            });
    }

    return (
        <View style={Styles.profileContainer}>
            <TextInput
                style={Styles.input}
                onChangeText={email => setEmail(email)}
                value={email}
                placeholder="Sähköposti" />
            <TextInput
                style={Styles.input}
                onChangeText={password => setPassword(password)}
                value={password}
                placeholder="Salasana"
                secureTextEntry />
            <Button
                buttonStyle={Styles.logInButton}
                title="Kirjaudu"
                onPress={() => onSubmit()} />
            <Text>{errorMsg}</Text>
            <Text>Eikö sinulla ole vielä tiliä? <Text
                style={Styles.hyperlinkText}
                onPress={() => { navigation.navigate('SignUpScreen') }}>Luo käyttäjätili</Text>
            </Text>
        </View>
    )
}