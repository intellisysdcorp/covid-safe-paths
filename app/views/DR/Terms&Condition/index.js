import React from 'react';
import { useTranslation } from 'react-i18next';

import TermsViewer from '../../../components/DR/Policy&TermsViewer';
import en from '../../../locales/eula/en.html';
import es from '../../../locales/eula/es.html';

const eulaFiles = { en, es };
export default function Index({ navigation }) {
  const { t } = useTranslation();
  return (
    <TermsViewer
      navigation={navigation}
      files={eulaFiles}
      title={t('label.terms_and_conditions')}
    />
  );
}
