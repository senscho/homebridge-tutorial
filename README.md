# HomeBridge Plugin Development Tutorial

Click YouTube Thumbnail to watch tutorial videos in each section. Note that I am not an NodeJS expert. In fact, I just learned from other peoples code for this project. Any error correction / feedback are welcome.

## Introduction
[![Tutorial #0 Video](http://img.youtube.com/vi/nWVQgxRgydY/0.jpg)](https://www.youtube.com/watch?v=nWVQgxRgydY "Tutorial #0 Video")

Before going further please,
* Make sure that you have an iPhone
* Install [Homebridge](http://homebridge.io) on your preferred computer; i.e. Mac, PC, or Raspberry pi
* Add homebridge to your HomeKit

## Bringing up plugin and adding an accessory

Homebridge Plugin is in a form of NodeJS Module so the first step is to creat a module. Homebridge only searches module with name starting with "homebridge-" and checks the keyword section of package.json file; the keyword should be homebridge-plugin.

I made a directory "homebridge-tutorial" to store my codes. Under the directory two files are required to be a module: i.e. index.js and package.json.

index.js
```js
// index.js
"use strict";
module.exports = function (homebridge) {
};
```

packages.json
```json
{
  "name": "homebridge-tutorial",
  "version": "0.0.1",
  "description": "Description for Homebridge Tutorial",
  "license": "the most strict license",
  "keywords": [
    "homebridge-plugin"
  ],
  "engines": {
    "node": ">=10.17.0",
    "homebridge": ">=0.4.8"
  },
  "dependencies": {}
}
```

Now time to install my module so that homebridge can load. In the directory where package.json lives, run the following command. It will create a symbolic link in nodejs module path that points our module directory.
```
sudo npm link
```

Refresh your homebridge config web interface. Plugin should be found there.