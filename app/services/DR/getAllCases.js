import { COV_CASES_SERVICE } from '../../constants/DR/baseUrls';
import { AUTHORITY_CASES } from '../../constants/storage';
import fetch from '../../helpers/Fetch';
import { GetStoreData, SetStoreData } from '../../helpers/General';

export function getAllCases(date) {
  const dataSaved = GetStoreData(AUTHORITY_CASES, false);
  return fetch(`${COV_CASES_SERVICE}${date ? `?date=${date}` : '/'}`)
    .then(({ data }) => {
      SetStoreData(AUTHORITY_CASES, data);
      return data;
    })
    .catch(err => {
      return err.response.status;
    });
}
