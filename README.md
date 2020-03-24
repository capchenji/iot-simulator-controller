# Program Purpose

This program is to run iot simulator and controller API. The overall diagram is given here:

![GitHub Logo](/images/logo.png)
Format: ![Alt Text](url)

## Simulator

### Usage

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

If you want to determine number of iot sensors, go to `package.json` and update number:
```
"start": "ts-node src/index.ts --number=3"
```

