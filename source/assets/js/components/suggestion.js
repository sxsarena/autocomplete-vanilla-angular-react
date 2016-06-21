import MakeRequest from '../utils/request';

export default class Suggestion {

  constructor(mediator, options) {
    this.mediator = mediator;
    this.options  = options;

    this.$container = document.getElementById(this.options.idContainer);
    this.$input = document.getElementById(this.options.idField);

    this.createList();

    this.handleKeyDown(options.url);
  }

  handleKeyDown(url){
    let me = this;

    this.$input.addEventListener('keydown', function(event) {

      if(me.$input.value.length > 2){
        MakeRequest(url, function(data) {
          me.getSuggestions(data);
        });
      } else {
        me.hideSuggestions();
        me.$container.querySelector('ul').innerHTML = '';
      }

    });
  }

  getSuggestions(obj){
    let items = '';
    let inputField = this.$input.value.toLowerCase();

    this.hideSuggestions();

    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (obj[prop]['name'].toLowerCase().indexOf(inputField) === 0) {
          items += this.insertSuggestion(obj[prop]['id'], obj[prop]['name']);
        }
      }
    }

    this.$container.querySelector('ul').innerHTML = items;

    this.actionSuggestions();
    this.showSuggestions();
  }

  insertSuggestion(id, name){
    return '<li class="suggestions-item"><button class="suggestions-button '+this.options.classButtons+'" data-id="'+id+'" data-name="'+name+'">'+name+'</button></li>';
  }

  createList(){
    let suggestionsList = document.createElement('ul');
    suggestionsList.className = 'suggestions-list';
    this.$container.appendChild(suggestionsList);
  }

  showSuggestions(){
    this.$container.style.display = 'block';
  }

  hideSuggestions(){
    this.$container.style.display = 'none';
  }

  actionSuggestions(){
    let me = this;
    let item = document.querySelectorAll('.'+this.options.classItems);

    for (var i = 0, len = item.length; i < len; i++) {
      item[i].addEventListener('click', function(event) {
        event.preventDefault();
        me.hideSuggestions();
        me.mediator.emit('suggestion-action', this.getAttribute("data-id"), this.getAttribute("data-name"));
      });
    }
  }

}
