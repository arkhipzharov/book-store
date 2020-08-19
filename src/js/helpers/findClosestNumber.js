// https://www.gavsblog.com/blog/find-closest-number-in-array-javascript#:~:text=Find%20the%20closest%20value%20in%20array%20using%20sort()&text=const%20needle%20%3D%208%3B%20const%20numbers,needle%20%2D%20b)%3B%20%7D)%20console.
export function findClosestNumber(numberClosestToWhich, numbers) {
  return numbers.reduce((a, b) => {
    const aDiff = Math.abs(a - numberClosestToWhich);
    const bDiff = Math.abs(b - numberClosestToWhich);
    if (aDiff === bDiff) {
      // Choose largest vs smallest (> vs <)
      return a > b ? a : b;
    }
    return bDiff < aDiff ? b : a;
  });
}
