/**
 * Modal class.
 */
export default class Modal {

  /**
   * create instance.
   * @param {EventEmitter} mediator - Instance of class.
   * @param {Object} options - settings for the class.
   * @property {Object} me
   * @property {EventEmitter} mediator
   * @property {Object} options
   * @property {DOM} $container
   * @property {string} classHide
   */
  constructor(mediator, options) {
    const me = this;
    this.mediator = mediator;
    this.options  = options;
    this.classHide= 'hide';

    this.$container = document.getElementById(this.options.idContainer);

    this.actionClose();

    this.mediator.on(this.options.eventShowModal, (data) => {
      me.showModal(data);
    });
  }

  /**
   * Builds html for modal
   * @param {Object} data - content with the information for the presentation of modal
   * @returns {string} modal content.
   * @property {string} html
   */
  getContent(data){
    let html = '';

    html += '<div class="modal-int">';
    html += '<figure class="modal-wrap_image">';
    html += '<img class="modal-image" src="'+data.cover_url+'" height="200" width="200">';
    html += '</figure>';
    html += '<div class="modal-description">';
    html += '<span class="modal-category">'+data.name+'</span>';
    html += '<strong class="modal-title">'+data.title+'</strong>';
    html += '<em class="modal-date">'+data.release_year+'</em>';
    html += '<span class="modal-text">'+data.info+'</span>';
    html += '</div>';
    html += '</div>';

    return html;

  }

  /**
   * Modal show
   * @param {Object} data - content with the information for the presentation of modal
   */
  showModal(data){
    this.$container.querySelector('#'+this.options.idContent).innerHTML = this.getContent(data);
    this.$container.classList.remove(this.classHide);
  }

  /**
   * Action to hide the modal
   * @property {Object} me
   * @property {DOM} $closeButton
   */
  actionClose(){
    const me = this;
    let $closeButton = document.getElementById(this.options.idClose);

    $closeButton.addEventListener('click', (event) => {
      event.preventDefault();
      me.hideModal();
    });
  }

  /**
   * Modal hide
   */
  hideModal(){
    this.$container.classList.add(this.classHide);
  }

}
