import React, { useState } from 'react';
import { NativeModules, Platform, StatusBar, View } from 'react-native';
const { StatusBarManager } = NativeModules;

const Statusbar = ({ backgroundColor, ...props }) => {
  const [HEIGHT, setHeight] = useState(0);
  if (Platform.OS === 'ios') {
    StatusBarManager.getHeight(statusBarHeight => {
      console.log(statusBarHeight.height);
      setHeight(statusBarHeight.height);
    });
  } else {
    setHeight(StatusBarManager.HEIGHT);
  }
  console.log(HEIGHT, 'HE');
  return (
    <View style={[{ height: HEIGHT }, { backgroundColor }]}>
      <StatusBar traslucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

export default Statusbar;
