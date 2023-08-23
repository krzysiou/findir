import { window, workspace } from 'vscode';
import type { Config } from '../config';
import { getDir } from '../utils';

const id = 'findir.finDir';

interface Directory {
  label: string;
  filePath: string;
  description: string;
}

const callback = (config: Config) => () => {
  if (workspace.workspaceFolders === undefined) {
    return;
  }

  const {
    fileIncludeGlob,
    fileExcludeGlob,
    maxResults,
    forbidFileExt,
    forbidDir,
  } = config;

  const workspacePath = workspace.workspaceFolders[0].uri.path;
  const getExtension = /(?:\.([^.]+))?$/;
  const directories: Directory[] = [];

  workspace
    .findFiles(fileIncludeGlob, fileExcludeGlob, maxResults)
    .then((uris) => {
      uris.map((file) => {
        const filePath = file.fsPath;
        const { label, description } = getDir(filePath, workspacePath);

        const directoryNotRoot = description !== '/';
        const directoryNotForbidden = !forbidDir.some((dir) =>
          filePath.includes(`/${dir}/`)
        );
        const fileExtNotForbidden = !forbidFileExt.includes(
          getExtension.exec(filePath)!.toString().split(',')[1]
        );
        const directoryNotSaved = !directories.some(
          (directory) => directory.description === description
        );

        if (
          directoryNotRoot &&
          directoryNotSaved &&
          directoryNotForbidden &&
          fileExtNotForbidden
        ) {
          directories.push({
            label: `${label}`,
            filePath,
            description,
          });
        }
      });

      window
        .showQuickPick(directories, {
          placeHolder: 'Search directories by name',
          matchOnDescription: true,
        })
        .then((directory) => {
          if (!directory) {
            return;
          }

          workspace.openTextDocument(directory.filePath).then((document) => {
            window.showTextDocument(document);
          });
        });
    });
};

export { id as finDirId, callback as finDirCallback };
