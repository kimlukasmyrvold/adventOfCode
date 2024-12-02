import * as fs from 'fs';

const inputPath: { main: string, sample: string } = {
    main: './02/input.txt',
    sample: './02/input-sample.txt',
};

const lines = fs.readFileSync(inputPath.main, 'utf-8').trim().split(/\n/).map(line => line.split(' '));

const inRange = (diff: number): boolean => diff > 0 && diff < 4;
const safePair = (a: number, b: number): boolean => inRange(Math.abs(a - b));
const isMonotonic = (arr: string[]): boolean => {
    let increasing: boolean = true;
    let decreasing: boolean = true;

    for (let i = 1; i < arr.length; i++) {
        if (Number(arr[i - 1]) < Number(arr[i])) {
            decreasing = false;
        } else if (Number(arr[i - 1]) > Number(arr[i])) {
            increasing = false;
        }
    }

    return increasing || decreasing;
}

let safe: number = 0;

for (const line of lines) {
    let safeLine: boolean = false;

    for (let i = 1; i < line.length; i++) {
        safeLine = safePair(Number(line[i - 1]), Number(line[i]));
        if (!safeLine) break;
    }
    if (safeLine) safeLine = isMonotonic(line);

    if (safeLine) safe++;
}

console.log(safe);