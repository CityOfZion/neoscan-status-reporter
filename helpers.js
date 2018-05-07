const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;

const helpers = {
  formatTime: ms => {
    if (ms >= d) {
      return `${Math.round(ms / d)}d`;
    }
    if (ms >= h) {
      return `${Math.round(ms / h)}h`;
    }
    if (ms >= m) {
      return `${Math.round(ms / m)}m`;
    }
    if (ms >= s) {
      return `${Math.round(ms / s)}s`;
    }
    return `${ms}ms`;
  },
  duration: (end, start) => {
    return helpers.formatTime(end - start);
  },
};

module.exports = helpers;
