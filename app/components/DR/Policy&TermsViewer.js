import React, { useEffect, useState } from 'react';
import { getI18n } from 'react-i18next';
import { Linking, View } from 'react-native';
import loadLocalResource from 'react-native-local-resource';
import WebView from 'react-native-webview';

import NavigationBarWrapper from '../NavigationBarWrapper';

const DEFAULT_PRIVACY_URL = 'about:blank';
export default function Policy_And_Terms_Viewer({ navigation, files, title }) {
  const [html, setHtml] = useState();

  const backToMain = () => {
    navigation.goBack();
  };

  const shouldStartLoadWithRequestHandler = webViewState => {
    let shouldLoadRequest = true;
    if (webViewState.url !== DEFAULT_PRIVACY_URL) {
      // If the webpage to load isn't the EULA, load it in a separate browser
      Linking.openURL(webViewState.url);
      // Don't load the page if its being handled in a separate browser
      shouldLoadRequest = false;
    }
    return shouldLoadRequest;
  };

  useEffect(() => {
    (async () => {
      const appLocale = getI18n().language;

      const path = files[appLocale] || files.en;
      setHtml(await loadLocalResource(path));
    })();
  });
  return (
    <NavigationBarWrapper title={title} onBackPress={backToMain.bind(this)}>
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <WebView
          source={{ html }}
          style={{ flex: 1 }}
          onShouldStartLoadWithRequest={shouldStartLoadWithRequestHandler}
        />
      </View>
    </NavigationBarWrapper>
  );
}
