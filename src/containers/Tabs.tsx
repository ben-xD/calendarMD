import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Calendars from '../screens/Calendars';
import Events from '../screens/Events';
import Context from '../store/Context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {}

const Tab = createBottomTabNavigator();

const Tabs: React.FC<Props> = () => {
  const [calendarId, setCalendarId] = useState('Calendar ID fake');

  return (
    <Context.Provider value={{setCalendarId, calendarId}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Calendars') {
              return <AntDesign name="calendar" size={size} color={color} />;
            } else if (route.name === 'Events') {
              return (
                <MaterialIcons name="event-busy" size={size} color={color} />
              );
            }
          },
        })}>
        <Tab.Screen
          name="Calendars"
          component={Calendars}
          setCalendarId={setCalendarId}
        />
        <Tab.Screen name="Events" component={Events} calendarId={calendarId} />
      </Tab.Navigator>
    </Context.Provider>
  );
};

export default Tabs;
