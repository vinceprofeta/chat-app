import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import parseDate from '../../utility/parseDate';
import Baobab from 'baobab';
import moment from 'moment';

const loader = new RESTLoader({
  getResourceUrl: (queryParams = {}) => {
    // TODO date.now needs to time zone event takes place in
    return `${BASE}/me/bookings/needs-complete?date=${moment.utc().format()}`;
  },
  successTransformer: (data, current) => {
    return data.body
  }
});

export default function BookingsThatNeedCompletionFacet() {
  return Baobab.monkey({
    cursors: {
      bookings: ['bookingsThatNeedCompletion'],
      authentication: ['authentication', 'sessionData']
    },
    get(data) {
      if (data.authentication) {
        let request;
        if (data.bookings && data.bookings.stale) {
          loader.invalidateCache();
        }

        if (!loader.cursor) {
          loader.setCursor(this.select(['bookingsThatNeedCompletion']));
        }
        request = _.clone(loader.fetch());
        return request;
      }
    }
  });
};

