import { window, workspace } from 'vscode';
import type { Config } from '../config';
import { getDirName } from '../utils';

const finDirId = 'findir.finDir';

interface Directory {
  label: string;
  filePath: string;
}

const finDirCallback = (config: Config) => () => {
  if (workspace.workspaceFolders === undefined) {
    return;
  }

  const { fileIncludeGlob, fileExcludeGlob, maxResults } = config;
  const directories: Directory[] = [];

  workspace
    .findFiles(fileIncludeGlob, fileExcludeGlob, maxResults)
    .then((uris) => {
      uris.map((file) => {
        const label = getDirName(file.fsPath);
        const filePath = file.fsPath;

        if (!directories.some((directory) => directory.label === label)) {
          directories.push({ label, filePath });
        }
      });

      window.showQuickPick(directories).then((directory) => {
        if (!directory) {
          return;
        }

        workspace.openTextDocument(directory.filePath).then((document) => {
          window.showTextDocument(document);
        });
      });
    });
};

export { finDirId, finDirCallback };
