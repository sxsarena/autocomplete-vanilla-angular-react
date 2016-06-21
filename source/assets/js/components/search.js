import MakeRequest from '../utils/request';

export default class Search {

  constructor(mediator, options) {
    const me = this;
    this.mediator = mediator;
    this.options  = options;
    this.name = '';
    this.results = [];

    this.mediator.on(this.options.eventgetAlbums, (id, name) => {
      me.name = name;
      me.getAlbums(id);
    });
  }

  getAlbums(id){
    const me = this;
    let url = 'http://private-047f-meliuztestefrontend.apiary-mock.com/artists/'+id+'/discography';

    MakeRequest(url, function(data) {
      me.getResults(data);
    });
  }

  getResults(obj){
    let html = '';
    let index = 0;

    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        obj[prop]['id'] = index;
        this.results.push(obj[prop]);
        html += '<li class="search-results-item '+this.options.classItems+'" data-id="'+index+'">';
        html += '<strong class="search-results-item-title">';
        html += '<img class="search-results-item-image" src="'+obj[prop]['cover_url']+'" alt="'+obj[prop]['title']+'" width="80">';
        html += obj[prop]['title']+'</strong>';
        html += '<em class="search-results-item-year">'+obj[prop]['release_year']+'</em>';
        html += '</li>';
        index++;
      }
    }

    document.getElementById(this.options.idContainer).innerHTML = '<ul class="search-results-list">'+html+'</ul>';
    this.actionSearch();
  }

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

}
