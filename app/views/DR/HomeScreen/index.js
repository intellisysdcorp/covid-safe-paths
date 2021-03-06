import analytics from '@react-native-firebase/analytics';
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
  Feels,
  Footer,
  LocationMatch,
} from '../../../components/DR/ActionCards/ActionCards.js';
import CasesStatistics from '../../../components/DR/CasesStatistics';
import Colors from '../../../constants/colors';
import { MEPID_URL_API } from '../../../constants/DR/baseUrls';
import { GetStoreData, SetStoreData } from '../../../helpers/General';
import {
  StateEnum,
  StateIcon,
  checkCurrentState,
  getMainText,
} from '../../../helpers/LocationHelpers';
import { getTokenMepid } from '../../../services/DR/getToken';
import DialogAdvice from '../../DialogAdvices';
import styles from './style';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      showDialog: false,
      refreshing: false,
      statusVisible: true,
      currentState: StateEnum.NO_CONTACT,
    };
    try {
      checkCurrentState(this.changeCurrentState.bind(this));
    } catch (e) {
      // statements
      console.log(e);
    }
  }

  refresh = () => {
    this.setState(state => ({ ...state, refreshing: true }));
  };

  handlerRefresh = () => {
    this.setState({ refreshing: false });
  };

  changeCurrentState(newState) {
    this.setState({ currentState: newState });
  }

  handlerUserFormatArray = userState => {
    return userState.map(user => {
      if (user[0].data.length) {
        return {
          covidId: user[0].data[0].covidID,
          positive: user[0].data[0].Resultado === 'Negativo' ? false : true,
        };
      }
      return false;
    });
  };

  handleUserNotification = () => {
    const { user } = this.state;
    this.setState({ showDialog: false });

    if (user.positive) {
      this.props.navigation.navigate('EpidemiologicResponse', {
        screen: 'EpidemiologicReport',
        params: { nickname: user.name, path: false, valid: true },
        showDialog: user.use === 'mySelf' ? true : false,
      });
    } else {
      this.props.navigation.navigate('EpidemiologicResponse', {
        screen: 'EpidemiologicReport',
        params: {
          nickname: user.name,
          path: false,
          valid: false,
          use: user.use,
        },
      });
    }
  };

  validateUserState = async userList => {
    const token = await getTokenMepid();

    const promiseList = userList.map(user =>
      fetch(`${MEPID_URL_API}/api/resultado/${user.covidId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => response.json()),
    );

    Promise.all(promiseList).then(userState => {
      const userArrayFormat = this.handlerUserFormatArray(userState);

      const userDischarge = userList.find((user, index) => {
        if (userArrayFormat[index]) {
          return (
            user.covidId === userArrayFormat[index].covidId &&
            user.positive !== userArrayFormat[index].positive
          );
        }
      });

      if (userDischarge) {
        userDischarge.positive = !userDischarge.positive;
        SetStoreData('users', userList);
        this.setState({ user: userDischarge, showDialog: true });
      }
    });
  };

  async componentDidMount() {
    setTimeout(() => {
      this.setState({ statusVisible: false });
    }, 7000);

    const locationState = await GetStoreData('locationState', false);
    const userList = await GetStoreData('users', false);
    if (userList) {
      this.validateUserState(userList);
    }

    if (!locationState) {
      try {
        await analytics().logEvent('Location_status', {
          value: this.state.currentState === 0 ? 'false' : 'true',
        });
        await SetStoreData('locationState', true);
      } catch (error) {
        console.log('Something went wrong with analytics ', error);
      }
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
      state: { refreshing, statusVisible, showDialog, user },
    } = this;
    const dialogMessage = user.positive
      ? t('label.positive_covid_message', { name: user.name })
      : t('label.negative_covid_message', { name: user.name });

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
              <LocationMatch navigation={navigation} />
              {/* <Aurora navigation={navigation} /> */}
              <Footer navigation={navigation} />
            </View>
            {this.getSettings()}
          </ScrollView>
          {statusVisible && (
            <View style={styles.contactInfo}>
              <View style={styles.contactInfoContainer}>
                <StateIcon
                  type='icon'
                  size={30}
                  status={this.state.currentState}
                />
                {getMainText(this.state.currentState, styles.contactInfoText)}
              </View>
            </View>
          )}
        </View>
        <DialogAdvice
          visible={showDialog}
          text={dialogMessage}
          onClose={this.handleUserNotification}
        />
      </SafeAreaView>
    );
  }
}

export default withTranslation()(HomeScreen);
