import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Dimensions } from 'react-native';
import PDFView from 'react-native-pdf';
import { WebView } from 'react-native-webview';

import activityIndicatorLoadingView from '../../../components/DR/ActivityIndicator';
import NavigationBarWrapper from '../../../components/NavigationBarWrapper';
import Colors from '../../../constants/colors';
import DialogAdvices from '../../DialogAdvices';

// This is to make the images responsive in the page of a new
const fixerImage = `
  const auroraChat = document.getElementsByTagName("iframe");

  for(var indx=0; indx < auroraChat.length; indx+=1 ) {
    auroraChat[indx].style.display = "none";
  }

  var imgs = document.images;

  for(var indx=0; indx < imgs.length; indx+=1 ) {
    imgs[indx].style.width = "100%";
  }
`;

const Details = ({
  navigation,
  route: {
    params: { source, switchScreenTo = 'WebView' },
  },
}) => {
  navigation.setOptions({ headerShown: false });

  const { t } = useTranslation();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const closeDialog = () => {
    setShowDialog(false);
  };

  const backToMain = () => {
    navigation.goBack();
  };

  const handleBackPress = () => {
    backToMain();
    return true;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      unsubscribe;
    };
  }, [navigation]);

  return (
    <NavigationBarWrapper title='Atrás' onBackPress={backToMain.bind(this)}>
      <DialogAdvices
        visible={showDialog}
        text={dialogText}
        close={closeDialog}
      />
      {switchScreenTo === 'PDFView' && (
        <PDFView
          source={source}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            backgroundColor: Colors.WHITE,
          }}
          activityIndicator={activityIndicatorLoadingView(true)}
        />
      )}
      {switchScreenTo === 'WebView' && (
        <WebView
          source={source}
          startInLoadingState
          injectedJavaScript={fixerImage}
          renderLoading={() => activityIndicatorLoadingView()}
          onError={() => {
            setDialogText(t('label.dialog_error_advice'));
            setShowDialog(true);
          }}
        />
      )}
    </NavigationBarWrapper>
  );
};

export default Details;
