## Setup ###

### Angular v4 version ###

1. [Install Node.js](https://www.nodejs.org/en/download/)
2. From terminal in the /angular4 directory run this command: `npm install`
3. To start local server and run app, run this command: `npm start`

## Cross origin fix ##

### Easy solution ###
[Download Firefox](https://www.getfirefox.com)

### Windows 7 / 10 Chrome ###
Close all other instances of Chrome

Right click Chrome shortcut and add --allow-file-access-from-files after "...chrome.exe" in Target

Run Chrome from this shortcut

If this doesn't work try this after "...chrome.exe" instead

--allow-file-access-from-files chrome.exe --user-data-dir=c:\foo --disable-web-security


### macOS Chrome ###
Open terminal and execute the following 

`open /Applications/Google\ Chrome.app/ --args --allow-file-access-from-files`

### Serve files via a http server ###
[Download Node.js](https://www.nodejs.org/en/download/)

Install the node module 'serve' with the following command via the terminal or command prompt:

`npm install -g serve`

Run it with the following command

`serve <path>`

The files can now be accessed via the url below:

`http://localhost:3000`

### Still not working? ###
Try looking [here](http://www.thegeekstuff.com/2016/09/disable-same-origin-policy/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+TheGeekStuff+(The+Geek+Stuff))