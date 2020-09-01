import { Card, Text } from 'native-base';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Header from '../../../components/DR/Header';
import styles from '../../../components/DR/Header/style';
import Colors from '../../../constants/colors';

export default function ReportOptions({
  navigation,
  setShowDialog,
  setUseIdCard,
  setUsePassport,
  setUseNss,
  t,
  type,
}) {
  return (
    <>
      <Header
        title={t('report.userInfo.insert_data_title')}
        text={t('report.userInfo.insert_data_subtitle')}
        navigation={navigation}
        close
        iconName='chevron-left'
        style={{ height: wp('38%') }}
      />
      <View
        style={{
          height: hp('60%'),
          alignItems: 'center',
          marginTop: 20,
        }}>
        <TouchableHighlight
          onPress={() => {
            setShowDialog(true);
            setUseIdCard(true);
          }}
          underlayColor='#FFF'>
          <Card style={[styles.bigCards, styles.userDataCard]}>
            <Text
              style={[
                styles.textSemiBold,
                { marginVertical: 10, marginHorizontal: 12 },
              ]}>
              {t('report.userInfo.start_with_id')}
            </Text>
            <Icon name='id-card' size={wp('8.5%')} color={Colors.BLUE_RIBBON} />
          </Card>
        </TouchableHighlight>
        {!type && (
          <TouchableHighlight
            onPress={() => {
              setShowDialog(true);
              setUsePassport(true);
            }}
            underlayColor='#FFF'>
            <Card visi style={[styles.bigCards, styles.userDataCard]}>
              <Text
                style={[
                  styles.textSemiBold,
                  { marginVertical: 10, marginHorizontal: 12 },
                ]}>
                {t('report.userInfo.start_with_passport')}
              </Text>
              <Icon
                name='passport'
                size={wp('9%')}
                color={Colors.BLUE_RIBBON}
              />
            </Card>
          </TouchableHighlight>
        )}
        {!type && (
          <TouchableHighlight
            onPress={() => {
              setShowDialog(true);
              setUseNss(true);
            }}
            underlayColor='#FFF'>
            <Card
              style={[
                styles.bigCards,
                styles.userDataCard,
                { alignItems: 'center' },
              ]}>
              <Text
                style={[
                  styles.textSemiBold,
                  { marginVertical: 10, marginHorizontal: 12 },
                ]}>
                {t('report.userInfo.start_with_nss')}
              </Text>
              <Icon
                name='id-card-alt'
                size={wp('8.5%')}
                color={Colors.BLUE_RIBBON}
              />
            </Card>
          </TouchableHighlight>
        )}
      </View>
    </>
  );
}
