import axios from 'axios';
import i18next from 'i18next';
import { Alert } from 'react-native';

import { FIREBASE_SERVICE } from '../../constants/DR/baseUrls';
import getToken from '../../services/DR/getToken';

export async function validateCertificate(url, method = '', body) {
  const domainUrl = url.slice(8, url.indexOf('/', 9)).trim();
  const VALIDATE_CERTIFICATE_URL = `${FIREBASE_SERVICE}/validate/ssl-certificate`;

  const data = await axios.post(VALIDATE_CERTIFICATE_URL, { domainUrl });

  if (data.status !== 200) {
    return new Promise(resolve =>
      Alert.alert(
        i18next.t('label.attention'),
        i18next.t('label.attentionMessage'),
        [
          {
            text: i18next.t('report.no'),
            style: 'cancel',
            onPress: () => resolve(false),
          },
          {
            text: i18next.t('report.yes'),
            onPress: () =>
              resolve(
                method.length > 0 ? validateResponse(url, method, body) : true,
              ),
          },
        ],
      ),
    );
  }
}

export async function validateResponse(url, method, body) {
  const responseFunc = (body, token) => {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        gov_do_token: token,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  };

  const token = await getToken();

  try {
    let response = await responseFunc(body, token);

    if (response.status !== 200) {
      console.log('TOKEN NOT WORKING???');
      // CODE 401 TOKEN NOT VALID
      const newToken = await getToken(true);

      response = await responseFunc(body, newToken);
    }

    return await response.json();
  } catch (e) {
    console.log('[ERROR]', e);
  }
}
