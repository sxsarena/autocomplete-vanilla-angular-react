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
    const me = this;
    this.mediator = mediator;
    this.options  = options;
    this.name = '';
    this.results;
    this.maxItems = 5;
    this.classHide = 'hide';

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

    MakeRequest(url, function(data) {
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
    this.actionSearch();
    this.loadMore();
    this.hideLoading($container);
  }

  /**
   * Action to display a modal by clicking on a list item
   * @property {Object} me
   * @property {NodeList} item
   * @property {string} name
   * @property {number} id
   * @property {Object} data
   */
  actionSearch(){
    let me = this;
    let item = document.querySelectorAll('.'+this.options.classItems);
    let name = this.name;
    let id = null;
    let data = {};

    for (var i = 0, len = item.length; i < len; i++) {
      item[i].addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();

        id = this.getAttribute("data-id");

        for (var j = 0, lenResults = me.results.length; j < lenResults; j++) {
          if(me.results[j].id == id){
            data = me.results[j];
            data.name = name;
          }
        }

        me.mediator.emit('search-action', data);
      });
    }
  }

  /**
   * Treatment for action to show more items
   * @property {Object} me
   * @property {DOM} $button
   */
  loadMore(){
    const me = this;
    const $button = document.getElementById('js-load_more');

    if(this.results.length > this.maxItems ){
      $button.classList.remove(this.classHide);
    } else {
      $button.classList.add(this.classHide);
    }

    $button.addEventListener('click', function(){
      me.showLoading(this);
      [].forEach.call(document.querySelectorAll('.search-results-item.'+me.classHide), function(item, index){

        if (index < me.maxItems - 1) {
          item.classList.remove(me.classHide);
        }

        if ( document.querySelectorAll('.search-results-item.'+me.classHide).length === 0) {
          $button.classList.add(me.classHide);
        }

      });
      me.hideLoading(this);
    });
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
