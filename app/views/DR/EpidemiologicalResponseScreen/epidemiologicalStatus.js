import { Button, Text } from 'native-base';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Dialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from '../../../components/DR/Header/style';
import ToggleButtons from '../../../components/DR/ToggleButtons';
import Colors from '../../../constants/colors';

const EpidemiologicalStatus = ({ navigation }) => {
  //Change for a call to the goverment's epidemiology department API, to validate the status of the user
  //by the moment the response state is always waiting dor results.
  const valid = true;

  const [todaysFeeling, setTodaysFeeling] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const closeDialog = () => {
    setShowDialog(false);
    setTodaysFeeling('');
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Dialog
        visible={showDialog}
        dialogStyle={{ backgroundColor: Colors.WHITE }}>
        <View>
          <Button
            transparent
            onPress={() => closeDialog()}
            style={{ marginTop: -10 }}>
            <Icon name='times' size={25} color={Colors.GREEN} />
          </Button>
          <Text style={styles.textSemiBold}>¿Cómo te sientes hoy?</Text>
          <ToggleButtons
            btnStyle={{ width: '85%' }}
            options={['¡Me siento genial!', 'No me siento bien']}
            onSelection={selected => setTodaysFeeling(selected)}
            selectedOption={todaysFeeling}
          />
          <Button
            disabled={!todaysFeeling}
            style={[
              styles.buttons,
              {
                backgroundColor: !todaysFeeling
                  ? Colors.DARK_GREEN
                  : Colors.GREEN,
                width: '70%',
                marginTop: hp('3%'),
              },
            ]}
            onPress={() => {
              closeDialog();
              if (todaysFeeling === 'No me siento bien') {
                navigation.navigate('Report');
              }
            }}>
            <Text>Aceptar</Text>
          </Button>
        </View>
      </Dialog>
      <View style={styles.formContainer}>
        <Text style={styles.subtitles}>Alta Epidemiológica</Text>
        <View style={styles.bottomLine} />
        <Text>Estado:</Text>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '80%',
          }}>
          {valid ? (
            <View>
              <Image
                resizeMode='contain'
                style={{
                  height: 200,
                  width: 310,
                  alignSelf: 'center',
                  marginTop: 10,
                }}
                source={require('../../../assets/images/waitingResults.jpg')}
              />
              <Text
                style={[
                  styles.textSemiBold,
                  {
                    color: Colors.GOLD,
                    textAlign: 'center',
                    fontSize: wp('5%'),
                  },
                ]}>
                En espera de los resultados del laboratorio
              </Text>
            </View>
          ) : (
            <View>
              <Image
                resizeMode='contain'
                style={{
                  height: 230,
                  width: 310,
                  alignSelf: 'center',
                  marginTop: 10,
                }}
                source={require('../../../assets/images/covidFree.jpg')}
              />
              <Text
                style={[
                  styles.textSemiBold,
                  {
                    color: Colors.MEDIUM_GREEN,
                    textAlign: 'center',
                    fontSize: wp('5.5%'),
                    width: wp('70%'),
                  },
                ]}>
                ¡Felicidades, eres libre de COVID-19!
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          width: wp('100%'),
        }}>
        <Button
          style={[styles.buttons, { width: wp('70%') }]}
          onPress={() => setShowDialog(true)}>
          <Text>¿Cómo te sientes hoy?</Text>
        </Button>
      </View>
    </View>
  );
};

export default EpidemiologicalStatus;
