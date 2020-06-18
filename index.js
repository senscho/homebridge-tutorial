"use strict";
/*
    run script in strict mode; i.e. not allowing
    - use of undeclared var
    - deleting var or obj
    - deleting function
    - etc....

    I think most other languages just don't allow it.
    JS without strict mode seems just too flexible.
*/

// declare variables for easy access to often-used long-named variables
let Service, Characteristic;

module.exports = function (homebridge) {
    /*
        API.registerAccessory(PluginIdentifier,
            AccessoryName, AccessoryPluginConstructor)
    */

    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory('homebridge-tutorial',
        'SensMan Volume', volume);
};

/* 
    AccessoryPlugin = new constructor(logger,
        accessoryConfig, this.api);

    Excerpted from Homebridge server code
    This is called for each accessory definition in
    homebridge's config file
*/

function volume(log, config, api) {
    this.log = log;
    this.config = config;
    this.homebridge = api;

    if (this.config.defaultVolume)
        this.defaultVolume = this.config.defaultVolume;
    else
        this.defaultVolume = 10;

    this.log('Volume accessory is Created!');
    this.log('defaultVolume is ' + this.defaultVolume);

    this.bulb = new Service.Lightbulb(this.config.name);
    // Set up Event Handler for bulb on/off
    this.bulb.getCharacteristic(Characteristic.On)
        .on("get", this.getPower.bind(this))
        .on("set", this.setPower.bind(this));
    
    this.log('all event handler was setup.')
};

volume.prototype = {
    getServices: function() {
        if (!this.bulb) return [];
        this.log('Homekit asked to report service');
        const infoService =  
            new Service.AccessoryInformation();
        infoService
            .setCharacteristic(Characteristic.Manufacturer,
                'SensMan')
        return [infoService, this.bulb];
    },    
    getPower: function(callback) {
        this.log('Homekit Asked Power State');
        callback(null,true)
    },
    setPower: function(on, callback) {
        this.log('Homekit Gave New Power State' + ' ' + on);
        callback(null)
    }
}