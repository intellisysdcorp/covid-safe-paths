import { Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { getAllCases } from '../../services/DR/getAllCases.js';
import styles from '../../views/DR/HomeScreen/style';
import DashboardCards from './DashboardCards.js';

class CasesStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdate: 0,
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      current: 0,
    };
  }
  componentDidMount() {
    this.getCases();
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

  getCases = () => {
    getAllCases().then(
      ({ lastUpdate, confirmed, deaths, recovered, current }) => {
        this.setState(() => ({
          lastUpdate,
          ...this.separateOrAbreviate({
            confirmed,
            deaths,
            recovered,
            current,
          }), // To take all the cards' content and abreviate them
        }));
        this.props.refreshing();
      },
    );
  };

  getUpdateDate = () => {
    const { lastUpdate } = this.state;
    const { t } = this.props;
    const dateOfCase = new Date(lastUpdate);

    let month = dateOfCase.getMonth() + 1;
    month = month <= 9 ? '0' + month : month;
    let day = dateOfCase.getDate();
    day = day <= 9 ? '0' + day : day;
    const year = dateOfCase.getFullYear();

    return `${t('label.date_dashboard_label')}\n${day}/${month}/${year}`;
  };

  render() {
    const { t, navigation, refresh } = this.props;
    const { confirmed, deaths, recovered, current } = this.state;

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
            {this.getUpdateDate()}
          </Text>
        </View>

        <View style={styles.actualSituationContainer}>
          <DashboardCards
            t={t}
            navigation={navigation}
            confirmed={confirmed}
            deaths={deaths}
            recovered={recovered}
            current={current}
          />
        </View>
      </>
    );
  }
}

export default CasesStatistics;
