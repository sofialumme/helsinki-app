import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import LogInScreen from './LogInScreen';
import SignUpScreen from './SignUpScreen';
import EventInfo from './EventInfo';
import LocationInfo from './LocationInfo';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{ headerTintColor: '#7209b7' }}>
            <Stack.Group>
                <Stack.Screen name="Profile" component={Profile} options={{ title: '' }} />
                <Stack.Screen name="LogInScreen" component={LogInScreen} options={{ title: '' }} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: '' }} />
                <Stack.Screen name="EventInfo" component={EventInfo} options={{ title: '' }} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="LocationInfo" component={LocationInfo} options={{ title: '' }} />
            </Stack.Group>
        </Stack.Navigator>
    );
}