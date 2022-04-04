import { Video } from './Video';
import { Temperature } from './Temperature';
import { Humidity } from './Humidity';
import { Motion } from './Motion';
import { BatteryCharge } from './BatteryCharge';
import { Battery100 } from './Battery100';
import { Battery80 } from './Battery80';
import { Battery60 } from './Battery60';
import { Battery40 } from './Battery40';
import { Battery20 } from './Battery20';
import { BatteryEmpty } from './BatteryEmpty';
import { DoorClosed } from './DoorClosed';
import { DoorOpen } from './DoorOpen';
import { Smoke } from './Smoke';
import { Flood } from './Flood';

export const iconSet16 = {
    video: Video,
    temperature: Temperature,
    humidity: Humidity,
    motion: Motion,
    batteryCharge: BatteryCharge,
    battery100: Battery100,
    battery80: Battery80,
    battery60: Battery60,
    battery40: Battery40,
    battery20: Battery20,
    batteryEmpty: BatteryEmpty,
    doorClosed: DoorClosed,
    doorOpen: DoorOpen,
    smoke: Smoke,
    flood: Flood,
};

export type IconSet16 = keyof typeof iconSet16;
