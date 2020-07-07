import 'react-native-gesture-handler';

import * as Sentry from '@sentry/react-native';
import React, { useEffect, useReducer } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';

import context from './app/components/DR/Reduces/context';
import { initialState, reducer } from './app/components/DR/Reduces/index';
import StatusBar from './app/components/DR/StatusBar';
import Colors from './app/constants/colors';
import { Theme } from './app/constants/themes';
import Entry from './app/Entry';
import { FlagsProvider } from './app/helpers/Flags';
import VersionCheckService from './app/services/VersionCheckService';

Sentry.init({
  dsn:
    'https://6d77818b863e4e409a0985e64566781f@o416827.ingest.sentry.io/5313567',
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 10000,
});

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    VersionCheckService.start();
  }, []);

  const [state, setState] = useReducer(reducer, initialState);

  return (
    <context.Provider value={[state, setState]}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.BLUE_RIBBON}
      />
      <FlagsProvider>
        <MenuProvider>
          <Theme use='default'>
            <Entry />
          </Theme>
        </MenuProvider>
      </FlagsProvider>
    </context.Provider>
  );
};

export default App;
