const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;

exports.formatTime = function(ms) {
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
};

exports.duration = function(end, start) {
  return exports.formatTime(end - start);
};

exports = module.exports;
