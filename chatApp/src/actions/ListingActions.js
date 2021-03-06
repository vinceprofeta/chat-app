import tree from '../state/StateTree';
import _ from 'lodash';
import * as api from '../api/listingsApi';

const listings = tree.select(['listings']);
const listingDetails = tree.select(['listingDetails']);
const listingAvailability = tree.select(['listingAvailability']);
const listingFilters = tree.select(['listingFilters']);

export function invalidateListingCache() {
  listings.set({stale: true})
}

export function setListingSkillFilter(skill) {
  listingFilters.set(['skill'], skill)
}

export async function setActiveListing(id) {
  listingDetails.set(['id'], id)
  listingDetails.set(['details'], {stale: true})
}

export async function resetActiveListing() {
  listingDetails.set({
    id: null,
    details: null
  })
}

export async function addService(service) {
  try {
    const addedService = await api.addService(JSON.stringify(service));
  } catch(err) {
    console.log(err)
  }
}


export async function addListingAvailability(days) {
  listingAvailability.set(['pannedDays'], days);
  tree.commit();
}


export async function favoriteListing(listingId) {
  try {
    const favoritedListing = await api.favoriteListing(listingId);
  } catch(err) {
    console.log(err)
  }
}