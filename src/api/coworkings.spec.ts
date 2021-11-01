import {sum} from "./coworkings";

test('sanity test', () => {
    expect(true).toBe(true);
});

test('sum 2 + 2 = 4', () => {
    const output = sum(2, 2);
    console.log(output)
    expect(output).toBe(4);
})

test('sum 3 + 7 = 10', () => {
    const output = sum(3, 7);
    expect(output).toBe(4);
})
