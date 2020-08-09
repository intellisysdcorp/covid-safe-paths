import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import imgAdvertisement from '../../../assets/images/recommendations.jpg';
import HeaderImage from '../../../components/DR/HeaderImage';
import List from '../../../components/DR/List';
import Colors from '../../../constants/colors-dr';
import { FIREBASE_SERVICE } from '../../../constants/DR/baseUrls';
import languages from '../../../locales/languages';

const ADVICE_URL = `${FIREBASE_SERVICE}/advices`;
export default function Advices({ navigation }) {
  const [advices, setAdvices] = useState([]);

  const addImgToAdvice = recommendationList =>
    recommendationList.map(item => ({
      ...item,
      icon: { iconName: 'comment-medical', color: Colors.PINK },
    }));

  useEffect(() => {
    fetch(ADVICE_URL)
      .then(({ data }) => {
        const bulletinsData = addImgToAdvice(data);
        setAdvices(bulletinsData);
      })
      .catch(() => {
        setAdvices([]);
      });
  }, []);

  return (
    <View style={styles.container}>
      <HeaderImage
        imgUrl={imgAdvertisement}
        title={languages.t('label.advice_title')}
      />
      <ScrollView>
        <List
          data={advices}
          titleLinesNum={2}
          navigation={navigation}
          switchScreenTo='PDFView'
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
