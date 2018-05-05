# Jest Discord Reporter
Cutomizable Jest reporter with CI integration that sends test results to Discord channel via incoming webhook.

## Set up
1. Set up a [Discord incoming webhook integration](https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks).
2. Add reporter to `package.json` under `jest.reporters` and customize settings (only `webhookUrl` is mandatory).
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
- This package uses [env-ci](https://www.npmjs.com/package/env-ci) module to get some variables from CI services.
- While sending the report, `Environment` field value is taken from `process.env.CI_NETWORK` or `process.env.NETWORK` (environmental variables).