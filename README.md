# Jest Discord Reporter
Cutomizable Jest reporter with CI integration that sends test results to Discord channel via incoming webhook.

## Set up
1. Set up a [Discord incoming webhook integration](https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks).
2. Add reporter to `package.json` under `jest.reporters` and customize your settings (if you set webhook url using `process.env.JEST_DISCORD_WEBHOOK` environment variable, then **none** of them are mandatory). If not, then you have to set it in `package.json`.
```JSON
"jest": {
  "reporters": [
    "default",
    [
      "<rootDir>/node_modules/jest-discord-reporter",
      {
        "sendOnlyWhenFailed": true,
        "username": "jest-discord-reporter",
        "webhookUrl": "https://discordapp.com/api/webhooks/XXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    ]
  ]
}
```

*Notes:*
- This package uses [env-ci](https://www.npmjs.com/package/env-ci) module to get some environment variables from CI services.
- While sending the report, `Environment` field value is taken from `process.env.CI_NETWORK`, and if it's not present, it's taken from `process.env.NETWORK` (environment variables). This allows to set this value independently on CI services.