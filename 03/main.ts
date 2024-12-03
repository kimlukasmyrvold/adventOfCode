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
        else if (/mul\(\d+,\d+\)/g.test(match)) {
            const res = match.split('mul(')[1].slice(0, -1).split(',').reduce((acc, num) => acc * Number(num), 1);
            p1 += res;
            if (enab) p2 += res;
        }
    }

    return [p1, p2];
};

const [p1, p2]: [number, number] = result();
console.log(`Part1: ${p1}\nPart2: ${p2}`);