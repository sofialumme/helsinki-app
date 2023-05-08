import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryList from './CategoryList';
import EventList from './EventList';
import EventInfo from './EventInfo';
import LocationInfo from './LocationInfo';

const Stack = createNativeStackNavigator();

export default function EventStack() {
    return (
        <Stack.Navigator
            initialRouteName="CategoryList"
            screenOptions={{ headerTintColor: '#7209b7' }}>
            <Stack.Group>
                <Stack.Screen name="CategoryList" component={CategoryList} options={{ title: '' }} />
                <Stack.Screen name="EventList" component={EventList} options={{ title: '' }} />
                <Stack.Screen name="EventInfo" component={EventInfo} options={{ title: '' }} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="LocationInfo" component={LocationInfo} options={{ title: '' }} />
            </Stack.Group>
        </Stack.Navigator>
    );
}