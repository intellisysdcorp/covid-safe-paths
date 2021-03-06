import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import NavigationBarWrapper from '../../../components/NavigationBarWrapper';
import Colors from '../../../constants/colors';
import ShareLocationDialog from '../UserInfoScreen/shareLocationDialog';
import EpidemiologicalStatus from './epidemiologicalStatus';
import MentalHealthAdvices from './mentalHealthAdvices';

const TopBar = createMaterialTopTabNavigator();

const EpidemiologicScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [showShareLocDialog, setShowShareLocDialog] = useState(true);
  const { path, showDialog = false } = route.params;
  const navigationHandler = path => {
    return path ? navigation.goBack() : navigation.popToTop();
  };
  return (
    <NavigationBarWrapper
      title={t('label.epidemiologic_report_title')}
      onBackPress={() => navigationHandler(path)}>
      <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
        <ShareLocationDialog
          visible={showShareLocDialog && showDialog}
          t={t}
          setVisible={setShowShareLocDialog}
        />
        <TopBar.Navigator
          tabBarOptions={{
            activeTintColor: '#0059ff',
            inactiveTintColor: '#000',
            labelStyle: {
              fontSize: 12,
            },
          }}>
          <TopBar.Screen
            name={'EpidemiologicReport'}
            component={EpidemiologicalStatus}
            options={{ tabBarLabel: t('positives.epidemiologic_report_tab') }}
          />
          <TopBar.Screen
            name={'mentalHealthAdvices'}
            component={MentalHealthAdvices}
            options={{ tabBarLabel: t('positives.mental_health_advice_tab') }}
          />
        </TopBar.Navigator>
      </View>
    </NavigationBarWrapper>
  );
};

export default EpidemiologicScreen;
