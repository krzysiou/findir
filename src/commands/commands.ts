import { finDirId, finDirCallback } from './findir';
import type { Config } from '../config';

interface Command {
  id: string;
  callback: (config: Config) => () => void;
}

const commandList: Command[] = [{ id: finDirId, callback: finDirCallback }];

export { commandList };
