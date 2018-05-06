<p align="center">
  <img 
    src="http://res.cloudinary.com/vidsy/image/upload/v1503160820/CoZ_Icon_DARKBLUE_200x178px_oq0gxm.png" 
    width="125px"
    alt="City of Zion logo">
</p>

<p align="center" style="font-size: 32px;">
  <strong>neoscan-status-reporter</strong>
</p>

<p align="center">
  Cutomizable <a href="https://github.com/facebook/jest">Jest</a> reporter with CI integration that sends test results to <a href="https://discordapp.com/">Discord</a> channel via incoming webhook. Used by API tests in <a href="https://github.com/CityOfZion/neo-scan">neo-scan</a> repository.
  <br />
	<br />
	<hr />
	<img src="https://i.imgur.com/Dn3TAtb.png" alt="">
</p>

***

## Set up
1. Set up a [Discord incoming webhook integration](https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks).
2. Add reporter to `package.json` under `jest.reporters` and customize your settings (if you set webhook url using `process.env.NEOSCAN_REPORTER_WEBHOOK` environment variable, then **none** of them are mandatory). If not, then you have to set it in `package.json`.
```JSON
"jest": {
  "reporters": [
    "default",
    [
      "<rootDir>/node_modules/neoscan-status-reporter",
      {
        "sendOnlyWhenFailed": true,
        "username": "neoscan-status-reporter",
        "webhookUrl": "https://discordapp.com/api/webhooks/XXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    ]
  ]
}
```

*Notes:*
- This package uses [env-ci](https://www.npmjs.com/package/env-ci) module to get some environment variables from CI services.
- While sending the report, `Environment` field value is taken from `process.env.CI_NETWORK`, and if it's not present, it's taken from `process.env.NETWORK` (environment variables). This allows to set this value independently on CI services.