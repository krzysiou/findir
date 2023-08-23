import { workspace } from 'vscode';

interface Config {
  fileIncludeGlob: string;
  fileExcludeGlob: string;
  maxResults: number;
  forbidFileExt: string[];
  forbidDir: string[];
}

const config = workspace.getConfiguration('finDir');

const loadConfig = (): Config => ({
  fileIncludeGlob: <string>config.get('includeReg'),
  fileExcludeGlob: <string>config.get('excludeReg'),
  maxResults: <number>config.get('limit'),
  forbidFileExt: <string[]>config.get('forbidFileExt'),
  forbidDir: <string[]>config.get('forbidDir'),
});

export { loadConfig, type Config };
