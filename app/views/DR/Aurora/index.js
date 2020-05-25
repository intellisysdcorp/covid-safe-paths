import { Text } from 'native-base';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { WebView } from 'react-native-webview';

export default function AuroraScreen({ navigation }) {
  let webViewRef;
  const form = 'https://aurorasalud.org.do/chat/';

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      webViewRef && webViewRef.reload();
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <TouchableOpacity
          style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}
          onPress={() => navigation.goBack()}>
          <Icon color='#3389ff' size={wp('4%') + 4} name='chevron-left' />
          <Text
            style={{
              color: '#3389ff',
              fontSize: wp('4%') + 3,
            }}>
            Atrás
          </Text>
        </TouchableOpacity>
      </View>
      <WebView
        ref={ref => (webViewRef = ref)}
        source={{
          uri: form,
        }}
        onResponderReject={res => console.log(res)}
      />
    </View>
  );
}
