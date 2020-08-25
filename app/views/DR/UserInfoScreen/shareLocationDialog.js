import { Button, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dialog } from 'react-native-simple-dialogs';

import styles from '../../../components/DR/Header/style';
import Colors from '../../../constants/colors';
import { RemoveStoreData, SetStoreData } from '../../../helpers/General';

export default function ShareLocationDialog({
  visible,
  useType,
  setVisible,
  t,
}) {
  return (
    <Dialog
      visible={visible && useType === 'mySelf'}
      dialogStyle={{ backgroundColor: Colors.WHITE }}>
      <View>
        <Text style={styles.textSemiBold}>
          {t('positives.share_location_data_title')}
        </Text>
        <Text style={styles.text}>
          {t('positives.share_location_data_subtitle')}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            style={[
              styles.buttons,
              {
                borderWidth: 1.5,
                borderColor: Colors.RED_BUTTON,
                backgroundColor: Colors.WHITE,
                width: '40%',
                marginTop: hp('3%'),
              },
            ]}
            onPress={() => {
              setTimeout(async () => {
                await RemoveStoreData('shareLocation');
                setVisible(false);
              }, 500);
            }}>
            <Text style={[styles.text, { color: Colors.RED_BUTTON }]}>
              {t('report.no')}
            </Text>
          </Button>
          <Button
            style={[
              styles.buttons,
              {
                borderWidth: 1.5,
                borderColor: Colors.GREEN,
                backgroundColor: Colors.WHITE,
                width: '40%',
                marginTop: hp('3%'),
              },
            ]}
            onPress={() => {
              setTimeout(() => {
                SetStoreData('shareLocation', 'yes');
                setVisible(false);
              }, 900);
            }}>
            <Text style={[styles.textSemiBold, { color: Colors.GREEN }]}>
              {t('report.yes')}
            </Text>
          </Button>
        </View>
      </View>
    </Dialog>
  );
}
