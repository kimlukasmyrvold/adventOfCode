import * as fs from 'fs';

const inputPath: { main: string, sample: string } = {
    main: './03/input.txt',
    sample: './03/input-sample.txt',
};

const lines = fs.readFileSync(inputPath.main, 'utf-8').trim();

const regex = /mul\(\d+,\d+\)/g;
const matches = lines.match(regex);
const result = matches?.map(match => match.split('mul(')[1].slice(0, -1).split(',')
    .reduce((acc, num) => acc * Number(num), 1))
    .reduce((acc, num) => acc + num);

console.log('part1:', result);
