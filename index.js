const { duration } = require('./lib/utils');
const request = require('request');
const envCi = require('env-ci');
const { branch, job, jobUrl } = envCi();

class NeoscanStatusReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunStart({ numTotalTestSuites }) {
    console.log(`[neoscan-status-reporter] Found ${numTotalTestSuites} test suites.`);
  }

  onRunComplete(test, results) {
    const webhookUrl = process.env.NEOSCAN_REPORTER_WEBHOOK || this._options.webhookUrl;
    const sendOnlyWhenFailed = this._options.sendOnlyWhenFailed || false;
    const env = process.env.CI_NETWORK || process.env.NETWORK || '';
    const {
      numPassedTestSuites,
      numFailedTestSuites,
      numTotalTestSuites,
      numFailedTests,
      numPassedTests,
      numTotalTests,
      startTime,
    } = results;
    const testFailed = numFailedTests || numFailedTestSuites;
    const end = new Date();
    const start = new Date(startTime);

    let textToSend = [
      {
        thumbnail: {},
        fields: [
          {
            name: 'Environment',
            value: env,
          },
          {
            name: 'Duration',
            value: duration(end, start),
          },
          {
            name: 'Suites',
            value: `Passed: ${numPassedTestSuites}, Failed: ${numFailedTestSuites}, Total: ${numTotalTestSuites}`,
          },
          {
            name: 'Tests',
            value: `Passed: ${numPassedTests}, Failed: ${numFailedTests}, Total: ${numTotalTests}`,
          },
        ],
      },
    ];

    if (testFailed) {
      textToSend[0].description = `Build [#${job}](${jobUrl}) failed on ${branch} branch.`;
      textToSend[0].thumbnail.url = 'https://i.imgur.com/8F9zGmh.png';
      textToSend[0].color = 16711712;
    } else {
      textToSend[0].description = `Build [#${job}](${jobUrl}) passed on ${branch} branch.`;
      textToSend[0].thumbnail.url = 'https://i.imgur.com/KZMxbBe.png';
      textToSend[0].color = 8781568;
    }

    const options = {
      uri: webhookUrl,
      method: 'POST',
      json: {
        embeds: textToSend,
        username: this._options.username || 'neoscan-status-reporter',
      },
    };

    if (!process.env.NEOSCAN_REPORTER_WEBHOOK && !webhookUrl)
      throw new Error(
        'Please add a Discord webhookUrl as environment variable called NEOSCAN_REPORTER_WEBHOOK or as neoscan-status-reporter configuration on your package.json '
      );

    if (process.env.SEND_DETAILS) {
      request(options);
    } else if (sendOnlyWhenFailed && testFailed) {
      request(options);
    } else if (!sendOnlyWhenFailed) {
      request(options);
    }
  }
}

module.exports = NeoscanStatusReporter;
