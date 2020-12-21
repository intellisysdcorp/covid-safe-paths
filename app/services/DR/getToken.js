import {
  MEPID_PASSWORD,
  MEPID_URL_API,
  MEPID_USERNAME,
  MEPYD_C5I_API_URL,
  MEPYD_C5I_SERVICE,
  TOKEN_KEY,
} from '../../constants/DR/baseUrls';
import { GetStoreData, SetStoreData } from '../../helpers/General';

const tokenUrl = `${MEPYD_C5I_SERVICE}/${MEPYD_C5I_API_URL}/Token`;

export async function getTokenGov(needNewToken = false) {
  const savedToken = await GetStoreData('GOV_DO_TOKEN', true);

  if (savedToken && !needNewToken) {
    return savedToken;
  } else {
    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        body: JSON.stringify({
          key: TOKEN_KEY,
        }),
      });
      const tokenData = await response.json();

      SetStoreData('GOV_DO_TOKEN', tokenData.token);

      return tokenData.token;
    } catch (e) {
      console.log('Ha ocurrido un error', e);
    }
  }
}

export async function getTokenMepid(needNewToken = false) {
  const savedToken = await GetStoreData('MEPID_API_TOKEN', true);

  if (savedToken && !needNewToken) {
    return savedToken;
  } else {
    try {
      const response = await fetch(
        `${MEPID_URL_API}/api/auth?username=${MEPID_USERNAME}&password=${MEPID_PASSWORD}`,
        { method: 'POST' },
      );
      const { token } = await response.json();

      SetStoreData('MEPID_API_TOKEN', token);

      return token;
    } catch (e) {
      console.log('Ha ocurrido un error', e);
    }
  }
}
