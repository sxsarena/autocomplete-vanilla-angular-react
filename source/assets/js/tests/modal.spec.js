import Modal from '../components/modal';

/** @test {Modal} */
describe('Modal', () => {

  describe('Init', () => {
    let modal;
    let mediator;
    const optModal = {
      idContainer   : 'js-modal',
      idContent     : 'js-modal-content',
      idClose       : 'js-modal-close',
      eventShowModal: 'search-action'
    };

    beforeEach(() => {

      var fixture = '<div class="search">' +
      '<form class="search-form" action="" role="form">' +
        '<fieldset class="form-fieldset">' +
          '<legend class="form-legend">Formulário de busca de discografias</legend>' +
          '<p><input class="search-form-field" id="js-field" type="text" autocomplete="off"></p>' +
          '<div class="suggestions" id="js-suggestions"></div>' +
        '</fieldset>' +
      '</form>' +
      '</div>';

      document.body.insertAdjacentHTML(
        'afterbegin',
        fixture);

      modal = new Modal(mediator, optModal);
    });

    it('Verify object', () => {
      assert.equal(Object.keys(modal.options).length, 4);
    });
  });

});
