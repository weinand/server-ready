# Server Ready

This extension helps when developing web server based software.

When installed **Server Ready** automatically opens a URI in the default browser whenever a server under debugging is ready to accept client connections (and outputs a corresponding message to the debug console).

For this functionality the extension scans the server's output for a configurable pattern and extracts a port number from it.
Based on the port number a URI of the form `http://localhost:port` is constructed and opened in the default browser.
Alternatively the extension can be configured to open the URI in Chrome and start a debug session with the "Chrome Debugger".

## Requirements

If you configure Server Ready to start a debug session (instead of just opening the URI in a browser), you will have to install the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension.

## Using Server Ready

In a launch configuration use Intellisense to add a `serverReadyAction` property. By default this is configured for the pattern `listening on port ([0-9]+)`. If your server program outputs a different message, change the pattern to match the message. Make sure to enclose the regular expression for the port number in parenthesis so that the number becomes available when generating the URI.

This example shows the use of `serverReadyAction` in a launch configuration of a simple Express server:
```ts
{
	"version": "0.2.0",
	"configurations": [
		{
			"type": "node",
			"request": "launch",
			"name": "Launch Express Server",
			"program": "${workspaceFolder}/app.js",

			"serverReadyAction": {
				"pattern": "listening on port ([0-9]+)"
			}
		}
	]
}
```

If necessary you can supply a `uriFormat` to control the shape of the URI and the value of the `webRoot` property passed to the chrome debugger.

Here are all supported properties and their default values:
```ts
"serverReadyAction": {
	"pattern": "listening on port ([0-9]+)",
	"uriFormat": "http://localhost:%s",
	"webRoot": "${workspaceFolder}",
	"debug": true
}
```

## Known Issues

TBD

## Release Notes

### 0.0.1

Initial release of Server Ready.
