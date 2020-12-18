import Axios from 'axios';

// import { COV_CASES_SERVICE } from '../../constants/DR/baseUrls';
import { getTokenMepid } from './getToken';
// import fetch from '../../helpers/Fetch';

export async function getAllCases(date) {
  let savedToken = await getTokenMepid();
  const mepidUrl = 'https://covidrdapi.msp.gob.do:8443';

  const responseFunc = token =>
    Axios.get(`${mepidUrl}/api/boletin/${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

  // console.log("*****%*%&%^&$ ACAAA ", date)

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
