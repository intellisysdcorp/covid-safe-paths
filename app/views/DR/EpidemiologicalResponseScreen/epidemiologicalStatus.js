import { Button, Text } from 'native-base';
import React from 'react';
import { Image, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import styles from '../../../components/DR/Header/style';
import Colors from '../../../constants/colors';

const EpidemiologicalStatus = () => {
  const valid = false;
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
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
        <Button style={[styles.buttons, { width: wp('70%') }]}>
          <Text>¿Cómo te sientes hoy?</Text>
        </Button>
      </View>
    </View>
  );
};

export default EpidemiologicalStatus;
