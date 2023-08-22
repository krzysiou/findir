const getDirName = (file: string): string => {
  const rightForwardSlash = file.lastIndexOf('/');
  const leftForwardSlash = file
    .substring(0, rightForwardSlash)
    .lastIndexOf('/');

  const label = file.substring(leftForwardSlash + 1, rightForwardSlash);

  return label;
};

export { getDirName };
