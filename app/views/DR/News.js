import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import imgNews from '../../assets/images/news.jpg';
import Button from '../../components/Button';
import HeaderImage from '../../components/DR/HeaderImage';
import DataList from '../../components/DR/List';
import NavigationBarWrapper from '../../components/NavigationBarWrapper';
import fetch from '../../helpers/Fetch';
import sourceStructure from '../../helpers/imagesSource';
import languages from '../../locales/languages';

const NEWS_URL = 'https://covid-dr.appspot.com/news';

export default function NewsScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotLastPage, setIsNotLastPage] = useState(true);

  const backToMain = () => {
    navigation.goBack();
  };

  const handleBackPress = () => {
    backToMain();
    return true;
  };

  const onPress = () => {
    const { order } = news[news.length - 1] || {};
    if (!order) {
      setIsNotLastPage(false);
      return;
    }
    setIsLoading(true);
    fetch(`${NEWS_URL}?endAt=${order - 10}`)
      .then(({ data }) => {
        const newsSource = sourceStructure(data);
        setNews(news.concat(newsSource));
        setIsLoading(false);
      })
      .catch(() => {
        setNews([]);
      });
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    fetch(NEWS_URL)
      .then(({ data }) => {
        const news = sourceStructure(data);
        setNews(news);
      })
      .catch(() => {
        setNews([]);
      });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
    <NavigationBarWrapper
      title={languages.t('label.latest_news')}
      onBackPress={backToMain.bind(this)}>
      <View style={styles.container}>
        <HeaderImage imgUrl={imgNews} title={languages.t('label.news_title')} />
        <ScrollView>
          <HeaderImage imgUrl={imgNews} title='Noticias' />
          <DataList
            data={news}
            navigation={navigation}
            switchScreenTo='WebView'
          />
          <View style={styles.containerPagination}>
            {isNotLastPage && isLoading ? (
              <ActivityIndicator size='large' />
            ) : (
              <Button
                onPress={onPress}
                title={languages.t('label.launch_next')}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </NavigationBarWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerPagination: {
    alignItems: 'center',
    padding: 20,
  },
});
