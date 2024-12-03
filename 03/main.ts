import * as fs from 'fs';

const inputPath: { main: string, sample: string, sample2: string } = {
    main: './03/input.txt',
    sample: './03/input-sample.txt',
    sample2: './03/input-sample-2.txt',
};

const matches: string[] = fs.readFileSync(inputPath.main, 'utf-8').trim().match(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g) || [];
const result = (): [number, number] => {
    let enab: boolean = true;
    let p1: number = 0;
    let p2: number = 0;

    for (const match of matches) {
        if (match === "do()") enab = true;
        else if (match === "don't()") enab = false;
        else if (match.startsWith('mul(') && match.endsWith(')')) {
            const [n1, n2] = match.slice(4, -1).split(',').map(Number);
            const p = n1 * n2;
            p1 += p;
            if (enab) p2 += p;
        }
    }

    return [p1, p2];
};

const [p1, p2]: [number, number] = result();
console.log(`Part1: ${p1}\nPart2: ${p2}`);