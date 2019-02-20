import * as vscode from 'vscode';
import * as util from 'util';

export function activate(context: vscode.ExtensionContext) {

  // scan debug console output for a PORT message
  vscode.debug.registerDebugAdapterTrackerFactory('*', {
    createDebugAdapterTracker(session: vscode.DebugSession) {
      const args = session.configuration.serverReadyAction;
      if (args && args.pattern) {
        const regexp = new RegExp(args.pattern);
        return {
          onDidSendMessage: m => {
            if (m.type === 'event' && m.event === 'output' && m.body.output) {
              const result = regexp.exec(m.body.output);
              if (result && result.length === 2) {
                openExternalWithUri(session, util.format(args.urlFormat || 'http://localhost:%s', result[1]));
              }
            }
          }
        };
      }
    }
  });
}

function openExternalWithUri(session: vscode.DebugSession, uri: string) {
  const args = session.configuration.serverReadyAction;
  if (args.debug) {
    vscode.debug.startDebugging(session.workspaceFolder, {
      type: 'chrome',
      name: 'Chrome Debug',
      request: 'launch',
      url: uri,
      webRoot: args.webRoot || '${workspaceFolder}'
    });
  } else {
    vscode.env.openExternal(vscode.Uri.parse(uri));
  }
}
