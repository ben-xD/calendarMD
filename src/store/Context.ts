import React from 'react';

export interface UserContextInterface {}

export interface CalendarContextInterface {}

const CalendarContext = React.createContext({});
const UserContext = React.createContext<UserContextInterface | undefined>(
  undefined,
);
export {CalendarContext, UserContext};
