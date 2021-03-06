import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (query) => {
    return `${BASE}/search?search=${query}`;
  },
  successTransformer: (data, current) => {
    return {
      items: data.body
    }
  }
});

export default function SearchFacet() {
  return Baobab.monkey({
    cursors: {
      sessionSearch: ['sessionSearch']
    },
    get(data) {
      if (data.sessionSearch.query) {
        let request;
        
        if (data.sessionSearch.results && data.sessionSearch.results.stale) {
          loader.invalidateCache();
        }

        if (!loader.cursor) {
          loader.setCursor(this.select(['sessionSearch', 'results']));
        }
        request = _.clone(loader.fetch(data.sessionSearch.query));
        console.log(request)
        return request;
      } else {
        return;
      }
    }
  });
};

