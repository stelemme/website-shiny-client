export default function meanTimeDifference(dateList, upperThreshold, lowerThreshold) {
  // Convert date strings to JavaScript Date objects
  const timestamps = dateList.map(dateString => new Date(dateString));

  // Calculate time differences within the given thresholds
  const timeDifferences = [];
  for (let i = 1; i < timestamps.length; i++) {
    const diff = timestamps[i].getTime() - timestamps[i - 1].getTime();

    // Discard values above the upper threshold and under the lower threshold
    if (diff >= lowerThreshold * 1000 && diff <= upperThreshold * 1000) {
      timeDifferences.push(diff / 1000); // Convert milliseconds to seconds
    }
  }

  // Calculate sum of time differences
  const sum = timeDifferences.reduce((total, diff) => total + diff, 0);

  // Calculate mean time difference
  const meanDifference = sum / timeDifferences.length;

  // Convert mean time difference back to readable format (optional)
  const meanDate = new Date(meanDifference * 1000);
  const meanTimeString = meanDate.toISOString().slice(11, 19);

  return meanTimeString;
}
