import {AxiosInstance} from 'axios';
import React from 'react';
import {User} from '@react-native-community/google-signin';

export interface UserContextInterface {
  axiosInstance: AxiosInstance | undefined;
  setAxiosInstance: (axiosInstance: AxiosInstance) => void;
  user: User | undefined;
  setUser: (user: User) => void;
}

export interface CalendarContextInterface {
  calendarId: string | undefined;
  setCalendarId: (calendarId: string) => void;
}

const CalendarContext = React.createContext<CalendarContextInterface>(
  {} as CalendarContextInterface,
);
const UserContext = React.createContext<UserContextInterface>(
  {} as UserContextInterface,
);
export {CalendarContext, UserContext};
