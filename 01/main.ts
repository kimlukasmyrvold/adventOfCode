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
    const rightOccurrences: Map<number, number> = new Map();

    right.forEach(num => {
        rightOccurrences.set(num, (rightOccurrences.get(num) || 0) + 1);
    });

    let score: number = 0;

    for (const num of left) {
        if (rightOccurrences.has(num)) score += num * rightOccurrences.get(num)!;
    }

    return score;
};

console.log('Total distance:', part1());
console.log('Similary score:', part2());