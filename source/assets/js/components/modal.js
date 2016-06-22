export default class Modal {

  constructor(mediator, options) {
    const me = this;
    this.mediator = mediator;
    this.options  = options;

    this.$container = document.getElementById(this.options.idContainer);

    this.actionClose();

    this.mediator.on(this.options.eventShowModal, (data) => {
      me.showModal(data);
    });
  }

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

  showModal(data){
    this.$container.querySelector('#'+this.options.idContent).innerHTML = this.getContent(data);
    this.$container.classList.remove('hide');
  }

  actionClose(){
    const me = this;
    let $closeButton = document.getElementById(this.options.idClose);

    $closeButton.addEventListener('click', function(event) {
      event.preventDefault();
      me.hideModal();
    });
  }

  hideModal(){
    this.$container.classList.add('hide');
  }

}
