import React from 'react';
import { useFonts, RockSalt_400Regular} from '@expo-google-fonts/rock-salt';
import { AppLoading } from 'expo';

import BasePage from './containers/BasePage';


export default function App() {
  let [fontsLoaded] = useFonts({RockSalt_400Regular});
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <BasePage />
  );
}
