import { Button } from 'native-base';
import React from 'react';
import { Text, View } from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../constants/colors';
import styles from './Header/style';

// eslint-disable-next-line
export default function ToggleButtons({
  options,
  selectedOption,
  onSelection,
  btnStyle,
}) {
  function renderOption(option, selected, onSelect, index) {
    const buttonStyle = {
      backgroundColor: selected ? '#D8EAFE' : Colors.LIGHT_BLUE,
      borderColor: selected ? Colors.BLUE_RIBBON : Colors.LIGHT_BLUE,
      borderWidth: 2,
    };
    const textStyle = {
      padding: 4,
      color: selected ? Colors.BLUE_RIBBON : Colors.BUTTON_LIGHT_TEXT,
    };

    return (
      <Button
        transparent
        onPress={onSelect}
        key={index}
        style={[styles.rectButtons, buttonStyle, btnStyle]}>
        {selected ? (
          <Icon
            name='check-circle'
            color={Colors.BLUE_RIBBON}
            size={15}
            style={{
              backgroundColor: Colors.WHITE,
              position: 'absolute',
              right: -7,
              top: -7,
            }}
          />
        ) : null}
        <Text style={textStyle}>{option}</Text>
      </Button>
    );
  }

  const renderContainer = optionNodes => (
    <View style={[styles.radioButtonLayout, { flexWrap: 'wrap' }]}>
      {optionNodes}
    </View>
  );

  return (
    <RadioButtons
      options={options}
      onSelection={onSelection}
      selectedOption={selectedOption}
      renderOption={renderOption}
      renderContainer={renderContainer}
    />
  );
}
