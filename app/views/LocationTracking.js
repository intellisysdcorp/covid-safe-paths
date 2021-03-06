import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import React, { Component } from 'react';
import {
  AppState,
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { openSettings } from 'react-native-permissions';
import Pulse from 'react-native-pulse';
import { SvgXml } from 'react-native-svg';

import BackgroundImageAtRisk from './../assets/images/backgroundAtRisk.png';
import exportImage from './../assets/images/export.png';
import BackgroundImage from './../assets/images/launchScreenBackground.png';
import settingsIcon from './../assets/svgs/settingsIcon';
import { Button } from '../components/Button';
import NextSteps from '../components/DR/LocationTracking/NextSteps';
import { Typography } from '../components/Typography';
import Colors from '../constants/colors';
import fontFamily from '../constants/fonts';
import { LOCATION_DATA, PARTICIPATE } from '../constants/storage';
import { Theme } from '../constants/themes';
import {
  GetStoreData,
  RemoveStoreData,
  SetStoreData,
} from '../helpers/General';
import {
  StateEnum,
  StateIcon,
  checkCurrentState,
  checkIfUserAtRisk,
  getMainText,
} from '../helpers/LocationHelpers';
import languages from '../locales/languages';
import BackgroundTaskServices from '../services/BackgroundTaskService';
import LocationServices from '../services/LocationService';

const MAYO_COVID_URL = 'https://www.mayoclinic.org/coronavirus-covid-19';
const height = Dimensions.get('window').height;

class LocationTracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      timer_intersect: null,
      isLogging: '',
      currentState: StateEnum.NO_CONTACT,
    };

    try {
      checkCurrentState(this.changeCurrentState.bind(this));
    } catch (e) {
      // statements
      console.log(e);
    }
  }

  changeCurrentState(newState) {
    this.setState({ currentState: newState });
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    // refresh state if settings have changed
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      checkIfUserAtRisk(this.changeCurrentState.bind(this));
    });
    GetStoreData(PARTICIPATE, false)
      .then(isParticipating => {
        if (isParticipating === 'true') {
          this.setState({
            isLogging: true,
          });
          this.willParticipate();
        } else {
          this.setState({
            isLogging: false,
            currentState: StateEnum.SETTING_OFF,
          });
        }
      })
      .catch(error => console.log(error));

    GetStoreData(LOCATION_DATA, false).then(locations => {
      if (Array.isArray(locations) && locations.length > 0) {
        NativeModules.SecureStorageManager.migrateExistingLocations(
          locations,
        ).then(() => {
          RemoveStoreData(LOCATION_DATA);
        });
      }
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    clearInterval(this.state.timer_intersect);
    this.unsubscribe();
  }

  // need to check state again if new foreground event
  // e.g. if user changed location permission
  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      checkCurrentState(this.changeCurrentState.bind(this));
    }
    this.setState({ appState: nextAppState });
  };

  export() {
    this.props.navigation.navigate('ExportScreen', {});
  }

  import() {
    this.props.navigation.navigate('ImportScreen', {});
  }

  willParticipate = () => {
    SetStoreData(PARTICIPATE, 'true').then(() => {
      // Turn of bluetooth for v1
      //BroadcastingServices.start();
    });
    // Check and see if they actually authorized in the system dialog.
    // If not, stop services and set the state to !isLogging
    // Fixes tripleblindmarket/private-kit#129
    BackgroundGeolocation.checkStatus(({ authorization }) => {
      if (authorization === BackgroundGeolocation.AUTHORIZED) {
        LocationServices.start();
        this.setState({
          isLogging: true,
        });
      } else if (authorization === BackgroundGeolocation.NOT_AUTHORIZED) {
        LocationServices.stop();
        // Turn off bluetooth for v1
        //BroadcastingServices.stop(this.props.navigation);
        BackgroundTaskServices.stop();
        this.setState({
          isLogging: false,
        });
      }
    });
  };

  getBackground() {
    if (this.state.currentState === StateEnum.AT_RISK) {
      return BackgroundImageAtRisk;
    }
    return BackgroundImage;
  }
  settings() {
    this.props.navigation.navigate('SettingsScreen', {});
  }

  getSettingsBtn() {
    return (
      <TouchableOpacity
        style={styles.settingsContainer}
        onPress={() => this.settings()}>
        {/* Is there is a reason there's this imageless image tag here? Can we delete it? */}
        <Image resizeMode={'contain'} />
        <SvgXml xml={settingsIcon} width={30} height={30} color='white' />
      </TouchableOpacity>
    );
  }

  getPulseIfNeeded() {
    if (this.state.currentState == StateEnum.NO_CONTACT) {
      return (
        <View style={styles.pulseContainer}>
          <Pulse
            image={{ exportImage }}
            color={Colors.WHITE}
            numPulses={3}
            diameter={400}
            speed={20}
            duration={2000}
          />
          <StateIcon size={height} status={this.state.currentState} />
        </View>
      );
    }
    return (
      <View style={styles.pulseContainer}>
        <Text>Testdsfafasfsdafasfsadf</Text>
        <StateIcon size={height} status={this.state.currentState} />
      </View>
    );
  }

  getSubText() {
    switch (this.state.currentState) {
      case StateEnum.NO_CONTACT:
        return languages.t('label.home_no_contact_subtext');
      case StateEnum.AT_RISK:
        return languages.t('label.home_at_risk_subtext');
      case StateEnum.UNKNOWN:
        return languages.t('label.home_unknown_subtext');
      case StateEnum.SETTING_OFF:
        return languages.t('label.home_setting_off_subtext');
    }
  }
  getSubSubText() {
    switch (this.state.currentState) {
      case StateEnum.NO_CONTACT:
        return null;
      case StateEnum.AT_RISK:
        return languages.t('label.home_at_risk_subsubtext');
      case StateEnum.UNKNOWN:
        return null;
      case StateEnum.SETTING_OFF:
        return null;
    }
  }

  getCTAIfNeeded() {
    let buttonLabel;
    let buttonFunction;
    if (this.state.currentState === StateEnum.NO_CONTACT) {
      return;
    } else if (this.state.currentState === StateEnum.AT_RISK) {
      buttonLabel = languages.t('label.see_exposure_history');
      buttonFunction = () => {
        this.props.navigation.navigate('ExposureHistoryScreen');
      };
    } else if (this.state.currentState === StateEnum.UNKNOWN) {
      buttonLabel = languages.t('label.home_enable_location');
      buttonFunction = () => {
        openSettings();
      };
    } else if (this.state.currentState === StateEnum.SETTING_OFF) {
      buttonLabel = languages.t('label.home_enable_location');
      buttonFunction = () => {
        this.settings();
      };
    }
    return (
      <Button
        label={buttonLabel}
        small
        onPress={() => buttonFunction()}
        style={styles.buttonContainer}
      />
    );
  }

  getMayoInfoPressed() {
    Linking.openURL(MAYO_COVID_URL);
  }

  render() {
    const hasPossibleExposure = this.state.currentState === StateEnum.AT_RISK;
    return (
      <Theme use={hasPossibleExposure ? 'charcoal' : 'violet'}>
        <ImageBackground
          source={this.getBackground()}
          style={styles.backgroundImage}>
          {this.getPulseIfNeeded()}

          <View style={styles.mainContainer}>
            <View style={styles.contentAbovePulse}>
              {hasPossibleExposure &&
                getMainText(this.state.currentState, styles.mainTextAbove)}
              <Typography style={styles.subsubheaderText}>
                {this.getSubSubText()}
              </Typography>
            </View>
            <View style={styles.contentBelowPulse}>
              {!hasPossibleExposure &&
                getMainText(this.state.currentState, styles.mainTextBelow)}
              <Typography style={styles.subheaderText}>
                {this.getSubText()}
              </Typography>
              {this.getCTAIfNeeded()}
              {hasPossibleExposure && (
                <NextSteps navigation={this.props.navigation} />
              )}
            </View>
          </View>

          {/* {this.getSettingsBtn()} */}
        </ImageBackground>
      </Theme>
    );
  }
}

