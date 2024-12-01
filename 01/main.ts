import * as fs from 'fs';

const inputPath: { main: string, sample: string } = {
    main: './01/input.txt',
    sample: './01/input-sample.txt',
};

const lines = fs.readFileSync(inputPath.main, 'utf-8').trim().split(/\n/);
const [left, right]: [number[], number[]] = lines
    .map(entry => entry.split('   ') as [string, string])
    .reduce(([l, r], [a, b]) => {
        l.push(Number(a));
        r.push(Number(b));
        return [l, r];
    }, [[], []] as [number[], number[]]);

const part1 = (): number => {
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    let totalDistance: number = 0;

    for (let i: number = 0; i < left.length; i++) {
        totalDistance += Math.abs(left[i] - right[i]);
    }

    return totalDistance;
};

const part2 = (): number => {
    const countOccurrences = (arr: number[]): { [key: string]: number } => {
        const count: { [key: string]: number } = {};

        arr.forEach(num => {
            if (count[num]) count[num]++;
            else count[num] = 1;
        });

        return count;
    }

    const rightOccurrences = countOccurrences(right);
    let similarityScore: number = 0;

    for (const line of left) {
        const timesInRight: number = rightOccurrences[line] ?? 0;
        similarityScore += line * timesInRight;
    }

    return similarityScore;
};

console.log('Total distance:', part1());
console.log('Similary score:', part2());