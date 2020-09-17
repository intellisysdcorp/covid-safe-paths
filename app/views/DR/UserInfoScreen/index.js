import 'moment/locale/es';

import moment from 'moment';
import { Button, Container, Content, Text } from 'native-base';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import CalendarButton from '../../../components/DR/CalendarButton';
import styles from '../../../components/DR/Header/style';
import Input from '../../../components/DR/Input/index';
import PhoneInput from '../../../components/DR/PhoneInput/index';
import context from '../../../components/DR/Reduces/context.js';
import Colors from '../../../constants/colors';
import {
  MEPYD_C5I_API_URL,
  MEPYD_C5I_SERVICE,
} from '../../../constants/DR/baseUrls';
import {
  validateCertificate,
  validateResponse,
} from '../../../helpers/DR/validateResponse';
import { GetStoreData, saveUserState } from '../../../helpers/General';
import ReportOptions from './reportOptions';

export default function UserInfo({
  navigation,
  route: {
    params: { type, use },
  },
}) {
  navigation.setOptions({
    headerShown: false,
  });
  const { t } = useTranslation();

  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [usePassport, setUsePassport] = useState(false);
  const [useIdCard, setUseIdCard] = useState(false);
  const [useNss, setUseNss] = useState(false);
  const [error, setError] = useState(false);
  const [positiveError, setPositiveError] = useState(false);
  const [
    {
      answers: {
        birth,
        cid = '',
        passportId = '',
        passportName = '',
        nssId = '',
        phoneNumber,
      },
    },
    setGlobalState,
  ] = useContext(context);

  const closeDialog = final => {
    setError(false);
    setShowDialog(false);
    setShowValidationDialog(false);
    setUseIdCard(false);
    setUseNss(false);
    setUsePassport(false);
    final && setGlobalState({ type: 'CLEAN_ANSWERS' });
  };

  const validateCovidPositive = async info => {
    const body =
      type === 'PositiveReport' ? { ...info, IamPositive: true } : info;

    return await validateResponse(
      `${MEPYD_C5I_SERVICE}:443/${MEPYD_C5I_API_URL}/Form`,
      'POST',
      body,
    );
  };

  const validate = async data => {
    const { body } = data;
    try {
      let response = await validateCertificate(
        t,
        `${MEPYD_C5I_SERVICE}/${MEPYD_C5I_API_URL}/Person`,
        true,
        'POST',
        body,
      );
      setLoading(false);

      if (response.valid !== undefined) {
        if (response.valid) {
          getAge(birth);
          const { positive, covidId } = await validateCovidPositive(body);
          saveUserState({
            covidId,
            positive,
            haveBeenNotified: positive,
            useType: use,
          });
          closeDialog(false);
          if (positive) {
            GetStoreData('users', false).then(data => {
              let same = false;
              let name = '';
              if (data !== null) {
                data.map(user => {
                  if (
                    (body.cid !== undefined && user.data.cid === body.cid) ||
                    (body.nssid !== undefined && user.data.nssid === body.nssid)
                  ) {
                    same = true;
                    name = user.name;
                  }
                });
              }
              same
                ? navigation.navigate('EpidemiologicResponse', {
                    screen: 'EpidemiologicReport',
                    params: { nickname: name },
                  })
                : navigation.navigate('PositiveOnboarding', {
                    positive,
                    use,
                    covidId,
                  });
            });
          } else if (type && !positive) {
            setShowValidationDialog(true);
            setPositiveError(true);
          } else {
            const userList = await GetStoreData('users', false);
            const checkCoincidense = userList.some(
              user => user.covidId === covidId,
            );
            if (!checkCoincidense)
              navigation.navigate('PositiveOnboarding', {
                positive,
                use,
                covidId,
              });
            else {
              navigation.navigate('Report');
            }
          }
        } else {
          setError(true);
        }
      } else {
        setShowDialog(false);
        setShowValidationDialog(true);
      }
      return response;
    } catch (e) {
      setLoading(false);
      closeDialog();
      setShowValidationDialog(true);
      console.log('ha ocurrido un error', e);
    }
  };

  const sendDataToApi = async () => {
    let data = { body: {} };
    setLoading(true);
    if (useIdCard) {
      data.body = {
        cid: cid,
        birth: moment(birth).format('YYYY-MM-DD'),
        phoneNumber: phoneNumber,
      };
    } else if (usePassport) {
      data.body = {
        passportId: passportId,
        passportName: passportName,
        birth: moment(birth).format('YYYY-MM-DD'),
        phoneNumber: phoneNumber,
      };
    } else {
      data.body = {
        nssid: nssId,
        birth: moment(birth).format('YYYY-MM-DD'),
        phoneNumber: phoneNumber,
      };
    }
    return await validate(data);
  };

  const isPassport = usePassport => {
    if (usePassport) {
      return (
        <View>
          <Text style={styles.textSemiBold}>
            {t('report.userInfo.name_and_lastname')}
          </Text>
          <Input
            value={passportName}
            onChange={text => setSelectedOption('passportName', text)}
            style={{ marginBottom: 12 }}
            keyboardType={'default'}
            maxLength={35}
          />
        </View>
      );
    }
  };

  const setSelectedOption = (option, selected) => {
    setGlobalState({
      type: 'ADD_ANSWERS',
      value: { [option]: selected },
    });
  };
  const getAge = date => {
    const today = new Date();
    const birthday = new Date(date);
    let personAge = today.getFullYear() - birthday.getFullYear();
    const month = today.getMonth() - birthday.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
      personAge--;
    }
    return setSelectedOption('age', personAge);
  };

  let disabled =
    (cid.length > 10 || passportId.length > 6 || nssId.length > 5) &&
    (phoneNumber.length > 13 || passportName.length > 8) &&
    birth
      ? false
      : true;
  return (
    <Container>
      <Content>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Dialog
              visible={showValidationDialog}
              onTouchOutside={() => closeDialog(true)}
              dialogStyle={{ backgroundColor: Colors.WHITE }}>
              <Icon
                name={'exclamation-circle'}
                color={Colors.RED_TEXT}
                size={30}
                style={{ marginBottom: 12, alignSelf: 'center' }}
              />
              {positiveError ? (
                <Text>{t('report.userInfo.is_not_positive_msg')}</Text>
              ) : (
                <Text>{t('report.userInfo.api_down_error_msg')}</Text>
              )}
              <Button
                style={[
                  styles.buttons,
                  {
                    backgroundColor: Colors.GREEN,
                    width: '70%',
                    marginTop: 25,
                  },
                ]}
                onPress={() => {
                  closeDialog(true);
                }}>
                <Text>{t('report.close')}</Text>
              </Button>
            </Dialog>
            <Dialog
              onTouchOutside={() => closeDialog(true)}
              visible={showDialog}
              dialogStyle={{ backgroundColor: Colors.WHITE }}>
              <View>
                <Button
                  transparent
                  onPress={() => closeDialog(true)}
                  style={{ marginTop: -10 }}>
                  <Icon name='times' size={25} color={Colors.GREEN} />
                </Button>
                {loading && (
                  <ActivityIndicator
                    size={30}
                    animating={loading}
                    color={Colors.BLUE_RIBBON}
                  />
                )}

                {error && (
                  <Text style={[styles.text, { color: Colors.RED_TEXT }]}>
                    {t('report.userInfo.incorrect_data_error_msg')}
                  </Text>
                )}
                <Text style={styles.textSemiBold}>
                  {t('report.userInfo.enter_your')}{' '}
                  {useNss
                    ? t('report.userInfo.social_security_number')
                    : useIdCard
                    ? t('report.userInfo.id_number')
                    : t('report.userInfo.passport_number')}
                  :
                </Text>
                {useIdCard || useNss ? (
                  <Input
                    value={useIdCard ? cid : useNss && nssId}
                    onChange={text =>
                      setSelectedOption(
                        useIdCard ? 'cid' : useNss && 'nssId',
                        `${text}`.replace(/\D/g, ''),
                      )
                    }
                    style={{ marginBottom: 12 }}
                    keyboardType={'numeric'}
                    maxLength={useNss ? 9 : 11}
                  />
                ) : (
                  <Input
                    value={passportId}
                    onChange={text => setSelectedOption('passportId', text)}
                    style={{ marginBottom: 12 }}
                    keyboardType={'default'}
                    maxLength={10}
                  />
                )}

                {isPassport(usePassport)}

                <Text style={styles.textSemiBold}>
                  {t('report.userInfo.tel_number')}
                </Text>
                <PhoneInput
                  value={phoneNumber}
                  handleOnChange={text =>
                    setSelectedOption('phoneNumber', text)
                  }
                  style={{ marginBottom: 12 }}
                />

                <Text style={[styles.textSemiBold, { marginBottom: 10 }]}>
                  {t('report.userInfo.birthdate')}
                </Text>
                <CalendarButton
                  onChange={date => {
                    setSelectedOption(
                      'birth',
                      moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                    );
                  }}
                  date={moment(birth).format('DD-MM-YYYY')}
                  minDate='01-01-1900'
                />
                <Button
                  disabled={disabled || loading}
                  style={[
                    styles.buttons,
                    {
                      backgroundColor:
                        disabled || loading ? Colors.DARK_GREEN : Colors.GREEN,
                      marginTop: 18,
                    },
                  ]}
                  onPress={async () => {
                    await sendDataToApi();
                  }}>
                  <Text style={styles.buttonText}>{t('report.continue')}</Text>
                </Button>
              </View>
            </Dialog>
            <ReportOptions
              navigation={navigation}
              setShowDialog={setShowDialog}
              setUseIdCard={setUseIdCard}
              setUsePassport={setUsePassport}
              setUseNss={setUseNss}
              t={t}
              type={type}
            />
          </View>
        </ScrollView>
      </Content>
    </Container>
  );
}
