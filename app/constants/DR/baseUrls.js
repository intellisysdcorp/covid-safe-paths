import env from 'react-native-config';

export const MEPYD_C5I_SERVICE = __DEV__
  ? 'https://webapps.mepyd.gob.do'
  : env.MEPYD_C5I_URL.replace('" #ignoreline', '');
export const MEPYD_C5I_API_URL = 'contact_tracing/api'; //This point to the API version currently use
export const COV_CASES_SERVICE = env.COV_CASES_URL;
export const PHONE_STORAGE_SECRET_KEY = env.PHONE_STORAGE_SECRET_KEY || ''; // This is only for dev, is not recommend to let this env undefined in env's file
export const FIREBASE_SERVICE = env.FIREBASE_URL;
export const REST_COUNTRIES_SERVICE = env.REST_COUNTRIES_URL;
export const HEALTH_SERVICES_SERVICE = env.HEALTH_SERVICES_URL;
export const COVID_BASE_ID = (env.COVID_BASE_ID || '').replace(
  '" #ignoreline',
  '',
);
export const TOKEN_KEY = (env.TOKEN_KEY || '').replace('" #ignoreline', '');
export const MEPID_URL_API = env.MEPID_URL_API;
export const MEPID_USERNAME = env.MEPID_USERNAME;
export const MEPID_PASSWORD = env.MEPID_PASSWORD;
