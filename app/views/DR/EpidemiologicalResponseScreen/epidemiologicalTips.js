import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import PDFView from 'react-native-pdf';

import Colors from '../../../constants/colors';
import { GetStoreData, SetStoreData } from '../../../helpers/General';

class MentalHealthAdvices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      tip: '',
    };
  }

  getData = async () => {
    try {
      const storageData = await GetStoreData('epidemiologicalTips');

      return storageData
        ? JSON.parse(storageData)
        : { date: undefined, tip: 0 };
    } catch (err) {
      console.error(err);
    }
  };

  saveData = async (newDate, newTip) => {
    try {
      await SetStoreData('epidemiologicalTips', {
        date: newDate,
        tip: newTip,
      });
    } catch (err) {
      console.error(err);
    }
  };

  isNewDate = dateStorage => {
    // Aqui va a haber una condicion para saber si es el mismo dia o no
    if (!dateStorage) {
      dateStorage = new Date('2000/01/01');

      dateStorage =
        dateStorage.getFullYear() +
        '/' +
        (dateStorage.getMonth() + 1) + // year/month/day
        '/' +
        dateStorage.getDate();
    }

    let dateNow = new Date();
    dateNow =
      dateNow.getFullYear() +
      '/' +
      (dateNow.getMonth() + 1) + // year/month/day
      '/' +
      dateNow.getDate();

    return dateNow != dateStorage ? dateNow : false;
  };

  defineTip = (oldTip, maxTips) => {
    // Tip con contador

    const newTip = oldTip + 1;

    return newTip >= maxTips ? 1 : newTip;
  };

  async componentDidMount() {
    const { date: storageDate, tip: storageTip } = await this.getData();
    const isNewDate = this.isNewDate(storageDate);

    if (isNewDate) {
      const newTip = this.defineTip(storageTip, 14);
      await this.saveData(isNewDate, newTip);
      this.setState({ date: isNewDate, tip: newTip });
    } else {
      this.setState({ date: storageDate, tip: storageTip });
    }
  }

  render() {
    const {
      state: { tip },
    } = this;

    const source =
      Platform.OS === 'ios'
        ? require(`../../../assets/pdfsTips/SM_${tip}.pdf`)
        : { uri: `bundle-assets://path/to/SM_${tip}.pdf` }; // Aqui pones los pdfs en android/app/src/main/assets/path/to/xxx.pdf

    return (
      <View>
        <PDFView
          source={source}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: Colors.WHITE,
          }}
        />
      </View>
    );
  }
}

export default MentalHealthAdvices;
