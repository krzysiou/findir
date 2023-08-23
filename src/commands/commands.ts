import type { Config } from '../config';
import { finDirId, finDirCallback } from './findir';

interface Command {
  id: string;
  callback: (config: Config) => () => void;
}

const commandList: Command[] = [{ id: finDirId, callback: finDirCallback }];

export { commandList };
