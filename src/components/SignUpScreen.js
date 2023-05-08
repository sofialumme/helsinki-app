import React, { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Text, TextInput, View } from "react-native";
import { Button } from '@rneui/themed';
import Styles from "./Styles";

export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                navigation.navigate('Profile');
            })
            .catch((error) => {
                console.log(error);
                setErrorMsg('Tapahtui virhe. Tarkista, että sähköpostiosoitteesi on oikein etkä jättänyt kenttiä tyhjiksi.');
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
            <Text>Salasanan vähimmäispituus 6 merkkiä.</Text>
            <Button
                buttonStyle={Styles.signUpButton}
                title="Luo tili"
                onPress={() => onSubmit()} />
            <Text>{errorMsg}</Text>
        </View>
    )
}