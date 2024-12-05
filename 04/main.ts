import * as fs from 'fs';

const inputPath: { main: string, sample: string } = {
    main: './04/input.txt',
    sample: './04/input-sample.txt',
};

const lines: string[][] = fs.readFileSync(inputPath.main, 'utf-8').trim().split(/\n/).map(line => line.split(''));
const rowLen: number = lines.length;
const colLen: number = lines[0].length;

let count1: number = 0;
let count2: number = 0;

for (let row: number = 0; row < rowLen; row++) {
    for (let col: number = 0; col < colLen; col++) {
        // Horizontal scan
        if (col + 3 < colLen) {
            const hor: string = [lines[row][col], lines[row][col + 1], lines[row][col + 2], lines[row][col + 3]].join('');
            if (hor === 'XMAS' || hor === 'SAMX') count1++;
        }

        // Vertical scan
        if (row + 3 < rowLen) {
            const ver: string = [lines[row][col], lines[row + 1][col], lines[row + 2][col], lines[row + 3][col]].join('');
            if (ver === 'XMAS' || ver === 'SAMX') count1++;
        }

        // Diagonal scan (left to right)
        if (col + 3 < colLen && row + 3 < rowLen) {
            const diaLr: string = [lines[row][col], lines[row + 1][col + 1], lines[row + 2][col + 2], lines[row + 3][col + 3]].join('');
            if (diaLr === 'XMAS' || diaLr === 'SAMX') count1++;
        }

        // Diagonal scan (right to left)
        if (col + 3 < colLen && row - 3 > -1) {
            const diaRl: string = [lines[row][col], lines[row - 1][col + 1], lines[row - 2][col + 2], lines[row - 3][col + 3]].join('');
            if (diaRl === 'XMAS' || diaRl === 'SAMX') count1++;
        }

        // help mich

        // scan in x pattern I guess (top left, top right, middle, middle, bottom left, bottom right)
        if (col + 2 < colLen && row + 2 < rowLen) {
            const x: string = [lines[row][col], lines[row][col + 2], lines[row + 1][col + 1], lines[row + 2][col], lines[row + 2][col + 2]].join('');
            if (x === 'MMASS' || x === 'SSAMM' || x === 'MSAMS' || x === 'SMASM') count2++;
            /**
             * M   M
             *   A
             * S   S
             * MMASS
             * 
             * S   S
             *   A
             * M   M
             * SSAMM
             * 
             * M   S
             *   A
             * M   S
             * MSAMS
             * 
             * S   M
             *   A
             * S   M
             * SMASM
            */
        }
    }
}

console.log('Part 1:', count1);
console.log('Part 2:', count2);