const PULSE_GAP = 80;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    backgroundColor: Colors.BLUE_RIBBON,
  },
  mainContainer: {
    position: 'absolute',
    // resizeMode: 'contain',
    // aligns the center of the main container with center of pulse
    // so that two `flex: 1` views will be have a reasonable chance at natural
    // flex flow for above and below the pulse.
    top: '-7%',
    left: 0,
    right: 0,
    height: '100%',
    paddingHorizontal: '12%',
    paddingBottom: 12,
  },
  contentAbovePulse: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: PULSE_GAP,
  },
  contentBelowPulse: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: PULSE_GAP,
  },
  settingsContainer: {
    position: 'absolute',
    top: 0,
    marginTop: '14%',
    marginRight: '7%',
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    width: 'auto',
    height: 'auto',
    marginTop: 24,
    minHeight: 54, // fixes overlaying buttons on really small screens
    maxHeight: 90,
  },
  pulseContainer: {
    backgroundColor: Colors.BLUE_RIBBON,
    position: 'absolute',
    resizeMode: 'contain',
    top: '-15%',
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTextAbove: {
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 24,
    color: Colors.WHITE,
    fontSize: 28,
    top: '-5%',
    fontFamily: fontFamily.primaryMedium,
  },
  mainTextBelow: {
    textAlign: 'center',
    lineHeight: 34,
    color: Colors.WHITE,
    fontSize: 26,
    fontFamily: fontFamily.primaryMedium,
    marginBottom: 24,
  },
  subheaderText: {
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24.5,
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: fontFamily.primaryRegular,
  },
  subsubheaderText: {
    textAlign: 'center',
    lineHeight: 24.5,
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: fontFamily.primaryLight,
    marginBottom: 24,
    top: '-7%',
  },
  mayoInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.BLUE_RIBBON,
  },
  mayoInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    padding: 20,
  },
  mainMayoHeader: {
    textAlign: 'left',
    color: Colors.MISCHKA,
    fontSize: 18,
    fontFamily: fontFamily.primaryBold,
  },
  mainMayoSubtext: {
    textAlign: 'left',
    color: Colors.MISCHKA,
    fontSize: 18,
    fontFamily: fontFamily.primaryRegular,
  },
  arrowContainer: {
    alignSelf: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export default LocationTracking;
