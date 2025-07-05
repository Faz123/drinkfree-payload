import * as migration_20250603_201631 from './20250603_201631';
import * as migration_20250705_172601 from './20250705_172601';

export const migrations = [
  {
    up: migration_20250603_201631.up,
    down: migration_20250603_201631.down,
    name: '20250603_201631',
  },
  {
    up: migration_20250705_172601.up,
    down: migration_20250705_172601.down,
    name: '20250705_172601'
  },
];
