import * as fs from 'fs';

const inputPath: { main: string, sample: string } = {
    main: './05/input.txt',
    sample: './05/input-sample.txt',
};

const [rules, pages] = fs.readFileSync(inputPath.sample, 'utf-8').trim().split(/\n\n/).map(sec => sec.split(/\n/).map(line => line.split(/[|,]/).map(Number)));

console.log(rules, '\n', pages);
