
# Creating & Sharing Plugins for BetterWRD
Plugins are scripts often written by other people to increase or change functionality of WeAreDevs.\
It's easy to create & share plugins! This guide will teach you everything you have to know.


### Getting Started
First things first, create a file named `plugin.bwrd.js`. You'll use this file to load the plugin on BetterWRD (name must end with `.bwrd.js`).\
This is how the script should look like:

```js
/*
    @name My First Plugin
    @version 1.0.0
    @description My cool plugin.
    @author You
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/plugin.bwrd.js
*/


// Your plugin's script:
console.log("Hello!");
```

The `@source` is your plugin's update link. It has to be a raw GitHub URL.


&nbsp;
### Requirements and additional info
The following requirements must be met for BetterWRD to register your file as a plugin:
- The file name must end with `.bwrd.js`
- The plugin must be contained within a single file
- Plugin name can't be changed between versions


&nbsp;
### How to load the plugin on BetterWRD
1. Go to BetterWRD settings
2. Click `Plugins` on the side menu
3. Drag & Drop your plugin on the page


&nbsp;
### Developing Plugins
I recommend using [github.com/davve77/bwrd-plugin-dev-server](https://github.com/davve77/bwrd-plugin-dev-server) for developing plugins.  
It makes the process much faster and easier.


&nbsp;
### Using BetterWRD's own Plugin API
The API currently has 14 simple but useful functions:
```js
bwrd.injectStyle("CSS");
bwrd.includeLibrary("URL", isModule); // Loads an external library.
bwrd.getSettings(); // Returns the plugin's settings in JSON format.
bwrd.setSettings({"setting": "value", "setting2": "value2"});
bwrd.alert("title", "content"); // Creates an alert box modal.
bwrd.confirm("content", function(choice)); // Callback parameter (choice) is a boolean based on the user's choice.
bwrd.getVersion(); // Returns the currently installed BetterWRD version number.
bwrd.getPlugin(); // Returns the plugin's name, version and source as a JSON object.
bwrd.copyToClipboard("string");
bwrd.showChangelog("Update date", ["Added ...", "Fixed ..."]); // Shows a changelog menu after the plugin is updated.
bwrd.handleErrors(function, parameters); // Wraps function in try-catch.
bwrd.stripHTML("string"); // Removes HTML tags from string.
bwrd.validateJSON("string"); // Checks if string is a valid JSON.
bwrd.getUser().then(info => console.log(info)); // Prints the user's name, avatar, reputation, join date etc.
```


&nbsp;
### How do Plugins get updated?
BetterWRD periodically checks for plugin updates every 3 hours.\
If the `@version` number on GitHub is different than the one stored on the user's browser (and of course if the `@source` URL is valid), BetterWRD will create a notice bar at the bottom of the page asking the user to update the outdated plugins.

![image](https://cdn.discordapp.com/attachments/800294579856605204/937412167966261248/unknown.png)

Or of course, you can do it manually from the Plugins page.


&nbsp;
### Distributing your Plugin to the community
How to add your plugin to the repository
1. Go to [https://github.com/davve77/BetterWRD-Plugins/tree/main/plugins](https://github.com/davve77/BetterWRD-Plugins/tree/main/plugins)
2. Click `Add file` -> `Create new file` <br><br> <kbd>![image](https://cdn.discordapp.com/attachments/800294579856605204/938813484110598194/unknown.png)</kbd> <br><br>
3. Once you're done filling out the name & file contents, click `Propose new file` <br><br> <kbd>![image](https://cdn.discordapp.com/attachments/800294579856605204/938815596500496454/unknown.png)</kbd> <br><br>
4. Click `Create pull request` <br><br> <kbd>![image](https://cdn.discordapp.com/attachments/800294579856605204/938817082538205214/unknown.png)</kbd> <br><br>
5. Wait for your plugin to be manually verified. This can take up to 48 hours.
<!-- end of the list -->
You can also share your plugin on the WeAreDevs forum.


&nbsp;
### Are Plugins Safe?
Plugins on this repository are thoroughly checked for malicious code before adding/updating.\
However, safety is not guaranteed for plugins outside the repository.


&nbsp;
### Plugin Policies
Your plugin will get rejected if it breaks any of the following guidelines:
- Must not use eval() or Function constructor
- Must not use closed source libraries
- Must not access sensitive data (user tokens, passwords, etc.)
- Must not edit BetterWRD globals
- Must not collect user data without opt-in consent
- Must not attempt to modify BetterWRD functionality
    - Instead, you may open pull requests in [github.com/davve77/BetterWRD](https://github.com/davve77/BetterWRD)
- Must not be obfuscated or minified
