import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { Component } from 'react';

import screens from './EntryOptions';
import { GetStoreData } from './helpers/General';
import NavEntry from './NavEntry';
import Onboarding1 from './views/onboarding/Onboarding1';

const Stack = createStackNavigator();
class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRouteName: null,
    };
  }

  componentDidMount() {
    GetStoreData('ONBOARDING_DONE').then(onboardingDoneName =>
      this.setState({ initialRouteName: onboardingDoneName }),
    );
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='InitialScreen'
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            cardStyle: {
              backgroundColor: 'transparent', // prevent white flash on Android
            },
          }}>
          {this.state.initialRouteName === 'true' ? (
            <Stack.Screen
              name='InitialScreen'
              component={NavEntry}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name='InitialScreen'
              component={Onboarding1}
              options={{ headerShown: false }}
            />
          )}
          {screens.map((screen, indx) => {
            return <Stack.Screen key={indx} {...screen} />;
          })}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Entry;
