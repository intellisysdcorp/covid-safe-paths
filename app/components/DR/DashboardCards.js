import moment from 'moment';
import { Card, Text } from 'native-base';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import Colors from '../../constants/colors';
import styles from '../../views/DR/HomeScreen/style';

export default function DashboardCards({
  navigation,
  t,
  confirmed,
  deaths,
  recovered,
  current,
  date,
  showMap,
}) {
  const dashboardCategories = [
    { label: 'label.positive_label', styles: '', value: confirmed },
    {
      label: 'label.deceased_label',
      styles: { color: Colors.BUTTON_LIGHT_TEX },
      value: deaths,
    },
    {
      label: 'label.recovered_label',
      styles: { color: Colors.GREEN },
      value: recovered,
    },
    {
      label: 'label.case_day_label',
      styles: { color: Colors.SUN },
      value: current,
    },
  ];
  const CONFIRMED_COVID_CASES_URL =
    'https://coronavirusrd.gob.do/casos-de-covid-19-confirmados/';

  return dashboardCategories.map(obj => (
    <TouchableOpacity
      style={styles.shadowBorder}
      key={obj.label}
      onPress={() =>
        showMap
          ? navigation.navigate('Details', {
              source: { uri: CONFIRMED_COVID_CASES_URL },
            })
          : Alert.alert(
              t('label.attention'),
              `${t('dashboard.attention_message')} ${moment(
                date,
                'YYYY-MM-DD',
              ).format('DD-MM-YYYY')}`,
            )
      }>
      <Card style={styles.infoCards}>
        <Text style={[styles.dataText, obj.styles]}>{obj.value}</Text>
        <Text style={styles.text}>{t(obj.label)}</Text>
      </Card>
    </TouchableOpacity>
  ));
}
