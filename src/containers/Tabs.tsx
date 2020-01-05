import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Calendars from '../screens/Calendars';
import Events from '../screens/Events';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CalendarContext} from '../store/Context';
import Settings from '../screens/Settings';

interface Props {}

const Tab = createBottomTabNavigator();

const Tabs: React.FC<Props> = () => {
  const [calendarId, setCalendarId] = useState('');
  const [calendarName, setCalendarName] = useState('');

  return (
    <CalendarContext.Provider
      value={{setCalendarId, calendarId, calendarName, setCalendarName}}>
      <Tab.Navigator
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
        <Tab.Screen name="Calendars" component={Calendars} />
        <Tab.Screen name="Events" component={Events} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </CalendarContext.Provider>
  );
};

export default Tabs;
