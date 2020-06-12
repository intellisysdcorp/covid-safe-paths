import { Card } from 'native-base';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { sponsorsList } from './List';

function CreateCard(img, url, navigate) {
  // Necesita estilos
  // onPress={navigate('Details', {
  //   source: { uri: url },
  // })}
  return (
    <TouchableOpacity>
      <Card style={styles.imageContainer}>
        <Image source={img} style={styles.images} />
      </Card>
    </TouchableOpacity>
  );
}

export default function index({ navigation: { navigate } }) {
  const createAllCard = () => {
    const allCards = [];
    for (let sponsor in sponsorsList) {
      const { img, url } = sponsorsList[sponsor];
      allCards.push(CreateCard(img, url, navigate));
    }

    return allCards;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cardsContainer}>{createAllCard()}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
