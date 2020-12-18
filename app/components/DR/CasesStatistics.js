import moment from 'moment';
import { Text } from 'native-base';
import React from 'react';
import { Alert, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import CalendarButton from '../../components/DR/CalendarButton';
import { getAllCases } from '../../services/DR/getAllCases.js';
import styles from '../../views/DR/HomeScreen/style';
import DashboardCards from './DashboardCards.js';

class CasesStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      current: 0,
      date: '',
      lastDateAvaiblable: '',
    };
  }
  componentDidMount() {
    this.getCases(this.state.date);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.confirmed || nextProps ? true : false;
  }

  // This fuction is to abreviate or separate numbers, ex: 1000 => 1,000, 100000 => 100K
  separateOrAbreviate = data => {
    const { confirmed, deaths, recovered, current } = data;

    const oldCases = [confirmed, deaths, recovered, current];

    const newCases = oldCases.map(number => {
      switch (number > 0) {
        case number < 1e3:
          return number;

        case number >= 1e3 && number < 1e5:
          return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

        case number >= 1e5 && number < 1e6:
          return +(number / 1e3).toFixed(1) + 'K';

        default:
          return +(number / 1e6).toFixed(1) + 'M';
      }
    });
    return {
      confirmed: newCases[0],
      deaths: newCases[1],
      recovered: newCases[2],
      current: newCases[3],
    };
  };

  getCases = async date => {
    const correctDateAPI =
      date.length === 0
        ? moment()
            .subtract(1, 'day')
            .format('YYYY-MM-DD')
        : moment(date)
            .subtract(1, 'day')
            .format('YYYY-MM-DD');

    const data = await getAllCases(correctDateAPI);

    const { t } = this.props;
    const {
      casos_acumulados,
      defunciones_acumuladas,
      recuperados,
      nuevas_muestras,
    } = data[0];
    if (!casos_acumulados) {
      return Alert.alert(
        t('dashboard.error_title'),
        t('dashboard.error_message'),
      );
    }

    const newDate =
      date.length === 0
        ? moment().format('YYYY-MM-DD')
        : moment(date).format('YYYY-MM-DD');

    this.setState(({ lastDateAvaiblable }) => ({
      lastDateAvaiblable:
        lastDateAvaiblable > newDate ? lastDateAvaiblable : newDate,
      date: newDate,
      ...this.separateOrAbreviate({
        confirmed: casos_acumulados,
        deaths: defunciones_acumuladas,
        recovered: recuperados,
        current: nuevas_muestras,
      }), // To take all the cards' content and abreviate them
    }));
    this.props.refreshing();
  };

  render() {
    const { t, navigation, refresh } = this.props;
    const {
      confirmed, // Casos acumulados
      deaths, // defunciones_acumuladas
      recovered, // recuperados
      current, // nuevas_muestras
      date,
      lastDateAvaiblable,
    } = this.state;

    return (
      <>
        {refresh && this.getCases()}

        <View style={styles.actualSituationContent}>
          <Text
            style={[
              styles.subtitles,
              { alignSelf: 'center', marginVertical: hp('1%') },
            ]}>
            {t('label.current_situation_label')}
          </Text>
          <Text
            style={[
              styles.dateSubtitle,
              { alignSelf: 'center', textAlign: 'center' },
            ]}>
            {t('label.date_dashboard_label')}
          </Text>
          <CalendarButton
            style={styles.calendar}
            date={
              date
                ? moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY')
                : moment().format('DD-MM-YYYY')
            }
            onChange={date => {
              this.getCases(moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD'));
            }}
            minDate='17-07-2020'
          />
        </View>

        <View style={styles.actualSituationContainer}>
          <DashboardCards
            t={t}
            navigation={navigation}
            confirmed={confirmed}
            deaths={deaths}
            recovered={recovered}
            current={current}
            date={lastDateAvaiblable}
            showMap={lastDateAvaiblable === date}
          />
        </View>
      </>
    );
  }
}

export default CasesStatistics;
