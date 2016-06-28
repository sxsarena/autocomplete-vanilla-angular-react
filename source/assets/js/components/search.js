import MakeRequest from '../utils/request';

/**
 * Search class.
 */
export default class Search {

  /**
   * create instance.
   * @param {EventEmitter} mediator - instance of class.
   * @param {Object} options - settings for the class.
   * @property {Object} me
   * @property {EventEmitter} mediator
   * @property {Object} options
   * @property {string} name
   * @property {array} results
   * @property {number} maxItems
   */
  constructor(mediator, options) {
    const me        = this;
    this.mediator   = mediator;
    this.options    = options;
    this.name       = '';
    this.maxItems   = 5;
    this.classHide  = 'hide';
    this.results;

    this.mediator.on(this.options.eventgetAlbums, (id, name) => {
      me.name = name;
      me.getAlbums(id);
    });
  }

  /**
   * Makes a request discography
   * @param {number} id - artist identification
   * @property {Object} me
   * @property {string} url
   */
  getAlbums(id){
    const me = this;
    let url = 'http://private-047f-meliuztestefrontend.apiary-mock.com/artists/'+id+'/discography';

    MakeRequest(url, (data) => {
      me.getResults(data);
    });
  }

  /**
   * Makes a request discography
   * @param {Object} obj - content with the information for the presentation of list
   * @property {string} html
   * @property {number} index
   * @property {string} classHide
   * @property {DOM} $container
   */
  getResults(obj){
    let html = '';
    let index = 0;
    let hideItem = '';
    let $container = document.getElementById(this.options.idContainer);
    this.results = [];

    this.showLoading($container);

    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        obj[prop]['id'] = index;
        this.results.push(obj[prop]);

        if(index > (this.maxItems - 1)){
          hideItem = this.classHide;
        }

        html += '<li class="'+hideItem+' search-results-item '+this.options.classItems+'" data-id="'+index+'">';
        html += '<strong class="search-results-item-title">';
        html += '<img class="search-results-item-image" src="'+obj[prop]['cover_url']+'" alt="'+obj[prop]['title']+'" height="80" width="80">';
        html += obj[prop]['title']+'</strong>';
        html += '<em class="search-results-item-year">'+obj[prop]['release_year']+'</em>';
        html += '</li>';
        index++;
      }
    }

    $container.innerHTML = '<ul class="search-results-list">'+html+'</ul>';
    this.eventSearch();
    this.loadMore();
    this.hideLoading($container);
  }

  /**
   * Event
   * @property {number} id
   * @property {NodeList} item
   */
  eventSearch(){
    let id   = null;
    let item  = document.querySelectorAll('.'+this.options.classItems);

    for (var i = 0, len = item.length; i < len; i++) {
      id = item[i].getAttribute("data-id");
      item[i].addEventListener( 'click', (event) => this.actionSearch(event, id), false );
    }
  }

  /**
   * Action to display a modal by clicking on a list item
   * @param {Event} event
   * @param {string} id
   * @property {string} name
   * @property {Object} data
   */
  actionSearch(event, id){
    let name = this.name;
    let data = {};

    event.preventDefault();
    event.stopPropagation();

    for (var j = 0, lenResults = this.results.length; j < lenResults; j++) {
      if(this.results[j].id == id){
        data = this.results[j];
        data.name = name;
      }
    }

    this.mediator.emit('search-action', data);
  }

  /**
   * Treatment for action to show more items
   * @property {DOM} $button
   * @property {NodeList} $items
   */
  loadMore(){
    const $button = document.getElementById('js-load_more');
    let $items = document.querySelectorAll('.search-results-item.'+this.classHide);

    if(this.results.length > this.maxItems ){
      $button.classList.remove(this.classHide);
    } else {
      $button.classList.add(this.classHide);
    }

    $button.addEventListener('click', () => this.actionLoadMore($button, $items), false);
  }

  /**
   * Action to show more items
   * @param {DOM} $button
   * @param {NodeList} $items
   */
  actionLoadMore($button, $items){
    this.showLoading($button);

    for (let index = 0, len = $items.length; index <len; index++) {
      if (index < this.maxItems - 1) {
        $items[index].classList.remove(this.classHide);
      }

      if ( len < this.maxItems ) {
        $button.classList.add(this.classHide);
      }
    }

    this.hideLoading($button);
  }

  /**
   * Loading show
   * @property {DOM} element
   */
  showLoading(element){
    element.classList.add('loading');
  }

  /**
   * Hide show
   * @property {DOM} element
   */
  hideLoading(element){
    element.classList.remove('loading');
  }

}
