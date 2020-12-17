import { Button, Text } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Share from 'react-native-share';

import NavigationBarWrapper from '../../../components/NavigationBarWrapper';
import buttonStyle from '../../../constants/DR/buttonStyles';

export default function QRview({ navigation }) {
  const { t } = useTranslation();
  const shopUrl =
    Platform.OS === 'ios'
      ? 'https://apps.apple.com/do/app/covid-rd/id1506071684?l=en'
      : 'https://play.google.com/store/apps/details?id=com.optic.covdr';
  const backToMain = () => {
    navigation.goBack();
  };

  const openShareScreen = () => {
    const shareOptions = {
      type: 'text',
      title: '',
      url: shopUrl,
    };

    Share.open(shareOptions)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };

  return (
    <NavigationBarWrapper
      title={t('label.share_app')}
      onBackPress={backToMain.bind(this)}>
      <View
        style={{
          top: 80,
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 18, marginBottom: 20, textAlign: 'center' }}>
          {t('share.scanOrShare')}
        </Text>
        <QRCode value={shopUrl} size={200} />
        <Button
          onPress={openShareScreen}
          style={{ ...buttonStyle.buttonStyle, marginLeft: 0, marginTop: 100 }}>
          <Text style={{ fontSize: wp('4%') }}>{t('label.share')}</Text>
        </Button>
      </View>
    </NavigationBarWrapper>
  );
}
