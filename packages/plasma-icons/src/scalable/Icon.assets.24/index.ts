import { AttentionCircle } from './AttentionCircle';
import { SberportalFrontOutline } from './SberportalFrontOutline';
import { MobileFrontOutline } from './MobileFrontOutline';
import { SaluteCircle } from './SaluteCircle';
import { Visa } from './Visa';
import { Mir } from './Mir';
import { Jcb } from './Jcb';
import { MasterCard } from './MasterCard';
import { Sber } from './Sber';
import { SberAlt1 } from './SberAlt1';
import { Salute } from './Salute';
import { Okko } from './Okko';
import { QualitySd } from './QualitySd';
import { QualityHd } from './QualityHd';
import { Rotate90 } from './Rotate90';
import { Rotate } from './Rotate';
import { SberDevices } from './SberDevices';
import { OtherDevices } from './OtherDevices';
import { Scenario } from './Scenario';
import { Picture } from './Picture';
import { Record } from './Record';
import { Fullscreen } from './Fullscreen';
import { FullscreenExit } from './FullscreenExit';
import { Backward } from './Backward';
import { Forward } from './Forward';
import { Cam } from './Cam';
import { VideoArchive } from './VideoArchive';
import { Temperature } from './Temperature';
import { Humidity } from './Humidity';
import { Motion } from './Motion';
import { Smoke } from './Smoke';
import { Flood } from './Flood';

export const iconSet24 = {
    attentionCircle: AttentionCircle,
    sberportalFrontOutline: SberportalFrontOutline,
    mobileFrontOutline: MobileFrontOutline,
    saluteCircle: SaluteCircle,
    visa: Visa,
    mir: Mir,
    jcb: Jcb,
    masterCard: MasterCard,
    sber: Sber,
    sberAlt1: SberAlt1,
    salute: Salute,
    okko: Okko,
    qualitySd: QualitySd,
    qualityHd: QualityHd,
    rotate90: Rotate90,
    rotate: Rotate,
    sberDevices: SberDevices,
    otherDevices: OtherDevices,
    scenario: Scenario,
    picture: Picture,
    record: Record,
    fullscreen: Fullscreen,
    fullscreenExit: FullscreenExit,
    backward: Backward,
    forward: Forward,
    cam: Cam,
    videoArchive: VideoArchive,
    temperature: Temperature,
    humidity: Humidity,
    motion: Motion,
    smoke: Smoke,
    flood: Flood,
};

export type IconSet24 = keyof typeof iconSet24;
