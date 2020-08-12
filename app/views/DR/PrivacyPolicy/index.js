import React from 'react';
import { useTranslation } from 'react-i18next';

import TermsViewer from '../../../components/DR/Policy&TermsViewer';
import es from '../../../locales/PrivicyPolicy/Privacy_Policy_ES.html';
import en from '../../../locales/PrivicyPolicy/Privacy_Policy.html';

const privacyFiles = { en, es };

export default function Index({ navigation }) {
  const { t } = useTranslation();
  return (
    <TermsViewer
      navigation={navigation}
      files={privacyFiles}
      title={t('label.privacy_policy')}
    />
  );
}
