var minimumDifference = function (nums) {
    const N = nums.length;
    const n = N / 2;
    const left = new Array(n + 1).fill().map(() => new Array().fill());
    const right = new Array(n + 1).fill().map(() => new Array().fill());
  
    let sum = 0;
    nums.forEach((num) => (sum += num));
  
    for (let i = 0; i < 1 << n; i++) {
      let count = 0; // to count number of elements in the subset
      let leftSum = 0;
      let rightSum = 0;
  
      for (let j = 0; j < n; j++) {
        if (i & (1 << j)) {
          count++;
          leftSum += nums[j];
          rightSum += nums[n + j];   
        }
      }
  
      left[count].push(leftSum); 
      
      right[count].push(rightSum);
    }
  
    for (let i = 0; i < n; i++) {
      right[i].sort((a, b) => a - b);
    }
  
    let ans = Number.MAX_VALUE;
  
    for (let i = 0; i < n; i++) {
      const leftArr = left[i];
      const rightArr = right[n - i]; 
      // we have to find min abs diff in two equal size arrays
  
      leftArr.forEach((element) => {
        let low = 0;
        let high = rightArr.length - 1;
  
        while (low <= high) {
          const mid = Math.floor(low + (high - low) / 2);
          const value = sum - 2 * (element + rightArr[mid]);
          ans = Math.min(ans, Math.abs(value));
          if (ans == 0) {
            return ans;
          }
          if (value > 0) {
            low = mid + 1;
          } else {
            high = mid - 1;
          }
        }
  
      });
    }
  
    return ans;
  };


 
console.log(minimumDifference([3, 9, 7, 3])); // Output: 2

console.log(minimumDifference([-36, 36])); // Output: 72

console.log(minimumDifference([2, -1, 0, 4, -2, -9])); // Output: 0

console.log(minimumDifference([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])); // Output: 0

console.log(minimumDifference([10, 10, 10, 10, 10, 10, 10, 10, 10, 10])); // Output: 0

console.log(minimumDifference([-5, -1, 2, 4, 7, 9, 11, 15])); // Output: 2
