import Suggestion from './components/suggestion';
import Search from './components/search';
import Modal from './components/modal';

import EventEmitter from 'events';

/**
 * @property {Object} optSuggestion
 */
const optSuggestion = {
  url         : 'http://private-047f-meliuztestefrontend.apiary-mock.com/artists',
  idField     : 'js-field',
  idContainer : 'js-suggestions',
  classItems  : 'js-suggestions-item',
  classButtons: 'js-suggestions-item'
};

/**
 * @property {Object} optSearch
 */
const optSearch = {
  idContainer   : 'js-results',
  classItems    : 'js-search-item',
  eventgetAlbums: 'suggestion-action'
};

/**
 * @property {Object} optModal
 */
const optModal = {
  idContainer   : 'js-modal',
  idContent     : 'js-modal-content',
  idClose       : 'js-modal-close',
  eventShowModal: 'search-action'
};

/**
 * Instances of classes
 */
const mediator    = new EventEmitter();
new Suggestion(mediator, optSuggestion);
new Search(mediator, optSearch);
new Modal(mediator, optModal);
