import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { Component } from 'react';
import { Platform } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ExposedResponse from './components/DR/LocationTracking/ExposedResponse';
import Colors from './constants/colors';
import { GetStoreData } from './helpers/General';
import NavEntry from './NavEntry';
import AboutScreen from './views/About';
import ChooseProviderScreen from './views/ChooseProvider';
import AuroraScreen from './views/DR/Aurora';
import EpidemiologicScreen from './views/DR/EpidemiologicalResponseScreen';
import FAQ from './views/DR/FAQ';
import Details from './views/DR/News/Details';
import Report from './views/DR/ReportScreen/ReportScreenQuestions';
import ResultsScreen from './views/DR/ReportScreen/Results';
import Sponsors from './views/DR/Sponsors';
import UserInfo from './views/DR/UserInfoScreen/index';
import { ExportScreen } from './views/Export';
import { ExposureHistoryScreen } from './views/ExposureHistory/ExposureHistory';
import ImportScreen from './views/Import';
import { LicensesScreen } from './views/Licenses';
import LocationTracking from './views/LocationTracking';
import Onboarding1 from './views/onboarding/Onboarding1';
import Onboarding2 from './views/onboarding/Onboarding2';
import Onboarding4 from './views/onboarding/Onboarding4';
import Onboarding5 from './views/onboarding/Onboarding5';
import { SettingsScreen } from './views/Settings';

const Stack = createStackNavigator();
const StateEnum = {
  UNKNOWN: 0,
  AT_RISK: 1,
  NO_CONTACT: 2,
  SETTING_OFF: 3,
};
class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: StateEnum.NO_CONTACT,
      initialRouteName: 'true',
    };
  }

  async componentDidMount() {
    let onboardingDoneName = await GetStoreData('ONBOARDING_DONE');
    this.setState({
      initialRouteName: onboardingDoneName,
    });
  }

  render() {
    const { currentState } = this.state;
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
            name='Onboarding4'
            component={Onboarding4}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Onboarding5'
            component={Onboarding5}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='HomeScreen' options={{ headerShown: false }}>
            {navigation => (
              <NavEntry {...navigation} currentState={currentState} />
            )}
          </Stack.Screen>
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
            name='Location'
            options={{
              headerTitle: '',
              headerTintColor: Colors.WHITE,
              headerBackTitle: ' ',
              headerStyle: {
                backgroundColor:
                  Platform.OS === 'android' ? (0, 0, 0) : Colors.BLUE_RIBBON, // Transparent Background
                elevation: 0, // remove shadow on Android
                height: hp('7%'),
              },
              headerLeftContainerStyle: {
                marginLeft: 15,
              },
            }}>
            {navigation => (
              <LocationTracking {...navigation} currentState={currentState} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name='Results'
            component={ResultsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Report'
            component={Report}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='AuroraScreen'
            component={AuroraScreen}
            options={{
              headerTitle: '',
              headerTintColor: Colors.WHITE,
              headerBackTitle: ' ',
              headerStyle: {
                backgroundColor: Colors.BLUE_RIBBON,
                height: hp('7%'),
              },
            }}
          />
          <Stack.Screen
            name='UserInfo'
            component={UserInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='EpidemiologicResponse'
            component={EpidemiologicScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ExposedResponse'
            component={ExposedResponse}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Details'
            component={Details}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Sponsors'
            component={Sponsors}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='FAQ'
            component={FAQ}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Entry;
