import { MEPID_URL_API } from '../../constants/DR/baseUrls';
import fetch from '../../helpers/Fetch';
import { getTokenMepid } from './getToken';

export async function getAllCases(date) {
  let savedToken = await getTokenMepid();

  const responseFunc = token =>
    fetch(`${MEPID_URL_API}/api/boletin/${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

  try {
    let response = await responseFunc(savedToken);

    if (response.data.error) {
      savedToken = await getTokenMepid(true);
      response = await responseFunc(savedToken);
    }

    return response.data;
  } catch (err) {
    return err.response.status;
  }
}
