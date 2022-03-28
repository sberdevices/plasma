import { Video } from './Video';
import { Alpha } from './Alpha';
import { Spasibo } from './Spasibo';
import { IncomingCall } from './IncomingCall';
import { OutgoingCall } from './OutgoingCall';
import { Volume1 } from './Volume1';
import { VideoOff } from './VideoOff';
import { CallCircle } from './CallCircle';
import { Call } from './Call';
import { EndCallCircle } from './EndCallCircle';
import { EndCall } from './EndCall';
import { Mic } from './Mic';
import { MicOff } from './MicOff';
import { Vk } from './Vk';
import { ChevronDown } from './ChevronDown';
import { DisclosureRight } from './DisclosureRight';
import { Lock } from './Lock';
import { DoneFill } from './DoneFill';
import { ChevronUp } from './ChevronUp';
import { Minus } from './Minus';
import { Plus } from './Plus';
import { Cross } from './Cross';
import { Done } from './Done';
import { DoneDouble } from './DoneDouble';
import { Play } from './Play';
import { CallEndFill } from './CallEndFill';
import { Calendar } from './Calendar';
import { Salute } from './Salute';
import { Office } from './Office';
import { Doc } from './Doc';
import { Pin } from './Pin';
import { Home } from './Home';
import { Star } from './Star';
import { Add } from './Add';
import { Profile } from './Profile';
import { Work } from './Work';

export const iconSet16 = {
    video: Video,
    alpha: Alpha,
    spasibo: Spasibo,
    incomingCall: IncomingCall,
    outgoingCall: OutgoingCall,
    volume1: Volume1,
    videoOff: VideoOff,
    callCircle: CallCircle,
    call: Call,
    endCallCircle: EndCallCircle,
    endCall: EndCall,
    mic: Mic,
    micOff: MicOff,
    vk: Vk,
    chevronDown: ChevronDown,
    disclosureRight: DisclosureRight,
    lock: Lock,
    doneFill: DoneFill,
    chevronUp: ChevronUp,
    minus: Minus,
    plus: Plus,
    cross: Cross,
    done: Done,
    doneDouble: DoneDouble,
    play: Play,
    callEndFill: CallEndFill,
    calendar: Calendar,
    salute: Salute,
    office: Office,
    doc: Doc,
    pin: Pin,
    home: Home,
    star: Star,
    add: Add,
    profile: Profile,
    work: Work,
};

export type IconSet16 = keyof typeof iconSet16;
