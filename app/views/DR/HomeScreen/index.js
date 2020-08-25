import dayjs from 'dayjs';
import { Left, Text } from 'native-base';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import settingsIcon from '../../../assets/svgs/settingsIcon';
import {
  Aurora,
  Feels,
  Footer,
  LocationMatch,
} from '../../../components/DR/ActionCards/ActionCards.js';
import CasesStatistics from '../../../components/DR/CasesStatistics';
import Colors from '../../../constants/colors';
import { FIREBASE_SERVICE } from '../../../constants/DR/baseUrls';
import fetch from '../../../helpers/Fetch';
import { GetStoreData, SetStoreData } from '../../../helpers/General';
import DialogAdvice from '../../DialogAdvices';
import styles from './style';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notified: false,
      useType: '',
      refreshing: false,
    };
  }

  handler = useType => {
    this.setState({ notified: true, useType });
  };

  refresh = () => {
    this.setState(state => ({ ...state, refreshing: true }));
  };

  handlerRefresh = () => {
    this.setState({ refreshing: false });
  };

  handlerPositiveState = () => {
    this.setState({ notified: false });
    this.props.navigation.navigate('PositiveOnboarding', {
      positive: true,
      use: this.state.useType,
    });
  };

  async componentDidMount() {
    const covidIdList = JSON.parse(await GetStoreData('covidIdList'));
    const haveBeenNotified = await GetStoreData('haveBeenNotified');

    if (covidIdList !== null && !haveBeenNotified) {
      const promiseList = covidIdList.map(userState => {
        return fetch(`${FIREBASE_SERVICE}/covid-state/${userState.covidId}`);
      });

      Promise.all(promiseList).then(state => {
        const checkState = state.find(({ data }) => data.positive === true);
        if (checkState) {
          SetStoreData('haveBeenNotified', true);
          this.handler('mySelf');
        }
      });
    }
  }

  getSettings() {
    return (
      <TouchableOpacity
        style={styles.settingsContainer}
        onPress={() => {
          this.props.navigation.navigate('SettingsScreen');
        }}>
        <SvgXml xml={settingsIcon} width={30} height={30} color='white' />
      </TouchableOpacity>
    );
  }

  render() {
    const {
      props: { t, navigation },
      state: { refreshing, notified },
    } = this;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.BLUE_RIBBON }}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            refreshControl={
              <RefreshControl
                tintColor={Colors.LIGHT_GRAY}
                refreshing={refreshing}
                onRefresh={this.refresh}
              />
            }>
            <View style={styles.mainHeader}>
              <View style={styles.rowAndCenter}>
                <Left>
                  <Text style={[styles.text, { color: Colors.WHITE }]}>
                    {dayjs().format('MMMM YYYY')}
                  </Text>
                </Left>
              </View>
              <Text style={styles.headerText}>COVID-RD</Text>
            </View>

            <View style={styles.marginAndAlign}>
              <Feels navigation={navigation} />
              <CasesStatistics
                t={t}
                navigation={navigation}
                refresh={refreshing}
                refreshing={this.handlerRefresh}
              />
              <LocationMatch navigation={this.props.navigation} />
              <Aurora navigation={this.props.navigation} />
              <Footer navigation={navigation} />
            </View>
            {this.getSettings()}
          </ScrollView>
        </View>
        <DialogAdvice
          visible={notified}
          text={t('label.positive_covid_message')}
          close={this.handlerPositiveState}
        />
      </SafeAreaView>
    );
  }
}

export default withTranslation()(HomeScreen);
