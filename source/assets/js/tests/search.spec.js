import Search from '../components/search';

/** @test {Search} */
describe('Search', () => {

  describe('Init', () => {
    let search;
    let mediator;
    const optSearch = {
      idContainer   : 'js-results',
      classItems    : 'js-search-item',
      eventgetAlbums: 'suggestion-action'
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

      search = new Search(mediator, optSearch);
    });

    it('Verify object', () => {
      assert.equal(Object.keys(search.options).length, 3);
    });
  });

});
