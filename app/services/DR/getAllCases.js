import moment from 'moment';

import { MEPID_URL_API } from '../../constants/DR/baseUrls';
import fetch from '../../helpers/Fetch';
import { getTokenMepid } from './getToken';

export async function getAllCases(date) {
  let savedToken = await getTokenMepid();

  const responseFunc = (date, token) =>
    fetch(`${MEPID_URL_API}/api/boletin/${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

  try {
    let response = await responseFunc(date, savedToken);

    if (response.data.error) {
      savedToken = await getTokenMepid(true);
      response = await responseFunc(date, savedToken);
    }

    if (!response.data[0].casos_acumulados) {
      const dateBefore = moment(date)
        .subtract(1, 'day')
        .format('YYYY-MM-DD');
      response = await responseFunc(dateBefore, savedToken);
    }

    return response.data;
  } catch (err) {
    return err.response.status;
  }
}
