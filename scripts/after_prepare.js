#!/usr/bin/env node
'use strict';

var fs = require('fs');

var getPreferenceValue = function(config, name) {
    var value = config.match(new RegExp('name="' + name + '" value="(.*?)"', "i"))
    if(value && value[1]) {
        return value[1]
    } else {
        return null
    }
}

if(process.argv.join("|").indexOf("PUBLISHABLE_KEY=") > -1) {
	var PUBLISHABLE_KEY = process.argv.join("|").match(/PUBLISHABLE_KEY=(.*?)(\||$)/)[1]
} else {
	var config = fs.readFileSync("config.xml").toString()
	var PUBLISHABLE_KEY = getPreferenceValue(config, "PUBLISHABLE_KEY")
}

var files = [
    "platforms/browser/www/plugins/cordova-plugin-facebook4/www/facebook-browser.js",
    "platforms/browser/platform_www/plugins/cordova-plugin-facebook4/www/facebook-browser.js",
    "platforms/browser/www/cordova.js",
    "platforms/browser/platform_www/cordova.js"
]

for(var i in files) {
    try {
    	var contents = fs.readFileSync(files[i]).toString()
	    fs.writeFileSync(files[i], contents.replace(/PUBLISHABLE_KEY/g, PUBLISHABLE_KEY))
	} catch(err) {}
}
