import methodHunts from "./methodHunts";

export function calculateMeanEncounterTime(dateList, upperThreshold, lowerThreshold, increment) {
  if (dateList.length === 0) {
    return null
  }
  const timestamps = dateList.map(dateString => new Date(dateString));

  const timeDifferences = [];
  for (let i = 1; i < timestamps.length; i++) {
    const diff = timestamps[i].getTime() - timestamps[i - 1].getTime();

    if (diff >= lowerThreshold * 1000 && diff <= upperThreshold * 1000) {
      timeDifferences.push(diff / 1000);
    }
  }

  const sum = timeDifferences.reduce((total, diff) => total + diff, 0);

  const meanDifference = (sum / timeDifferences.length) / increment;

  return meanDifference
}

export function calculateProb(odds, rolls, shinyCharm, charmRolls, totalEncounters, methodFunction = null, searchLevel = null) {
  if (methodFunction) {
    return methodHunts(methodFunction, totalEncounters, shinyCharm, false, false, 0, null, null, null, null, null, searchLevel);
  } else {
    return Math.round(
      (1 - ((odds - 1) / odds) ** (rolls + (shinyCharm ? charmRolls : 0))) ** -1
    );
  }
}

export function calculatePercentage(encounters, odds, rolls, shinyCharm, charmRolls, methodFunction, searchLevel = null) {
  const newProb = calculateProb(odds, rolls, shinyCharm, charmRolls, encounters, methodFunction, searchLevel = null);

  return Number(((1 - ((newProb - 1) / newProb) ** encounters) * 100).toFixed(2));
};

export function calculateDateDifference(endDate, startDate) {
  if (endDate === startDate || endDate < startDate) {
    return 1
  }
  if (startDate === null) {
    return null
  }
  return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
};

export function calculateEncountersPerDay(dateList, day = new Date()) {
  const datesFromToday = dateList.filter((date) =>
    isSameDate(new Date(date), day)
  );

  function isSameDate(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  return datesFromToday.length;
}

export function formatTime(totalSeconds, showDays = true) {
  let remainingSeconds = totalSeconds
  let days = 0

  if (showDays) {
    days = Math.floor(totalSeconds / 86400);
    remainingSeconds = totalSeconds % 86400;
  }

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  if (showDays) {
    const formattedTime =
      days === 1
        ? `${String(days)} day ${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        : `${String(days)} days ${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    return formattedTime;
  } else {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
}

export function formatSeconds(timeStr, showDays = true) {
  if (!timeStr) {
    return null
  }
  let time
  if (showDays) {
    var parts = timeStr.split(' ');
    var days = parseInt(parts[0]);
    time = parts[2].split(':');
  } else {
    time = timeStr.split(':')
  }

  var hours = parseInt(time[0]);
  var minutes = parseInt(time[1]);
  var seconds = parseInt(time[2]);
  var totalSeconds = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;
  return totalSeconds;
}

export function formatEncounterData(encounterArray) {
  const dateFrequencyMap = {};

  encounterArray.forEach(dateString => {
    const formattedDateString = new Date(dateString).toDateString()

    if (dateFrequencyMap[formattedDateString]) {
      dateFrequencyMap[formattedDateString]++;
    } else {
      dateFrequencyMap[formattedDateString] = 1;
    }
  });

  const formattedData = Object.keys(dateFrequencyMap).map(dateString => ({
    date: new Date(dateString).getTime(),
    value: dateFrequencyMap[dateString],
  }));

  return formattedData;
}

export function calculateOverlapPercentage(arr1, arr2) {
  if (!arr1 || !arr2 ) {
    return 0;
  }

  const commonElements = arr2.filter(element => arr1.includes(element));
  const percentage = (commonElements.length / arr2.length) * 100;

  return percentage;
}