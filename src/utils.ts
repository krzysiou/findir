const getDir = (file: string, workspacePath: string) => {
  const filePath = file.replace(workspacePath, '');
  const endOfDir = filePath.lastIndexOf('/');
  const directoryPath = filePath.substring(1, endOfDir);
  const startOfDir = directoryPath.lastIndexOf('/');
  const directoryName = directoryPath.substring(startOfDir + 1, endOfDir);

  return { label: directoryName, description: directoryPath };
};

export { getDir };
