import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './src/components/HomeScreen';
import EventStack from './src/components/EventStack'
import SearchStack from './src/components/SearchStack';
import ProfileStack from './src/components/ProfileStack';
import Styles from './src/components/Styles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HomeScreen"
          screenOptions={
            ({ route }) => ({
              tabBarIcon: ({ focused, size }) => {
                let iconName;
                if (route.name === 'HomeScreen') {
                  iconName = 'home';
                } else if (route.name === 'EventStack') {
                  iconName = 'calendar-month';
                } else if (route.name === 'SearchStack') {
                  iconName = 'magnify';
                } else if (route.name === 'ProfileStack') {
                  iconName = 'star';
                }
                return <MaterialCommunityIcons name={iconName} size={size} color={focused ? '#560bad' : '#858585'} />;
              },
              tabBarActiveTintColor: '#560bad',
              tabBarInactiveTintColor: '#858585',
              tabBarLabelStyle: { fontSize: 11, marginBottom: 5 },
              headerStyle: Styles.headerStyle,
              headerTintColor: '#fff'
            })}>
          <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Etusivu' }} />
          <Tab.Screen name="EventStack" component={EventStack} options={{ title: 'Tapahtumat' }} />
          <Tab.Screen name="SearchStack" component={SearchStack} options={{ title: 'Haku' }} />
          <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ title: 'Suosikit' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
