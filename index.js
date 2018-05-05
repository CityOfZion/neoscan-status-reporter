const { duration } = require('./lib/utils');
const request = require('request');
const envCi = require('env-ci');
const { branch, job, jobUrl } = envCi();

let textToSend;

class JestDiscordReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunStart({ numTotalTestSuites }) {
    console.log(`[discord-jest-reporter] Found ${numTotalTestSuites} test suites.`);
  }

  onRunComplete(test, results) {
    const webhookUrl = process.env.JEST_DISCORD_WEBHOOK || this._options.webhookUrl;
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

    const successText = [
      {
        description: `Build [#${job}](${jobUrl}) passed on ${branch} branch.`,
        color: 8781568,
        thumbnail: {
          url: 'https://i.imgur.com/KZMxbBe.png',
        },
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

    const failureText = [
      {
        description: `Build [#${job}](${jobUrl}) failed on ${branch} branch.`,
        color: 16711712,
        thumbnail: {
          url: 'https://i.imgur.com/8F9zGmh.png',
        },
        fields: [
          {
            name: 'Environment',
            value: env,
            inline: true,
          },
          {
            name: 'Duration',
            value: duration(end, start),
            inline: true,
          },
          {
            name: 'Suites',
            value: `Passed: ${numPassedTestSuites}, Failed: ${numFailedTestSuites}, Total: ${numTotalTestSuites}`,
            inline: true,
          },
          {
            name: 'Tests',
            value: `Passed: ${numPassedTests}, Failed: ${numFailedTests}, Total: ${numTotalTests}`,
            inline: true,
          },
        ],
      },
    ];

    if (testFailed) {
      textToSend = failureText;
    } else {
      textToSend = successText;
    }

    const options = {
      uri: webhookUrl,
      method: 'POST',
      json: {
        embeds: textToSend,
        username: this._options.username || 'jest-discord-reporter',
      },
    };

    if (!process.env.JEST_DISCORD_WEBHOOK && !webhookUrl)
      throw new Error(
        'Please add a Discord webhookUrl as environment variable called JEST_DISCORD_WEBHOOK or as jest-discord-reporter configuration on your package.json '
      );

    if (sendOnlyWhenFailed && testFailed) {
      request(options);
    } else if (!sendOnlyWhenFailed) {
      request(options);
    }
  }
}

module.exports = JestDiscordReporter;
