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

    html += '<span>'+data.name+'</span>';
    html += '<img src="'+data.cover_url+'">';
    html += '<strong>'+data.title+'</strong>';
    html += '<span>'+data.release_year+'</span>';
    html += '<span>'+data.info+'</span>';

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
