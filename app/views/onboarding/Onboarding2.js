import { Button, Text } from 'native-base';
import React from 'react';
import { withTranslation } from 'react-i18next';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import BackgroundImage from './../../assets/images/launchScreen2.png';
import { Type, Typography } from '../../components/Typography';
import Colors from '../../constants/colors';
import buttonStyle from '../../constants/DR/buttonStyles';
import fontFamily from '../../constants/fonts';
import { sharedStyles } from './styles';

const width = Dimensions.get('window').width;

const Onboarding = props => {
  const { t } = props;
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <ImageBackground
        source={BackgroundImage}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        <Typography style={styles.headerText} use={Type.Headline2}>
          {t('label.launch_screen2_header')}
        </Typography>
        <Typography style={styles.subheaderText}>
          {t('label.launch_screen2_subheader')}
        </Typography>
      </View>
      <View style={sharedStyles.footerContainer}>
        <Button
          onPress={() => {
            props.navigation.replace('Onboarding4');
          }}
          style={{ ...buttonStyle.buttonStyle, height: hp('7%') }}>
          <Text style={buttonStyle.buttonText}>{t('label.launch_next')}</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    top: '-10%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.INTRO_WHITE_BG,
  },
  contentContainer: {
    width: width * 0.9,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerText: {
    color: Colors.BLUE_RIBBON,
    width: width * 0.8,
  },
  subheaderText: {
    marginTop: '6%',
    color: Colors.BLUE_RIBBON,
    fontSize: 15,
    width: width * 0.8,
    fontFamily: fontFamily.primaryRegular,
  },
});

export default withTranslation()(Onboarding);
