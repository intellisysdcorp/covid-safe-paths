import { Button, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Dimensions, View } from 'react-native';
import PDFView from 'react-native-pdf';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dialog } from 'react-native-simple-dialogs';
import { WebView } from 'react-native-webview';

import DialogStyle from '../../../components/DR/Header/style';
import NavigationBarWrapper from '../../../components/NavigationBarWrapper';
import Colors from '../../../constants/colors';

// This is to make the images responsive in the page of a new
const fixerImage = `
  var imgs = document.images;
  for(var i=0; i < imgs.length; i+=1 ) {
    imgs[i].style.width = "100%";
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
  const [timer, setNewTimer] = useState(null);
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
      <Dialog
        visible={showDialog}
        dialogStyle={{ backgroundColor: Colors.WHITE }}>
        <View>
          <Text style={DialogStyle.textSemiBold}>{dialogText}</Text>
          <Button
            style={[
              DialogStyle.buttons,
              {
                backgroundColor: Colors.GREEN,
                width: '70%',
                marginTop: hp('3%'),
              },
            ]}
            onPress={() => {
              closeDialog();
            }}>
            <Text style={[DialogStyle.text, { color: Colors.WHITE }]}>
              {t('label.accept')}
            </Text>
          </Button>
        </View>
      </Dialog>
      {switchScreenTo === 'PDFView' && (
        <PDFView
          source={source}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            backgroundColor: 'white',
          }}
        />
      )}
      {switchScreenTo === 'WebView' && (
        <WebView
          source={source}
          startInLoadingState
          injectedJavaScript={fixerImage}
          onLoadStart={() => {
            setNewTimer(
              setTimeout(() => {
                setDialogText(t('label.dialog_interval_advice'));
                setShowDialog(true);
              }, 10000),
            );
          }}
          onLoadEnd={() => {
            clearTimeout(timer);
          }}
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
