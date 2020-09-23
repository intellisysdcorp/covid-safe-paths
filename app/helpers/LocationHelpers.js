import React from 'react';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import { SvgXml } from 'react-native-svg';

import StateAtRisk from './../assets/svgs/stateAtRisk';
import StateNoContact from './../assets/svgs/stateNoContact';
import StateUnknown from './../assets/svgs/stateUnknown';
import { Typography } from '../components/Typography';
import { CROSSED_PATHS, DEBUG_MODE, PARTICIPATE } from '../constants/storage';
import { checkIntersect } from '../helpers/Intersect';
import languages from '../locales/languages';
import BackgroundTaskServices from '../services/BackgroundTaskService';
import { HCAService } from '../services/HCAService';
import { isPlatformiOS } from '../Util';
import { GetStoreData } from './General';

export const StateEnum = {
  UNKNOWN: 0,
  AT_RISK: 1,
  NO_CONTACT: 2,
  SETTING_OFF: 3,
};

export const StateIcon = ({ status, size }) => {
  let icon;
  switch (status) {
    case StateEnum.UNKNOWN:
      icon = StateUnknown;
      break;
    case StateEnum.AT_RISK:
      icon = StateAtRisk;
      break;
    case StateEnum.NO_CONTACT:
      icon = StateNoContact;
      break;
    case StateEnum.SETTING_OFF:
      icon = StateUnknown;
      break;
  }
  return (
    <SvgXml xml={icon} width={size ? size : 80} height={size ? size : 80} />
  );
};

/*  Check current state
        1) determine if user has correct location permissions
        2) check if they are at risk -> checkIfUserAtRisk()
        3) set state accordingly */
export function checkCurrentState(changeState) {
  // NEED TO TEST ON ANDROID
  let locationPermission;
  if (isPlatformiOS()) {
    locationPermission = PERMISSIONS.IOS.LOCATION_ALWAYS;
  } else {
    locationPermission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  }

  // If user has location enabled & permissions, start logging
  GetStoreData(PARTICIPATE, false).then(isParticipating => {
    if (isParticipating && HCAService.isAutosubscriptionEnabled()) {
      check(locationPermission)
        .then(result => {
          switch (result) {
            case RESULTS.GRANTED:
              checkIfUserAtRisk(changeState);
              HCAService.findNewAuthorities();
              return;
            case RESULTS.UNAVAILABLE:
            case RESULTS.BLOCKED:
              console.log('NO LOCATION');
              changeState(StateEnum.UNKNOWN);
          }
        })
        .catch(error => {
          console.log('error checking location: ' + error);
        });
    } else {
      changeState(StateEnum.SETTING_OFF);
    }
  });
}

export function checkIfUserAtRisk(changeState) {
  BackgroundTaskServices.start();
  // If the user has location tracking disabled, set enum to match
  GetStoreData(PARTICIPATE, false).then(isParticipating => {
    if (isParticipating === false) {
      changeState(StateEnum.SETTING_OFF);
    }
    //Location enable
    else {
      crossPathCheck(changeState);
    }
  });
}

//Due to Issue 646 moved below code from checkIfUserAtRisk function
function crossPathCheck(changeState) {
  GetStoreData(DEBUG_MODE).then(dbgMode => {
    if (dbgMode != 'true') {
      // already set on 12h timer, but run when this screen opens too
      checkIntersect();
    }
    GetStoreData(CROSSED_PATHS).then(dayBin => {
      dayBin = JSON.parse(dayBin);
      if (dayBin !== null && dayBin.reduce((a, b) => a + b, 0) > 0) {
        console.log('Found crossed paths');
        changeState(StateEnum.AT_RISK);
      } else {
        console.log("Can't find crossed paths");
        changeState(StateEnum.NO_CONTACT);
      }
    });
  });
}

export function getMainText(state, styles) {
  switch (state) {
    case StateEnum.NO_CONTACT:
      return (
        <Typography style={styles}>
          {languages.t('label.home_no_contact_header')}
        </Typography>
      );
    case StateEnum.AT_RISK:
      return (
        <Typography style={styles}>
          {languages.t('label.home_at_risk_header')}
        </Typography>
      );
    case StateEnum.UNKNOWN:
      return (
        <Typography style={styles}>
          {languages.t('label.home_unknown_header')}
        </Typography>
      );
    case StateEnum.SETTING_OFF:
      return (
        <Typography style={styles}>
          {languages.t('label.home_setting_off_header')}
        </Typography>
      );
  }
}
