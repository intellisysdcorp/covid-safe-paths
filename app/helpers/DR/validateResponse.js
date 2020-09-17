import axios from 'axios';
import { Alert } from 'react-native';

import { FIREBASE_SERVICE } from '../../constants/DR/baseUrls';
import getToken from '../../services/DR/getToken';

export async function validateCertificate(
  t,
  url,
  request,
  method = '',
  body = {},
) {
  const domainUrl = url.slice(8, url.indexOf('/', 9)).trim();
  const VALIDATE_CERTIFICATE_URL = `${FIREBASE_SERVICE}/validate/ssl-certificate`;

  const data = await axios.post(VALIDATE_CERTIFICATE_URL, { domainUrl });

  if (data.status === 200) {
    return new Promise(resolve =>
      Alert.alert(t('label.attention'), t('label.attentionMessage'), [
        {
          text: t('report.no'),
          style: 'cancel',
          onPress: () => resolve(false),
        },
        {
          text: t('report.yes'),
          onPress: () =>
            resolve(request ? validateResponse(url, method, body) : true),
        },
      ]),
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
