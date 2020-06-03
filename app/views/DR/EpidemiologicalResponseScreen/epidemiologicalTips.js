import path from 'path';

import glob from 'glob';
import React from 'react';
import { View } from 'react-native';
import PDFView from 'react-native-pdf';

import Colors from '../../../constants/colors';

const tipsTree = [];
glob.sync('app/assets/pdfsTips/*/').forEach(filePath => {
  tipsTree.push(path.resolve(filePath));
});
console.log(tipsTree);
// const randomTips = () =>{

// }
const MentalHealthAdvices = () => {
  return (
    <View>
      <PDFView
        source={require('../../../assets/pdfsTips/')}
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
