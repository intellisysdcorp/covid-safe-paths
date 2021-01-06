import { Button, Text } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Dialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from '../../../components/DR/Header/style';
import ToggleButtons from '../../../components/DR/ToggleButtons';
import Colors from '../../../constants/colors';
import { RemoveStoreData } from '../../../helpers/General';

const EpidemiologicalStatus = ({ route, navigation }) => {
  //Change for a call to the goverment's epidemiology department API, to validate the status of the user
  //by the moment the response state is always waiting dor results.
  const { nickname, valid, use } = route.params;
  const { t } = useTranslation();
  const [todaysFeeling, setTodaysFeeling] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  if (use === 'mySelf') {
    setTimeout(async () => {
      await RemoveStoreData('shareLocation');
    }, 500);
  }

  const closeDialog = () => {
    setShowDialog(false);
    setTodaysFeeling('');
  };
  return (
    <ScrollView>
      <View
        style={{ flex: 1, height: hp('79.7%'), backgroundColor: Colors.WHITE }}>
        <Dialog
          visible={showDialog}
          dialogStyle={{ backgroundColor: Colors.WHITE }}>
          <View>
            <Button
              transparent
              onPress={() => closeDialog()}
              style={{ marginTop: -10 }}>
              <Icon name='times' size={25} color={Colors.GREEN} />
            </Button>
            <Text style={styles.textSemiBold}>
              {t('positives.how_feel_today')}
            </Text>
            <ToggleButtons
              btnStyle={{ width: '85%' }}
              options={[t('positives.feel_great'), t('positives.feel_bad')]}
              onSelection={selected => setTodaysFeeling(selected)}
              selectedOption={todaysFeeling}
            />
            <Button
              disabled={!todaysFeeling}
              style={[
                styles.buttons,
                {
                  backgroundColor: !todaysFeeling
                    ? Colors.DARK_GREEN
                    : Colors.GREEN,
                  width: '70%',
                  marginTop: hp('3%'),
                },
              ]}
              onPress={() => {
                closeDialog();
                if (todaysFeeling === t('positives.feel_bad')) {
                  navigation.navigate('Report');
                } else {
                  navigation.navigate('mentalHealthAdvices');
                }
              }}>
              <Text style={[styles.text, { color: Colors.WHITE }]}>
                {t('label.accept')}
              </Text>
            </Button>
          </View>
        </Dialog>
        <View style={styles.formContainer}>
          <Text style={[styles.subtitles, { alignSelf: 'center' }]}>
            {t('positives.hello')}
            {nickname}!
          </Text>
          <Text style={styles.subtitles}>
            {t('positives.epidemiological_discharge')}
          </Text>
          <View style={styles.bottomLine} />
          <Text>{t('positives.status')}</Text>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '80%',
            }}>
            {valid ? (
              <View>
                <Image
                  resizeMode='contain'
                  style={{
                    height: wp('60%'),
                    width: wp('80%'),
                    alignSelf: 'center',
                  }}
                  source={require('../../../assets/images/waitingResults.jpg')}
                />
                <Text
                  style={[
                    styles.textSemiBold,
                    {
                      color: Colors.GOLD,
                      textAlign: 'center',
                      fontSize: wp('5%'),
                    },
                  ]}>
                  {t('positives.waiting_lab')}
                </Text>
              </View>
            ) : (
              <View>
                <Image
                  resizeMode='contain'
                  style={{
                    height: wp('60%'),
                    width: wp('80%'),
                    alignSelf: 'center',
                  }}
                  source={require('../../../assets/images/covidFree.jpg')}
                />
                <Text
                  style={[
                    styles.textSemiBold,
                    {
                      color: Colors.MEDIUM_GREEN,
                      textAlign: 'center',
                      fontSize: wp('5.5%'),
                      width: wp('70%'),
                    },
                  ]}>
                  {t('positives.covid_free')}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            width: wp('100%'),
          }}>
          <Button
            style={[styles.buttons, { width: wp('70%') }]}
            onPress={() => setShowDialog(true)}>
            <Text style={[styles.text, { color: Colors.WHITE }]}>
              {t('positives.how_feel_today')}
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default EpidemiologicalStatus;
