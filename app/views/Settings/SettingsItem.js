import styled from '@emotion/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Typography } from '../../components/Typography';

/**
 * Render a single tappable settings item with optional description and icon.
 *
 * @param {{
 *   label: string,
 *   description?: string,
 *   onPress: (event: import('react-native').GestureResponderEvent) => void,
 *   last?: boolean,
 * }} param0
 */
export const SettingsItem = ({ label, onPress, description, icon, last }) => {
  const { i18n } = useTranslation();

  let getCurrentMarginDirection = () =>
    i18n.dir() === 'rtl' ? { marginLeft: 12 } : { marginRight: 12 };

  let getCurrentRowDirection = () =>
    i18n.dir() === 'rtl' ? 'row-reverse' : 'row';

  return (
    <>
      <Container
        style={{ flexDirection: `${getCurrentRowDirection()}`, margin: 3 }}
        onPress={onPress}>
        {icon && (
          <Icon
            name={icon.name}
            color={icon.color}
            style={styles.icons}
            size={icon.size}
          />
        )}
        <Label>
          <Typography use='body1'>{label}</Typography>
          {description && (
            <Typography
              use='body3'
              secondary
              style={{ marginTop: 5, fontSize: 17 }}>
              {description}
            </Typography>
          )}
        </Label>
      </Container>
    </>
  );
};

const Container = styled.TouchableOpacity`
  padding: 18px 0;
  align-items: center;
`;

const Label = styled.View`
  flex: 1;
  justify-content: center;
`;

const styles = StyleSheet.create({
  icons: {
    marginTop: 2.5,
    marginRight: 12,
  },
});
