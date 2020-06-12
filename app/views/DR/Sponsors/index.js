import { Card } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import NavigationBarWrapper from '../../../components/NavigationBarWrapper';
import { sponsorsList } from './List';

function CreateCard(img, url, navigate) {
  // Necesita estilos
  // onPress={navigate('Details', {
  //   source: { uri: url },
  // })}
  return (
    <TouchableOpacity
      onPress={() => navigate('Details', { source: { uri: url } })}>
      <Card style={styles.imageContainer}>
        <Image source={img} style={styles.images} />
      </Card>
    </TouchableOpacity>
  );
}

export default function index({ navigation: { navigate, goBack } }) {
  const { t } = useTranslation();

  const createAllCard = () => {
    const allCards = [];
    for (let sponsor in sponsorsList) {
      const { img, url } = sponsorsList[sponsor];
      allCards.push(CreateCard(img, url, navigate));
    }

    return allCards;
  };

  return (
    <NavigationBarWrapper
      title={t('label.sponsors')}
      onBackPress={() => goBack()}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.cardsContainer}>{createAllCard()}</View>
        </ScrollView>
      </View>
    </NavigationBarWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
  },
  images: {
    flex: 1,
    margin: 10,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  imageContainer: {
    borderRadius: 6,
    height: wp('35%'),
    width: wp('44%'),
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
