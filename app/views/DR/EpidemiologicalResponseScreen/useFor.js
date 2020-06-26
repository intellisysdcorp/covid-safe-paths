import 'moment/locale/es';

import { Card, Container, Content, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableHighlight, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Header from '../../../components/DR/Header';
import styles from '../../../components/DR/Header/style';
import Colors from '../../../constants/colors';
import { GetStoreData } from '../../../helpers/General';

export default function UserFor({ navigation }) {
  navigation.setOptions({
    headerShown: false,
  });
  const [nicknameArray, setNicknameArray] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    GetStoreData('nickname', true).then(data =>
      setNicknameArray(JSON.parse(data)),
    );
  }, []);

  return (
    <Container>
      <Content>
        <ScrollView>
          <View style={{ flex: 1 }}>
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
              {nicknameArray.map(name => (
                <TouchableHighlight
                  onPress={() =>
                    navigation.navigate('EpidemiologicResponse', {
                      nickname: name,
                    })
                  }
                  underlayColor={Colors.WHITE}
                  key={name}>
                  <Card style={[styles.bigCards, styles.userDataCard]}>
                    <Text
                      style={[styles.textSemiBold, { marginHorizontal: 12 }]}>
                      {name}
                    </Text>
                    <Icon
                      name='user'
                      size={wp('7%')}
                      color={Colors.BLUE_RIBBON}
                    />
                  </Card>
                </TouchableHighlight>
              ))}
            </View>
          </View>
        </ScrollView>
      </Content>
    </Container>
  );
}
