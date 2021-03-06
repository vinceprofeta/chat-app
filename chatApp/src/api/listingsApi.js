import bluebird from 'bluebird';
import xhr from '../utility/xhr';
import {BASE} from '../constants';

export async function addService(service) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/me/services/add`, {service}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}

export async function favoriteListing(listingId) {
  return new bluebird((resolve, reject) => {
    xhr('PUT', `${BASE}/me/calendars/favorites`, {calendar: listingId}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}

export async function removeListingfavorite(listingId) {
  return new bluebird((resolve, reject) => {
    xhr('DELETE', `${BASE}/me/calendars/favorites`, {calendar: listingId}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}