import * as migration_20250603_201631 from './20250603_201631';
import * as migration_20250705_172601 from './20250705_172601';
import * as migration_20250706_195715 from './20250706_195715';
import * as migration_20250720_115508 from './20250720_115508';
import * as migration_20250810_085733 from './20250810_085733';
import * as migration_20250816_053822 from './20250816_053822';
import * as migration_20250816_060815 from './20250816_060815';
import * as migration_20251025_042846 from './20251025_042846';

export const migrations = [
  {
    up: migration_20250603_201631.up,
    down: migration_20250603_201631.down,
    name: '20250603_201631',
  },
  {
    up: migration_20250705_172601.up,
    down: migration_20250705_172601.down,
    name: '20250705_172601',
  },
  {
    up: migration_20250706_195715.up,
    down: migration_20250706_195715.down,
    name: '20250706_195715',
  },
  {
    up: migration_20250720_115508.up,
    down: migration_20250720_115508.down,
    name: '20250720_115508',
  },
  {
    up: migration_20250810_085733.up,
    down: migration_20250810_085733.down,
    name: '20250810_085733',
  },
  {
    up: migration_20250816_053822.up,
    down: migration_20250816_053822.down,
    name: '20250816_053822',
  },
  {
    up: migration_20250816_060815.up,
    down: migration_20250816_060815.down,
    name: '20250816_060815',
  },
  {
    up: migration_20251025_042846.up,
    down: migration_20251025_042846.down,
    name: '20251025_042846'
  },
];
