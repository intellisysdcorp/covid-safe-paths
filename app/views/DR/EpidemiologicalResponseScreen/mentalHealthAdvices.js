import React from 'react';
import { View } from 'react-native';
import PDFView from 'react-native-pdf';

import Colors from '../../../constants/colors';

const MentalHealthAdvices = () => {
  return (
    <View>
      <PDFView
        source={require('../../../assets/pdfs/advice10.pdf')}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Colors.WHITE,
        }}
      />
    </View>
  );
};

export default MentalHealthAdvices;
