// unit testing function using Jassmine framework
// to test getFullAddress(addObj) function in index.js

describe('getFullAddress', function () {
    // test case 1 expect success on valid address
    it('getFullAddress return a valid address- test case 1 - expect 1600 Pennsylvania Avenue, N.W.Washington, DC.20500', function () {

        // build data structure for test case

        let addObj = { street: '1600 Pennsylvania Avenue', city: 'N.W.Washington', state: 'DC', zip: '20500' };
        const val = getFullAddress(addObj);
        expect(val).toBe('1600 Pennsylvania Avenue, N.W.Washington, DC.20500');
    });
    // test case 2 expect success invalid address
    it('getFullAddress return a invalid address- test case 2 - , , .', function () {

        // build data structure for test case

        let addObj = { street: '', city: '', state: '', zip: '' };
        const val = getFullAddress(addObj);
        expect(val).toBe(', , .');
    });
})