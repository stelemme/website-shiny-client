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

export function calculateProb(odds, rolls, shinyCharm, charmRolls, totalEncounters, methodFunction = null) {
  if (methodFunction) {
    return methodHunts(methodFunction, totalEncounters, shinyCharm);
  } else {
    return Math.round(
      (1 - ((odds - 1) / odds) ** (rolls + (shinyCharm ? charmRolls : 0))) ** -1
    );
  }
}

export function calculatePercentage(encounters, odds, rolls, shinyCharm, charmRolls, methodFunction) {
  const newProb = calculateProb( odds, rolls, shinyCharm, charmRolls, encounters, methodFunction);

  return Number(((1 - ((newProb - 1) / newProb) ** encounters) * 100).toFixed(2));
};

export function calculateDateDifference(endDate, startDate) {
  if (endDate === startDate) {
    return 1
  }
  return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
};

export function calculateEncountersPerDay(dateList, day=new Date()) {
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

export function formatTime(totalSeconds) {
  const days = Math.floor(totalSeconds / 86400);
  const remainingSeconds = totalSeconds % 86400;

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const formattedTime =
    days === 1
      ? `${String(days)} day ${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      : `${String(days)} days ${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return formattedTime;
}