import { Button, Card, Left, Text } from 'native-base';
import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Colors from '../../../constants/colors';
import {
  MEPYD_C5I_API_URL,
  MEPYD_C5I_SERVICE,
} from '../../../constants/DR/baseUrls';
import { validateCertificate } from '../../../helpers/DR/validateResponse';
import { GetStoreData } from '../../../helpers/General';
import languages from '../../../locales/languages';
import getToken from '../../../services/DR/getToken';
import styles from './styles';

const { ORANGE, GREEN, BLUE_RIBBON, GRAY } = Colors;

export class Feels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positive: false,
    };
  }

  isPositiveCovid = async () => {
    const positive = await GetStoreData('positive', false);
    if (positive) this.props.handler();
    return positive;
  };

  async componentDidMount() {
    this.setState({ positive: await this.isPositiveCovid() });
  }

  render() {
    const {
      props: { navigation },
      state: { positive },
    } = this;
    return (
      <View>
        <Card style={styles.bigCards}>
          <View style={styles.auroraContainer}>
            <Icon name='heartbeat' color={ORANGE} size={wp('7%')} />
            <Text style={[styles.textHeader, { marginLeft: 8 }]}>
              {languages.t('label.report_symptoms_title')}
            </Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.text, { width: '90%' }]}>
              {positive
                ? languages.t('label.positive_symptoms_description')
                : languages.t('label.report_symptoms_description')}
            </Text>
            <View style={{ justifyContent: 'center' }}>
              <Button
                onPress={() =>
                  navigation.navigate(
                    positive ? 'EpidemiologicResponse' : 'ReportScreen',
                  )
                }
                style={[
                  styles.buttons,
                  {
                    backgroundColor: GREEN,
                    width: wp('70%'),
                    marginTop: 15,
                  },
                ]}>
                <Text style={styles.buttonText}>
                  {positive
                    ? languages.t('label.positive_symptoms_label')
                    : languages.t('label.report_symptoms_label')}
                </Text>
              </Button>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

export function Aurora({ navigation }) {
  const { t } = useTranslation();
  return (
    <Card style={styles.bigCards}>
      <View style={styles.auroraContainer}>
        <Image
          style={styles.auroraImage}
          source={require('../../../assets/images/aurora_logo.png')}
        />
        <Text style={[styles.textHeader, { marginLeft: 8 }]}>
          {t('label.auroraMsp_title')}
        </Text>
      </View>
      <View style={styles.tester}>
        <Left>
          <Text style={styles.text}>{t('label.auroraMsp_description')}</Text>
        </Left>
        <Button
          onPress={() => navigation.navigate('AuroraScreen')}
          style={[
            styles.buttons,
            { backgroundColor: BLUE_RIBBON, marginLeft: 10 },
          ]}>
          <Text style={styles.buttonText}>{t('label.conversar_label')}</Text>
        </Button>
      </View>
    </Card>
  );
}

export function LocationMatch({ navigation }) {
  const baseUrl = `${MEPYD_C5I_SERVICE}/${MEPYD_C5I_API_URL}/Contact`;
  const { t } = useTranslation();
  return (
    <Card style={styles.bigCards}>
      <View style={styles.auroraContainer}>
        <Icon name='search-location' color={BLUE_RIBBON} size={wp('6%')} />
        <Text style={[styles.textHeader, { marginLeft: 8 }]}>
          {t('label.location_match_title')}
        </Text>
      </View>
      <View style={styles.tester}>
        <Left>
          <Text style={styles.text}>
            {t('label.location_match_description')}
          </Text>
        </Left>
        <Button
          onPress={async () => {
            await getToken(true);
            const validCertificate = await validateCertificate(baseUrl);
            validCertificate && navigation.navigate('Location');
          }}
          style={[
            styles.buttons,
            { backgroundColor: BLUE_RIBBON, marginLeft: 10 },
          ]}>
          <Text style={styles.buttonText}>
            {t('label.location_match_button')}
          </Text>
        </Button>
      </View>
    </Card>
  );
}

export function Footer({ navigation }) {
  const { t } = useTranslation();
  return (
    <View style={styles.footer}>
      <View style={{ margin: wp('5%') }}>
        <Text style={[styles.text, { color: GRAY, textAlign: 'center' }]}>
          {t('label.home_screen_bottom_text')}
        </Text>
      </View>
      <Button
        small
        bordered
        rounded
        info
        onPress={() => navigation.navigate('Sponsors')}
        style={{
          marginBottom: 10,
          padding: 15,
          alignSelf: 'center',
        }}>
        <Text
          style={[
            styles.text,
            {
              fontSize: 12,
              color: Colors.BLUE_LINK,
              textAlign: 'center',
            },
          ]}>
          {t('label.sponsor_title')}
        </Text>
      </Button>
    </View>
  );
}
