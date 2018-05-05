# Jest Discord Reporter
Cutomizable Jest reporter with CI integration that sends test results to Discord channel via incoming webhook.

## Set up
1. Set up a [Discord incoming webhook integration](https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
2. Add the webhook URL to `package.json` under `jest-discord-reporter` (mandatory) and optionally customize other settings visible below
```
"jest-discord-reporter": {
  "sendOnlyWhenFailed": true,
  "username": "neoscan-api-reporter",
  "webhookUrl": "https://discordapp.com/api/webhooks/XXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
},
```
3. Set `jest-discord-reporter` as one of the Jest `reporters`
```
"jest": {
  [
    "default",
    "<rootDir>/node_modules/jest-discord-reporter"
  ],
},
```
4. Have fun!

*Note:*
While sending the report, `Environment` field value is taken from `process.env.CI_NETWORK` or `process.env.NETWORK` (environmental variables).