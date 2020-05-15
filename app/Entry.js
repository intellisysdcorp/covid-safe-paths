import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { Component } from 'react';

import { GetStoreData } from './helpers/General';
import AboutScreen from './views/About';
import ChooseProviderScreen from './views/ChooseProvider';
import BulletinsScreen from './views/DR/Bulletins';
import DetailsScreen from './views/DR/Details';
// import LocationTracking from './views/LocationTracking';
import HomeScreen from './views/DR/HomeScreen';

import NewsScreen from './views/DR/News';
import { ExportScreen } from './views/Export';
import { ExposureHistoryScreen } from './views/ExposureHistory/ExposureHistory';
import ImportScreen from './views/Import';
import { LicensesScreen } from './views/Licenses';
import Onboarding1 from './views/onboarding/Onboarding1';
import Onboarding2 from './views/onboarding/Onboarding2';
import Onboarding3 from './views/onboarding/Onboarding3';
import Onboarding4 from './views/onboarding/Onboarding4';
import Onboarding5 from './views/onboarding/Onboarding5';
import { SettingsScreen } from './views/Settings';

const Stack = createStackNavigator();

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRouteName: '',
    };
  }

  componentDidMount() {
    GetStoreData('ONBOARDING_DONE')
      .then(onboardingDone => {
        this.setState({
          initialRouteName: onboardingDone,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='HomeScreen'
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            cardStyle: {
              backgroundColor: 'transparent', // prevent white flash on Android
            },
          }}>
          {this.state.initialRouteName === 'true' ? (
            <Stack.Screen
              name='InitialScreen'
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name='InitialScreen'
              component={Onboarding1}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name='Onboarding1'
            component={Onboarding1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Onboarding2'
            component={Onboarding2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Onboarding3'
            component={Onboarding3}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Onboarding4'
            component={Onboarding4}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Onboarding5'
            component={Onboarding5}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='NewsScreen'
            component={NewsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='BulletinsScreen'
            component={BulletinsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailsScreen'
            component={DetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ExportScreen'
            component={ExportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ImportScreen'
            component={ImportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='SettingsScreen'
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ChooseProviderScreen'
            component={ChooseProviderScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='LicensesScreen'
            component={LicensesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ExposureHistoryScreen'
            component={ExposureHistoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='AboutScreen'
            component={AboutScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ReportScreen'
            component={AboutScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='AuroraScreen'
            component={AboutScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Entry;
