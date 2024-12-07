import * as fs from 'fs';

const inputPath: { main: string, sample: string } = {
    main: './06/input.txt',
    sample: './06/input-sample.txt',
};

const lines: string[][] = fs.readFileSync(inputPath.sample, 'utf-8').trim().split(/\n/).map(line => line.split(''));
const rowLen: number = lines.length;
const colLen: number = lines[0].length;
const guardInitLocation: number[] = lines.flatMap((line, row) => line.map((char, col) => char === '^' ? [row, col] : null)).find(location => location !== null) as number[];

let guardLocations: number[][] = [guardInitLocation];
let positions: number = 0;

while (guardLocations[guardLocations.length - 1][0] < rowLen - 1 && guardLocations[guardLocations.length - 1][0] > 0) {
    const [x, y] = guardLocations[guardLocations.length - 1];
    guardLocations.push([x - 1, y]);
}

// for (let row: number = 0; row < rowLen; row++) {
//     for (let col: number = 0; col < colLen; col++) {
//         console.log(lines[row][col]);


//         // // Horizontal scan
//         // if (col + 3 < colLen) {
//         //     const hor: string = [lines[row][col], lines[row][col + 1], lines[row][col + 2], lines[row][col + 3]].join('');
//         //     if (hor === 'XMAS' || hor === 'SAMX') positions++;
//         // }

//         // // Vertical scan
//         // if (row + 3 < rowLen) {
//         //     const ver: string = [lines[row][col], lines[row + 1][col], lines[row + 2][col], lines[row + 3][col]].join('');
//         //     if (ver === 'XMAS' || ver === 'SAMX') positions++;
//         // }
//     }

//     console.log('\n');
// }

console.log('\nguardInitLocation:', guardInitLocation);
console.log('guardLocations:', guardLocations);
console.log('Distinct positions:', positions);
