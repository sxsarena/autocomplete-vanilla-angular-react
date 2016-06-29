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

    this.minCharacters = 2;
    this.oldInputValue;

    this.keys = {
      up   : 38,
      down : 40
    };
    this.currentItem = null;
    this.mouseList = true;

    this.createList();

    this.handleFocusIn();
    this.handleFocusOut();
    this.handleKeyUp();
    this.handleKeyDown();
    this.handleKeyPress();
  }

  /**
   * Validation of the field to only alphanumeric and spaces
   */
  validateField(){
    this.$input.value = this.$input.value.replace(/[^a-zA-ZãâÃÂáÁàÀêÊéÉèÈíÍìÌôÔõÕóÓòÒúÚùÙûÛçÇ0-9 ]/g, "");
  }

  /**
   * Validation to execute the request
   * @property {string} amountCharacteres
   */
   validateRequest(){
    let amountCharacteres = this.$input.value.length;

    if(amountCharacteres >= this.minCharacters && (amountCharacteres !== this.oldInputValue)){
      this.requestArtists();
    } else if(amountCharacteres < this.minCharacters) {
      this.hideSuggestions();
    }
   }

  /**
   * The request of artists
   */
  requestArtists(){
    MakeRequest(this.options.url, (data) => {
      this.getSuggestions(data);
    });
  }

  /**
   * Validates the suggestion list has its elements
   * @param {Event} event
   * @property {string} amountItems
   */
  validateList(event){
    let amountItems = document.querySelectorAll('.'+this.options.classButtons).length;

    if(amountItems > 0){
      this.handleKeyList(event, amountItems);
    }
  }

  /**
   * Identifies the key pressed on the keyboard
   * @param {Event} event
   * @param {number} amountItems
   * @property {number} goToIndex
   * @property {number} amount
   */
  handleKeyList(event, amountItems){
    let goToIndex = this.currentItem;
    let amount = amountItems-1;

    switch(event.keyCode) {
      case this.keys.up:
        if(goToIndex !== null && goToIndex > 0) {
          goToIndex--;
        }
        break;

      case this.keys.down:
        if(goToIndex === null){
          event.preventDefault();
          goToIndex = 0;
        } else if(this.currentItem >= amount) {
          goToIndex = amount;
        } else {
          goToIndex++;
        }
        break;
    }

    this.activeKeyItem(goToIndex, amount);
  }

  /**
   * Validates the index informed
   * @param {number} index
   * @param {number} amount
   * @returns {number} index
   */
  verifyIndexList(index, amount){
    if(index < 0 ){
      index = 0;
    } else if (index > amount){
      index = amount;
    }

    return index;
  }

  /**
   * Identifies the active element of the list
   * @property {number} itemHeight
   * @property {DOM} $elements
   */
  activeKeyItem(index, amount){
    let itemHeight = document.querySelectorAll('.'+this.options.classButtons)[0].clientHeight;
    let $elements = document.querySelectorAll('.'+this.options.classButtons);
    this.currentItem = this.verifyIndexList(index, amount);

    if(this.currentItem !== null){
      for (var i = 0, len = $elements.length; i < len; i++) {
        $elements[i].classList.remove('active');
      }

      $elements[this.currentItem].classList.add('active');
      $elements[this.currentItem].focus();

      this.$container.querySelector('ul').scrollTop = parseInt(itemHeight) * index;
    }
  }

  /**
   * Checks the KeyPress event in element
   */
  handleKeyPress(){
    this.$input.addEventListener( 'keypress', () => this.validateField(), false );
  }

  /**
   * Checks the keyDown event in element
   */
  handleKeyDown(){
    this.$input.addEventListener( 'keydown', (event) => {
      this.validateField();
      this.oldInputValue = this.$input.value.length;
      this.validateList(event);
    });

    this.$container.querySelector('ul').addEventListener( 'keydown', (event) => {
      this.validateList(event);
    });
  }

  /**
   * Checks the keyUp event in element
   */
  handleKeyUp(){
    this.$input.addEventListener( 'keyup', () => {
      setTimeout(() => {
        this.validateField();
        this.validateRequest();
      }, 500);
    });
  }

  /**
   * Checks the FocusIn event in element
   */
  handleFocusIn() {
    this.$input.addEventListener( 'focus', () => {
      if(this.$input.value.length >= this.minCharacters){
        this.requestArtists();
      }
    });
  }

  /**
   * Checks the FocusOut event in element
   */
  handleFocusOut() {
    const me = this;
    let $elements;
    this.$input.addEventListener( 'blur', function() {
      $elements = document.querySelectorAll('.'+me.options.classButtons+'.active');

      if($elements.length === 0 && me.mouseList){
        me.hideSuggestions();
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

    if(items.length === 0){
      items = this.insertDefault();
    }

    this.$container.querySelector('ul').innerHTML = items;

    this.actionSuggestions();
    this.showSuggestions();
  }

  /**
   * Returns the HTML default of list
   * @returns {string} item default
   */
  insertDefault(){
    return '<li class="suggestions-item---empty">Sem resultados</li>';
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
    document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
  }

  /**
   * Suggestions hide
   */
  hideSuggestions(){
    this.$container.style.display = 'none';
    document.getElementsByTagName('html')[0].style.overflowY = 'scroll';
    this.$container.querySelector('ul').innerHTML = '';
    this.currentItem = null;
  }

  /**
   * Action to display the results
   * @property {Object} me
   * @property {Nodelist} items
   */
  actionSuggestions(){
    const me = this;
    let items = document.querySelectorAll('.'+this.options.classButtons);

    for (var i = 0, len = items.length; i < len; i++) {
      items[i].addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        me.hideSuggestions();
        me.mediator.emit('suggestion-action', this.getAttribute("data-id"), this.getAttribute("data-name"));
      });

      items[i].addEventListener('mouseenter', () => {
        me.mouseList = false;
      });

      items[i].addEventListener('mouseleave', () => {
        me.mouseList = true;
      });
    }
  }

}
