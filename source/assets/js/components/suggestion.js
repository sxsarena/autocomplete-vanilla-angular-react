import MakeRequest from '../utils/request';

/**
 * Suggestion class.
 */
export default class Suggestion {

  /**
   * create instance.
   * @param {EventEmitter} mediator - Instance of class.
   * @param {Object} options - settings for the class.
   * @property {EventEmitter} mediator
   * @property {Object} options
   * @property {DOM} $container
   * @property {DOM} $input
   */
  constructor(mediator, options) {
    this.mediator = mediator;
    this.options  = options;

    this.$container = document.getElementById(this.options.idContainer);
    this.$input = document.getElementById(this.options.idField);

    this.createList();

    this.handleKeyDown(options.url);
  }

  /**
   * Checks the keyDown event in element
   * @param {string} url - address for suggestions request
   * @property {Object} me
   */
  handleKeyDown(url){
    let me = this;

    this.$input.addEventListener('keydown', function() {

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

  /**
   * Creates HTML with the results list
   * @param {Object} obj - content with the information for the presentation of list
   * @property {string} items
   * @property {string} inputField
   */
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

  /**
   * Returns the HTML of each list item
   * @param {number} id - identification
   * @param {string} name - artist
   * @returns {string} item content
   */
  insertSuggestion(id, name){
    return '<li class="suggestions-item"><button class="suggestions-button '+this.options.classButtons+'" data-id="'+id+'" data-name="'+name+'">'+name+'</button></li>';
  }

  /**
   * Create the list that have the items
   */
  createList(){
    let suggestionsList = document.createElement('ul');
    suggestionsList.className = 'suggestions-list';
    this.$container.appendChild(suggestionsList);
  }

  /**
   * Suggestions show
   */
  showSuggestions(){
    this.$container.style.display = 'block';
  }

  /**
   * Suggestions hide
   */
  hideSuggestions(){
    this.$container.style.display = 'none';
  }

  /**
   * Action to display the results
   * @property {Object} me
   * @property {Nodelist} item
   */
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
