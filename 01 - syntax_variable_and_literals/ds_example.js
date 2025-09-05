// ds_example.js
// Count the number of subarrays (substrings) where each character appears exactly k times

function countSubarraysWithK(s, k) {
    let n = s.length;
    let count = 0;
    // Try all substrings
    for (let i = 0; i < n; i++) {
        let freq = {};
        for (let j = i; j < n; j++) {
            let ch = s[j];
            freq[ch] = (freq[ch] || 0) + 1;
            // Check if all characters in freq appear exactly k times
            let allK = true;
            for (let key in freq) {
                if (freq[key] !== k) {
                    allK = false;
                    break;
                }
            }
            console.log(freq, allK);
            // Only count if all characters seen so far appear exactly k times
            if (allK) count++;
        }
    }
    return count;
}

// Example test case
const s = "aabb";
const k = 2;
console.log(`Count of subarrays in '${s}' where each character appears exactly ${k} times:`, countSubarraysWithK(s, k));
// Output should be 1 (the substring "aabb")

// You can add more test cases below
