import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Colors from '../../../constants/colors';

const textFontSize = wp('4%');

const styles = StyleSheet.create({
  actualSituationContainer: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonLayout: {
    display: 'flex',
    flexDirection: 'row',
    width: wp('100%'),
    justifyContent: 'flex-start',
    paddingTop: 10,
    marginLeft: -5,
  },
  contactInfo: {
    position: 'absolute',
    width: wp('93%'),
    height: wp('13%'),
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
    right: 15,
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.GRAY,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 5,
  },
  contactInfoContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginHorizontal: 25,
  },
  contactInfoText: {
    color: Colors.GRAY,
    fontSize: textFontSize,
    margin: wp('2%'),
    fontWeight: '500',
  },
  dataText: {
    fontWeight: 'bold',
    color: Colors.PINK,
    fontSize: wp('8%'),
  },
  HeaderView: {
    height: hp('12%'),
    justifyContent: 'flex-end',
    paddingRight: wp('2%'),
    paddingLeft: wp('2%'),
    backgroundColor: Colors.BLUE_RIBBON,
  },
  headerText: {
    width: '100%',
    fontSize: textFontSize + 10,
    color: Colors.WHITE,
    marginBottom: hp('1.5%'),
    marginHorizontal: wp('5%'),
  },
  infoCards: {
    alignItems: 'center',
    borderRadius: 6,
    height: wp('35%'),
    justifyContent: 'center',
    width: wp('44%'),
  },
  marginAndAlign: { alignItems: 'center', marginHorizontal: wp('4%') },
  mainHeader: {
    backgroundColor: Colors.BLUE_RIBBON,
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 13,
    paddingTop: 10,
    marginBottom: '-5%',
    height: hp('16%'),
    width: wp('100%'),
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '2%',
    marginHorizontal: wp('5%'),
  },
  scrollContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
  },
  subtitles: {
    alignSelf: 'flex-start',
  },
  text: {
    color: '#000',
    fontSize: textFontSize - 2,
  },
  textHeader: {
    fontSize: textFontSize + 2,
  },
  settingsContainer: {
    position: 'absolute',
    top: 25,
    marginTop: '5%',
    marginRight: '7%',
    alignSelf: 'flex-end',
  },
  dateSubtitle: {
    color: '#808080',
  },
  shadowBorder: {
    color: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendar: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: wp('35%'),
    borderRadius: 10,
    borderColor: Colors.BLUE_RIBBON,
    borderWidth: 0.7,
    marginTop: 5,
    marginBottom: 5,
    shadowRadius: 3.84,
    elevation: 6.5,
  },
});

export default styles;
