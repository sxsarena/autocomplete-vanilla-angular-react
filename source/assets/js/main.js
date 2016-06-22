import Suggestion from './components/suggestion';
import Search from './components/search';
import Modal from './components/modal';

import EventEmitter from 'events';

// Objects with settings for classes
const optSuggestion = {
  url         : 'http://private-047f-meliuztestefrontend.apiary-mock.com/artists',
  idField     : 'js-field',
  idContainer : 'js-suggestions',
  classItems  : 'js-suggestions-item',
  classButtons: 'js-suggestions-item'
}

const optSearch = {
  idContainer   : 'js-results',
  classItems    : 'js-search-item',
  eventgetAlbums: 'suggestion-action'
}

const optModal = {
  idContainer   : 'js-modal',
  idContent     : 'js-modal-content',
  idClose       : 'js-modal-close',
  eventShowModal: 'search-action'
}

// Instances of classes
const mediator    = new EventEmitter();
const suggestion  = new Suggestion(mediator, optSuggestion);
const search      = new Search(mediator, optSearch);
const modal       = new Modal(mediator, optModal);
