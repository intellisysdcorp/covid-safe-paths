import styled, { css } from '@emotion/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, ScrollView, View } from 'react-native';

import { Divider } from '../components/Divider';
// import { FeatureFlag } from '../components/FeatureFlag';
import NativePicker from '../components/NativePicker';
import NavigationBarWrapper from '../components/NavigationBarWrapper';
import Colors from '../constants/colors';
import { PARTICIPATE, SHARE_LOCATION, USERS } from '../constants/storage';
import {
  GetStoreData,
  RemoveStoreData,
  SetStoreData,
  getMyself,
} from '../helpers/General';
import {
  LOCALE_LIST,
  getUserLocaleOverride,
  setUserLocaleOverride,
  supportedDeviceLanguageOrEnglish,
} from '../locales/languages';
import LocationServices from '../services/LocationService';
// import { GoogleMapsImport } from './Settings/GoogleMapsImport';
import { SettingsItem as Item } from './Settings/SettingsItem';

export const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [isLogging, setIsLogging] = useState(undefined);
  const [isSharing, setIsSharing] = useState(false);
  const [isCovidPositive, setIsCovpositive] = useState([]);
  const [userLocale, setUserLocale] = useState(
    supportedDeviceLanguageOrEnglish(),
  );

  const backToMain = () => {
    navigation.goBack();
  };

  const getCovidpositive = () => {
    GetStoreData(SHARE_LOCATION).then(sharing =>
      setIsSharing(sharing !== null ? true : false),
    );
    GetStoreData(USERS).then(users =>
      setIsCovpositive(users !== null ? JSON.parse(users) : []),
    );
  };

  useEffect(() => {
    const handleBackPress = () => {
      navigation.goBack();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    getCovidpositive();
    // TODO: this should be a service or hook
    GetStoreData(PARTICIPATE)
      .then(isParticipating => setIsLogging(isParticipating === 'true'))
      .catch(error => console.log(error));

    // TODO: extract into service or hook
    getUserLocaleOverride().then(locale => locale && setUserLocale(locale));

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigation]);

  const locationToggleButtonPressed = async () => {
    try {
      isLogging ? LocationServices.stop() : LocationServices.start();
      await SetStoreData(PARTICIPATE, !isLogging);
      setIsLogging(!isLogging);
    } catch (e) {
      console.log(e);
    }
  };

  const subcribeLocationToggleButtonPressed = async () => {
    try {
      isSharing
        ? await RemoveStoreData(SHARE_LOCATION)
        : await SetStoreData(SHARE_LOCATION, true);
      setIsSharing(!isSharing);
    } catch (e) {
      console.log(e);
    }
  };

  const localeChanged = async locale => {
    // If user picks manual lang, update and store setting
    try {
      await setUserLocaleOverride(locale);
      setUserLocale(locale);
    } catch (e) {
      console.log('something went wrong in lang change', e);
    }
  };
  return (
    <NavigationBarWrapper
      title={t('label.settings_title')}
      onBackPress={backToMain}>
      <ScrollView>
        <Section>
          <Item
            label={
              isLogging
                ? t('label.logging_active')
                : t('label.logging_inactive')
            }
            icon={
              isLogging
                ? { name: 'check-circle', color: 'lightgreen', size: 27 }
                : { name: 'times-circle', color: 'red', size: 27 }
            }
            onPress={locationToggleButtonPressed}
          />
          <Divider />
          {isCovidPositive.length > 0 && getMyself(isCovidPositive) && (
            <Item
              last
              label={
                isSharing
                  ? t('label.share_loc_active')
                  : t('label.share_loc_inactive')
              }
              icon={
                isSharing
                  ? { name: 'check-circle', color: 'lightgreen', size: 27 }
                  : { name: 'times-circle', color: 'red', size: 27 }
              }
              onPress={subcribeLocationToggleButtonPressed}
            />
          )}
          <NativePicker
            items={LOCALE_LIST}
            value={userLocale}
            onValueChange={picker => localeChanged(picker)}>
            {({ label, openPicker }) => (
              <Item
                label={label || t('label.home_unknown_header')}
                icon={{ name: 'globe', color: '#3C4ED8', size: 27 }}
                onPress={openPicker}
              />
            )}
          </NativePicker>
        </Section>
        <Divider />

        <Section>
          {/* <Item
            label={t('label.choose_provider_title')}
            description={t('label.choose_provider_subtitle')}
            onPress={() => navigation.navigate('ChooseProviderScreen')}
          /> */}
          <Item
            icon={{ name: 'history', color: '#0161F2', size: 25 }}
            label={t('label.event_history_title')}
            description={t('label.event_history_subtitle')}
            onPress={() => navigation.navigate('ExposureHistoryScreen')}
          />
          <Item
            last
            icon={{ name: 'shield-virus', color: '#0161F2', size: 26 }}
            label={
              isCovidPositive.length > 0
                ? t('label.epidemiologic_report_title')
                : t('label.epidemiologic_report_title_new')
            }
            description={t('label.epidemiologic_report_subtitle')}
            onPress={() => {
              if (isCovidPositive.length > 0) {
                navigation.navigate('UseFor');
              } else {
                navigation.navigate('ReportScreen', { back: true });
              }
            }}
          />
        </Section>

        {/* <FeatureFlag name='google_import'>
          <Section>
            <GoogleMapsImport navigation={navigation} />
          </Section>
        </FeatureFlag> */}

        <Divider />

        <Section last>
          {/* <Item
            label={t('label.about_title')}
            onPress={() => navigation.navigate('AboutScreen')}
          /> */}
          <Item
            icon={{ name: 'handshake', color: '#0161F2', size: 22 }}
            label={t('label.sponsor_title')}
            onPress={() => navigation.navigate('Sponsors')}
          />
          <Item
            icon={{ name: 'user-shield', color: '#0161F2', size: 22 }}
            label={t('label.privacy_policy')}
            onPress={() => navigation.navigate('PrivacyScreen')}
          />
          <Item
            icon={{ name: 'scroll', color: '#0161F2', size: 22 }}
            label={t('label.terms_and_conditions')}
            onPress={() => navigation.navigate('TermsCondition')}
          />
          <Item
            icon={{ name: 'question-circle', color: '#0161F2', size: 22 }}
            last
            label={t('label.label_faqs')}
            onPress={() => navigation.navigate('FAQ')}
          />
        </Section>
      </ScrollView>
    </NavigationBarWrapper>
  );
};

/**
 * Render a white section with blue spacer at the bottom (unless `last == true`)
 *
 * @param {{last?: boolean}} param0
 */
export const Section = ({ last, children }) => (
  <View>
    <SectionWrapper>{children}</SectionWrapper>
  </View>
);

const SectionWrapper = styled.View`
  background-color: ${Colors.WHITE};
  padding: 0px 3.25%;
`;
