import { Platform } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ExposedResponse from './components/DR/LocationTracking/ExposedResponse';
import Colors from './constants/colors';
import NavEntry from './NavEntry';
import AboutScreen from './views/About';
import ChooseProviderScreen from './views/ChooseProvider';
// import AuroraScreen from './views/DR/Aurora';
import EpidemiologicScreen from './views/DR/EpidemiologicalResponseScreen';
import UseFor from './views/DR/EpidemiologicalResponseScreen/useFor';
import FAQ from './views/DR/FAQ';
import Details from './views/DR/News/Details';
import PrivacyScreen from './views/DR/PrivacyPolicy';
import QRview from './views/DR/QRview/';
import ReportScreen from './views/DR/ReportScreen';
import Report from './views/DR/ReportScreen/ReportScreenQuestions';
import ReportType from './views/DR/ReportScreen/ReportType';
import ResultsScreen from './views/DR/ReportScreen/Results';
import Sponsors from './views/DR/Sponsors';
import TermsCondition from './views/DR/Terms&Condition';
import UserInfo from './views/DR/UserInfoScreen/index';
import PositiveOnboarding from './views/DR/UserInfoScreen/positiveOnboarding';
import { ExportScreen } from './views/Export';
import { ExposureHistoryScreen } from './views/ExposureHistory/ExposureHistory';
import ImportScreen from './views/Import';
import LocationTracking from './views/LocationTracking';
import Onboarding1 from './views/onboarding/Onboarding1';
import Onboarding2 from './views/onboarding/Onboarding2';
import Onboarding4 from './views/onboarding/Onboarding4';
import Onboarding5 from './views/onboarding/Onboarding5';
import { SettingsScreen } from './views/Settings';

const screens = [
  {
    name: 'Onboarding1',
    component: Onboarding1,
    options: { headerShown: false },
  },
  {
    name: 'Onboarding2',
    component: Onboarding2,
    options: { headerShown: false },
  },
  {
    name: 'Onboarding4',
    component: Onboarding4,
    options: { headerShown: false },
  },
  {
    name: 'Onboarding5',
    component: Onboarding5,
    options: { headerShown: false },
  },
  {
    name: 'HomeScreen',
    component: NavEntry,
    options: { headerShown: false },
  },
  {
    name: 'ExportScreen',
    component: ExportScreen,
    options: { headerShown: false },
  },
  {
    name: 'ImportScreen',
    component: ImportScreen,
    options: { headerShown: false },
  },
  {
    name: 'SettingsScreen',
    component: SettingsScreen,
    options: { headerShown: false },
  },
  {
    name: 'TermsCondition',
    component: TermsCondition,
    options: { headerShown: false },
  },
  {
    name: 'ChooseProviderScreen',
    component: ChooseProviderScreen,
    options: { headerShown: false },
  },
  {
    name: 'PrivacyScreen',
    component: PrivacyScreen,
    options: { headerShown: false },
  },
  {
    name: 'ExposureHistoryScreen',
    component: ExposureHistoryScreen,
    options: { headerShown: false },
  },
  {
    name: 'AboutScreen',
    component: AboutScreen,
    options: { headerShown: false },
  },
  {
    name: 'Location',
    component: LocationTracking,
    options: {
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
    },
  },
  {
    name: 'Results',
    component: ResultsScreen,
    options: { headerShown: false },
  },
  // {
  //   name: 'AuroraScreen',
  //   component: AuroraScreen,
  //   options: {
  //     headerTitle: '',
  //     headerTintColor: Colors.WHITE,
  //     headerBackTitle: ' ',
  //     headerStyle: {
  //       backgroundColor: Colors.BLUE_RIBBON,
  //       height: hp('7%'),
  //     },
  //   },
  // },
  {
    name: 'UserInfo',
    component: UserInfo,
    options: { headerShown: false },
  },
  {
    name: 'PositiveOnboarding',
    component: PositiveOnboarding,
    options: { headerShown: false },
  },
  {
    name: 'ReportType',
    component: ReportType,
    options: { headerShown: false },
  },
  {
    name: 'EpidemiologicResponse',
    component: EpidemiologicScreen,
    options: { headerShown: false },
  },
  {
    name: 'UseFor',
    component: UseFor,
    options: { headerShown: false },
  },
  {
    name: 'Report',
    component: Report,
    options: { headerShown: false },
  },
  {
    name: 'ReportScreen',
    component: ReportScreen,
    options: { headerShown: false },
  },
  {
    name: 'ExposedResponse',
    component: ExposedResponse,
    options: { headerShown: false },
  },
  {
    name: 'Details',
    component: Details,
    options: { headerShown: false },
  },
  {
    name: 'Sponsors',
    component: Sponsors,
    options: { headerShown: false },
  },
  {
    name: 'FAQ',
    component: FAQ,
    options: { headerShown: false },
  },
  {
    name: 'QRview',
    component: QRview,
    options: { headerShown: false },
  },
];

export default screens;
