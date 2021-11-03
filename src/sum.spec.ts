import {sum} from "./sum";

describe('coworkings', () => {
    it('sanity test', () => {
        expect(true).toBe(true);
    });

    it('sum 2 + 2 = 4', () => {
        const output = sum(2, 2);
        expect(output).toBe(4);
    })

    it('sum 3 + 7 = 10', () => {
        const output = sum(3, 7);
        expect(output).toBe(10);
    })
})
