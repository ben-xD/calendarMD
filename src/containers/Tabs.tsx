import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Calendars from '../screens/Calendars';
import Events from '../screens/Events';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CalendarContext} from '../store/Context';
import Settings from '../screens/Settings';

interface Props {}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendars"
        component={Calendars}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Events"
        component={Events}
        options={{headerTitle: 'Find events'}}
      />
    </Stack.Navigator>
  );
};

const Tabs: React.FC<Props> = () => {
  const [calendarId, setCalendarId] = useState('');
  const [calendarName, setCalendarName] = useState('');

  return (
    <CalendarContext.Provider
      value={{setCalendarId, calendarId, calendarName, setCalendarName}}>
      <Tab.Navigator
        initialRouteName={'Calendars'}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Calendars') {
              return <AntDesign name="calendar" size={size} color={color} />;
            } else if (route.name === 'Events') {
              return (
                <MaterialIcons name="event-busy" size={size} color={color} />
              );
            } else if (route.name === 'Settings') {
              return (
                <MaterialIcons name="settings" size={size} color={color} />
              );
            }
          },
        })}>
        <Tab.Screen name="Calendars" component={CalendarStack} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </CalendarContext.Provider>
  );
};

export default Tabs;
