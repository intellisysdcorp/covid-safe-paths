import {
  EPIDEMIOLOGICAL_INFO_URL,
  MEPYD_C5I_API_URL,
  MEPYD_C5I_SERVICE,
  PASSWORD_CREDENTIAL,
  TOKEN_KEY,
  USERNAME_CREDENTIAL,
} from '../../constants/DR/baseUrls';
import { GetStoreData, SetStoreData } from '../../helpers/General';

const tokenUrl = `${MEPYD_C5I_SERVICE}/${MEPYD_C5I_API_URL}/Token`;

export async function getAuthToken() {
  try {
    const getAuth = await fetch(
      `${EPIDEMIOLOGICAL_INFO_URL}api/auth?username=${USERNAME_CREDENTIAL}&password=${PASSWORD_CREDENTIAL}`,
      { method: 'POST' },
    );
    const { token } = await getAuth.json();
    SetStoreData('DIGEPI_AUTH', token);
  } catch (error) {
    console.log('Invalid Token Authentication ', error);
  }
}

export default async function getToken(needNewToken = false) {
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
