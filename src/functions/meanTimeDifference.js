export default function meanTimeDifference(dateList, upperThreshold, lowerThreshold) {
  const timestamps = dateList.map(dateString => new Date(dateString));

  const timeDifferences = [];
  for (let i = 1; i < timestamps.length; i++) {
    const diff = timestamps[i].getTime() - timestamps[i - 1].getTime();

    if (diff >= lowerThreshold * 1000 && diff <= upperThreshold * 1000) {
      timeDifferences.push(diff / 1000);
    }
  }

  const sum = timeDifferences.reduce((total, diff) => total + diff, 0);

  const meanDifference = sum / timeDifferences.length;

  const meanDate = new Date(meanDifference * 1000);
  const meanTimeString = meanDate.toISOString().slice(11, 19);

  return meanTimeString;
}
