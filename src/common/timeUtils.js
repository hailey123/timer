const formatTime = seconds => {
  const date = new Date(null)
  date.setSeconds(seconds)
  return seconds >= 3600
    ? date.toISOString().substr(12, 7)
    : date.toISOString().substr(14, 5)
}

const calculateIntervalCompletionPercentage = (
  timeRemaining,
  intervalLength
) => {
  return timeRemaining / intervalLength * 100
}

module.exports = {
  formatTime,
  calculateIntervalCompletionPercentage
}