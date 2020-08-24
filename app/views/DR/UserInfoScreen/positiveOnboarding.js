import { Button, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import styles from '../../../components/DR/Header/style';
import Input from '../../../components/DR/Input/index';
import NavigationBarWrapper from '../../../components/NavigationBarWrapper';
import Colors from '../../../constants/colors';
import { GetStoreData, SetStoreData } from '../../../helpers/General';
import ShareLocationDialog from './shareLocationDialog';

const PositiveOnboarding = ({ route, navigation }) => {
  const { positive, use } = route.params;
  const { t } = useTranslation();
  const [showShareLocDialog, setShowShareLocDialog] = useState(false);
  const [error, showError] = useState(false);
  const [nickname, setNickname] = useState('');
  const [nicknameArray, setNicknameArray] = useState([]);

  useEffect(() => {
    GetStoreData('users', false).then(data =>
      setNicknameArray(data !== null ? data : []),
    );
  }, []);

  const createEntry = (nickname, positive) => {
    return {
      name: nickname,
      positive,
      use,
    };
  };

  const getNicknamesCoincidences = (users, nickname) => {
    let coincidence = false;
    if (users.length > 0) {
      users.map(user => {
        if (user.name === nickname) {
          coincidence = true;
        }
      });
    }
    return coincidence;
  };
  const verifyAndAccept = async () => {
    if (!getNicknamesCoincidences(nicknameArray, nickname)) {
      nicknameArray.push(createEntry(nickname, positive, use));
      await SetStoreData('users', nicknameArray);
      setShowShareLocDialog(true);
      navigation.navigate('EpidemiologicResponse', {
        screen: 'EpidemiologicReport',
        params: { nickname: nickname, path: false },
      });
    } else {
      showError(true);
    }
  };
  const enabled = nickname.length > 2 ? true : false;

  return (
    <NavigationBarWrapper
      title={t('label.epidemiologic_report_title')}
      onBackPress={() => navigation.popToTop()}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior='position'
          keyboardVerticalOffset={50}
          style={{ flex: 1, backgroundColor: Colors.WHITE }}>
          <ShareLocationDialog
            visible={showShareLocDialog}
            t={t}
            setVisible={setShowShareLocDialog}
            useType={use}
          />
          <View
            style={[
              styles.formContainer,
              {
                justifyContent: 'center',
                alignItems: 'center',
                height: hp('80%'),
                padding: 15,
              },
            ]}>
            <View>
              <Image
                resizeMode='contain'
                style={{
                  height: 230,
                  width: 310,
                  alignSelf: 'center',
                  marginBottom: 25,
                }}
                source={require('../../../assets/images/covidSick.jpg')}
              />
            </View>

            <Text
              style={[
                styles.subtitles,
                { textAlign: 'center', alignSelf: 'center', marginLeft: 10 },
              ]}>
              {t('positives.you_are_positive')}
            </Text>
            <View
              style={[
                styles.bottomLine,
                { alignSelf: 'center', marginVertical: 10 },
              ]}
            />
            <Text style={[styles.text, { textAlign: 'center' }]}>
              {t('positives.insert_nickname')}
            </Text>
            {error && (
              <Text style={[styles.text, { color: Colors.RED_TEXT }]}>
                {t('positives.nickname_exist')}
              </Text>
            )}
            <Input
              value={nickname}
              onChange={text => setNickname(text)}
              style={{
                marginBottom: 22,
                width: wp('50%'),
                textAlign: 'center',
              }}
              autoFocus
              keyboardType={'default'}
              maxLength={16}
            />
            <Button
              disabled={!enabled}
              style={[
                styles.buttons,
                { width: wp('70%') },
                !enabled && { backgroundColor: Colors.BLUE_DISABLED },
              ]}
              onPress={() => verifyAndAccept()}>
              <Text style={[styles.text, { color: Colors.WHITE }]}>
                {t('common.done')}
              </Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </NavigationBarWrapper>
  );
};

export default PositiveOnboarding;
