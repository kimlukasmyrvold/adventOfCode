import * as fs from 'fs';

const inputPath: { main: string, sample: string } = {
    main: './02/input.txt',
    sample: './02/input-sample.txt',
};

const lines = fs.readFileSync(inputPath.main, 'utf-8').trim().split(/\n/).map(line => line.split(' '));

const inRange = (diff: number): boolean => diff > 0 && diff < 4;
const safePair = (a: number, b: number): boolean => inRange(Math.abs(a - b));
const safePairs = (arr: string[]): boolean => {
    let safe: boolean = false;
    for (let i = 1; i < arr.length; i++) {
        safe = safePair(Number(arr[i - 1]), Number(arr[i]));
        if (!safe) break;
    }
    return safe;
}
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
const checkLineSafe = (arr: string[]): boolean => safePairs(arr) && isMonotonic(arr);


const p1 = (): number => {
    let safe: number = 0;

    for (const line of lines) {
        if (checkLineSafe(line)) safe++;
    }

    return safe;
};

const p2 = (): number => {
    let safe: number = 0;

    for (const line of lines) {
        let safeLine: boolean = checkLineSafe(line);

        if (!safeLine) {
            for (let i = 0; i < line.length; i++) {
                safeLine = checkLineSafe(line.filter((_, index) => i !== index));
                if (safeLine) break;
            }
        }

        if (safeLine) safe++;
    }

    return safe;
};


console.log('Safe levels p1:', p1());
console.log('Safe levels p2:', p2());
