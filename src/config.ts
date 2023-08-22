import { workspace } from 'vscode';

interface Config {
  fileIncludeGlob: string;
  fileExcludeGlob: string;
  maxResults: number;
}

const config = workspace.getConfiguration('finDir');

const loadConfig = (): Config => ({
  fileIncludeGlob: <string>config.get('includeReg'),
  fileExcludeGlob: <string>config.get('excludeReg'),
  maxResults: <number>config.get('limit'),
});

export { loadConfig, type Config };
