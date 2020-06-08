const Mite = require('../src/Mite');

const config = jest.mock('../src/Config');


test('construction creates new miteApi object', () => {
    const mite = new Mite();
    console.log(mite.mite.getAccount());
   // this.expect(mite).toBeInstanceOf('mite-api');
})