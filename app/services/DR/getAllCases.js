import { COV_CASES_SERVICE } from '../../constants/DR/baseUrls';
import fetch from '../../helpers/Fetch';

export function getAllCases(date) {
  return fetch(`${COV_CASES_SERVICE}${date ? `?date=${date}` : '/'}`)
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      return err.response.status;
    });
}
