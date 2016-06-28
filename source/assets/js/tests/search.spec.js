import Search from '../components/search';

/** @test {Search} */
describe('Search', () => {

  describe('Init', () => {
    let search;
    let mediator = { on: () => {} };
    const optSearch = {
      idContainer   : 'js-results',
      classItems    : 'js-search-item',
      eventgetAlbums: 'suggestion-action'
    };

    beforeEach(() => {

      let fixture = '<div class="search-results" id="js-results"></div>'+
        '<p class="wrap-highlight"><button class="button-load_more hide" id="js-load_more" type="button">Load More</button></p>';

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
