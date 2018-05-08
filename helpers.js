const jsonfile = require('jsonfile');

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
  setFailedTests: (options, testResults) => {
    options.data.embeds = [];
    options.data.content = '';
    options.data.content += '**FAILED TESTS:**\n```js\n';
    testResults.forEach(suiteResult => {
      suiteResult.testResults.forEach(testResult => {
        if (testResult.status === 'failed') {
          options.data.content += `${testResult.ancestorTitles} (${testResult.duration}ms)\n`;
        }
      });
    });
    options.data.content += '```';
    return options.data.content;
  },
  setPassedTests: (options, testResults) => {
    options.data.embeds = [];
    options.data.content = '';
    options.data.content += '**PASSED TESTS:**\n```js\n';
    testResults.forEach(suiteResult => {
      suiteResult.testResults.forEach(testResult => {
        if (testResult.status === 'passed') {
          options.data.content += `${testResult.ancestorTitles} (${testResult.duration}ms)\n`;
        }
      });
    });
    options.data.content += '```';
    return options.data.content;
  },
  writeJson: (jsonPath, data) => {
    jsonfile.writeFile(jsonPath, data, err => {
      if (err) {
        console.error(
          `[neoscan-status-reporter] There was an error while creating/updating testStatus.json file: ${err}`
        );
      }
    });
  },
};

module.exports = helpers;
