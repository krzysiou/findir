import { commands, ExtensionContext } from 'vscode';
import { loadConfig } from './config';
import { commandList } from './commands/commands';

const config = loadConfig();

export function activate(context: ExtensionContext) {
  commandList.map(({ id, callback }) => {
    const disposable = commands.registerCommand(id, callback(config));

    context.subscriptions.push(disposable);
  });
}
