import * as fs from 'fs';

const inputPath: { main: string, sample: string } = {
    main: './02/input.txt',
    sample: './02/input-sample.txt',
};

const lines = fs.readFileSync(inputPath.sample, 'utf-8').trim().split(/\n/).map(line => line.split(' '));

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
const isMonotonic = (arr: string[], allowedFails: number = 0): boolean => {
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
const checkLineSafe = (arr: string[]): boolean => {
    let safeLine: boolean = false;

    for (let i = 1; i < arr.length; i++) {
        safeLine = safePair(Number(arr[i - 1]), Number(arr[i]));
        if (!safeLine) break;
    }

    return safeLine && isMonotonic(arr);
};

const p1 = (): number => {
    let safe: number = 0;

    for (const line of lines) {
        if (checkLineSafe(line)) safe++;
    }

    return safe;
};

const p2 = (): number => {
    for (const line of lines) {

        console.log(line);

        for (let i = 0; i < line.length; i++) {
            const cloArr: string[] = line.filter((_, index) => i !== index);
            console.log(isMonotonic(cloArr), safePairs(cloArr));
        }
        console.log('\n');


        // const originalLine = [...line];

        // while (line.length > 0) {
        //     const removedElement = line.shift();
        //     // console.log(removedElement);


        //     const result = false;

        //     // If the result is false, restore the removed element and the next one
        //     if (!result) {
        //         // Restore the removed element
        //         line.unshift(removedElement!); // Add it back to the front

        //         // Restore the next element if it exists
        //         if (originalLine.length > 0) {
        //             const nextElement = originalLine.shift(); // Get the next element from the original array
        //             line.unshift(nextElement!); // Add it back to the front
        //         }

        //         // Break the loop if you want to stop processing
        //         break;
        //     }
        // }
    }

    return 0;
};


const start = performance.now();
// console.log('Safe levels p1:', p1());
console.log('Safe levels p2:', p2());
const end = performance.now();
console.log(`Took ${end - start}ms`);
