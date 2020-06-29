import 'moment/locale/es';

import { Card, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableHighlight, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from '../../../components/DR/Header/style';
import NavigationBarWrapper from '../../../components/NavigationBarWrapper';
import Colors from '../../../constants/colors';
import { GetStoreData } from '../../../helpers/General';

export default function UserFor({ navigation }) {
  navigation.setOptions({
    headerShown: false,
  });
  const [nicknameArray, setNicknameArray] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    GetStoreData('users', true).then(data =>
      setNicknameArray(JSON.parse(data)),
    );
  }, []);

  return (
    <NavigationBarWrapper
      title={t('label.epidemiologic_report_title')}
      onBackPress={() => navigation.goBack()}>
      <ScrollView>
        <View
          style={{
            height: hp('50%'),
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={styles.subtitles}>¿Quien está usando?</Text>
          {nicknameArray.map(user => (
            <TouchableHighlight
              onPress={() =>
                navigation.navigate('EpidemiologicResponse', {
                  screen: 'EpidemiologicReport',
                  params: { nickname: user.name },
                })
              }
              underlayColor={Colors.WHITE}
              key={user.name}>
              <Card style={[styles.bigCards, styles.userDataCard]}>
                {console.log(user)}

                <Text style={[styles.textSemiBold, { marginHorizontal: 12 }]}>
                  {user.name}
                </Text>
                <Icon name='user' size={wp('7%')} color={Colors.BLUE_RIBBON} />
              </Card>
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>
    </NavigationBarWrapper>
  );
}
