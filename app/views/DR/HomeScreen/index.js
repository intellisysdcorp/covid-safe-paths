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
import { COVID_ID_LIST, USERS } from '../../../constants/storage';
import fetch from '../../../helpers/Fetch';
import {
  GetStoreData,
  RemoveStoreData,
  SetStoreData,
  saveUserState,
} from '../../../helpers/General';
import DialogAdvice from '../../DialogAdvices';
import styles from './style';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notified: false,
      useType: '',
      refreshing: false,
      covidId: '',
      covidUserNickname: '',
    };
  }

  filterState = async userList => {
    const filterUserList = userList.filter(user => user.covidId !== undefined);
    await SetStoreData('users', filterUserList);
  };

  handler = userList => {
    const promiseList = userList.map(userState => {
      return fetch(`${FIREBASE_SERVICE}/covid-state/${userState.covidId}`);
    });

    Promise.all(promiseList).then(state => {
      const {
        data: { covidId = false, haveBeenNotified = false },
      } = state.find(
        ({ data }) => data.positive === true && data.haveBeenNotified === false,
      );
      if (covidId && !haveBeenNotified) {
        this.filterState(userList);
        const { use, name = 'Usted', positive } = userList.find(
          user => user.covidId === covidId,
        );

        saveUserState({ covidId, positive, haveBeenNotified: true });
        this.setState({
          notified: true,
          useType: use,
          covidUserNickname: name,
          covidId,
        });
      }
    });
  };

  refresh = () => {
    this.setState(state => ({ ...state, refreshing: true }));
  };

  handlerRefresh = () => {
    this.setState({ refreshing: false });
  };

  handlerPositiveState = () => {
    const { useType, covidId, covidUserNickname } = this.state;
    this.setState({ notified: false });

    if (covidUserNickname === 'Usted') {
      this.props.navigation.navigate('PositiveOnboarding', {
        positive: true,
        use: useType,
        covidId,
      });
    } else {
      this.props.navigation.navigate('EpidemiologicResponse', {
        screen: 'EpidemiologicReport',
        params: { nickname: covidUserNickname, path: false },
        showDialog: useType === 'mySelf' ? true : false,
      });
    }
  };

  async componentDidMount() {
    const covidIdList = await GetStoreData(COVID_ID_LIST, false);
    let userList = await GetStoreData(USERS, false);

    if (covidIdList !== null) {
      userList = userList.concat(covidIdList);
      RemoveStoreData(covidIdList);
      this.handler(userList);
    } else {
      this.handler(userList);
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
      state: { refreshing, notified, covidUserNickname },
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
          text={`${covidUserNickname} ${t('label.positive_covid_message')}`}
          close={this.handlerPositiveState}
        />
      </SafeAreaView>
    );
  }
}

export default withTranslation()(HomeScreen);
