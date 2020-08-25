import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import imgAdvertisement from '../../../assets/images/recommendations.jpg';
import HeaderImage from '../../../components/DR/HeaderImage';
import List from '../../../components/DR/List';
import Colors from '../../../constants/colors-dr';
import { FIREBASE_SERVICE } from '../../../constants/DR/baseUrls';
import fetch from '../../../helpers/Fetch';
import languages from '../../../locales/languages';

const ADVICE_URL = `${FIREBASE_SERVICE}/advices`;
export default function Advices({ navigation }) {
  const [pdfAdvices, setPdfAdvices] = useState([]);
  const [imgAdvices, setImgAdvices] = useState([]);

  const addImgToAdvice = recommendationList =>
    recommendationList.map(item => ({
      ...item,
      icon: { iconName: 'comment-medical', color: Colors.PINK },
    }));

  const divideAdviceList = (extensionType, adviceList, setState) => {
    const adviceDivided = adviceList.filter(
      advice => advice.url.search(extensionType) > 1,
    );
    setState(adviceDivided);
  };

  useEffect(() => {
    fetch(ADVICE_URL)
      .then(({ data }) => {
        const adviceData = addImgToAdvice(data);
        divideAdviceList('.pdf', adviceData, setPdfAdvices);
        divideAdviceList('.jpg', adviceData, setImgAdvices);
      })
      .catch(() => {
        setPdfAdvices([]);
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
          data={pdfAdvices}
          titleLinesNum={2}
          navigation={navigation}
          switchScreenTo='PDFView'
          isSponsorsScreen={false}
          isNewsScreen={false}
        />
        <List
          data={imgAdvices}
          titleLinesNum={2}
          navigation={navigation}
          switchScreenTo='WebView'
          isSponsorsScreen={false}
          isNewsScreen={false}
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
