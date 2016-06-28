import Modal from '../components/modal';

/** @test {Modal} */
describe('Modal', () => {

  describe('Init', () => {
    let modal;
    let mediator = { on: () => {} };
    const optModal = {
      idContainer   : 'js-modal',
      idContent     : 'js-modal-content',
      idClose       : 'js-modal-close',
      eventShowModal: 'search-action'
    };

    beforeEach(() => {

      let fixture = '<div class="modal hide" id="js-modal">'+
        '<div class="modal-dialog">'+
          '<button class="modal-close" id="js-modal-close" type="button"></button>'+
          '<div class="modal-content" id="js-modal-content"></div>'+
        '</div>'+
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
