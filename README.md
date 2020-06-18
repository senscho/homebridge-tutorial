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

**Adding an accessory**

When homebridge code calls our module it passes itself. We added an argument of our function called 'homebridge' to recieve it. Note that name can be anything.

Now with homebridge object, we can call homebridge related function so we call homebridge object an API (application programming interface).

To add an accessory, call registerAccessory function of homebridge object as shown in the example below.

```js
module.exports = function (homebridge) {
    /*
        API.registerAccessory(PluginIdentifier,
            AccessoryName, AccessoryPluginConstructor)
    */
   homebridge.registerAccessory("homebridge-tutorial",
            "SensMan Volume", volume); 
};
```
When we call this API function, homebridge wants to know which plugin is calling it. That is why it requires the first argument to be the plugin name. Second argument is accessory name and it can be anything. In many homekit products, it is usually the product name. The last one is called a constructor. Constructor is what we will define and it is the core of our accessory.

Now save index.js and restart homebridge then print out the log.
```
$ sudo hb-service restart <- restart homebridge
$ hb-service logs <- see logs. Ctrl+C to stop
```

This will print out some error because we have not defined the constructor. And it is proof that our plugin is loaded by homebridge. So we made a progress
```
[6/18/2020, 2:49:59 AM] ERROR INITIALIZING PLUGIN homebridge-tutorial:
[6/18/2020, 2:49:59 AM] ReferenceError: volume is not defined ...
```