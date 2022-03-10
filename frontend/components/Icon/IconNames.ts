import {faUtensils} from '@fortawesome/free-solid-svg-icons/faUtensils';
import {faGlobeEurope} from '@fortawesome/free-solid-svg-icons/faGlobeEurope';
import {faGlobeAsia} from '@fortawesome/free-solid-svg-icons/faGlobeAsia';
import {faGlobeAfrica} from '@fortawesome/free-solid-svg-icons/faGlobeAfrica';
import {faGlobeAmericas} from '@fortawesome/free-solid-svg-icons/faGlobeAmericas';
import {faRulerVertical} from '@fortawesome/free-solid-svg-icons/faRulerVertical';
import {faRulerHorizontal} from '@fortawesome/free-solid-svg-icons/faRulerHorizontal';
import {faWeight} from '@fortawesome/free-solid-svg-icons/faWeight';
import {faBaby} from '@fortawesome/free-solid-svg-icons/faBaby';
import {faHourglassHalf} from '@fortawesome/free-solid-svg-icons/faHourglassHalf';
import {faEgg} from '@fortawesome/free-solid-svg-icons/faEgg';
import {faFish} from '@fortawesome/free-solid-svg-icons/faFish';
import {faDrumstickBite} from '@fortawesome/free-solid-svg-icons';
import {faCarrot} from '@fortawesome/free-solid-svg-icons/faCarrot';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faPaw} from '@fortawesome/free-solid-svg-icons/faPaw';
import {faBook} from '@fortawesome/free-solid-svg-icons/faBook';
import {faMap} from '@fortawesome/free-solid-svg-icons/faMap';
import {faNewspaper} from '@fortawesome/free-solid-svg-icons/faNewspaper';
import {faCode} from '@fortawesome/free-solid-svg-icons/faCode';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons/faChevronDown';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp';
import {faDirections} from '@fortawesome/free-solid-svg-icons/faDirections';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';

const utensils = faUtensils;
const europe = faGlobeEurope;
const asia = faGlobeAsia;
const afrika = faGlobeAfrica;
const americas = faGlobeAmericas;
const height = faRulerVertical;
const length = faRulerHorizontal;
const weight = faWeight;
const baby = faBaby;
const hourglass = faHourglassHalf;
const egg = faEgg;
const fish = faFish;
const meat = faDrumstickBite;
const carrot = faCarrot;
const home = faHome;
const paw = faPaw;
const book = faBook;
const map = faMap;
const newspaper = faNewspaper;
const code = faCode;
const chevron_down = faChevronDown;
const chevron_up = faChevronUp;
const chevron_left = faChevronLeft;
const chevron_right = faChevronRight;
const directions = faDirections;
const close = faTimes;
const menu = faBars;

export const strapiIcons = {
    utensils,
    europe,
    asia,
    afrika,
    americas,
    height,
    length,
    weight,
    baby,
    hourglass,
    egg,
    fish,
    meat,
    carrot,
    menu,
};

export const internalIcons = {
    home,
    paw,
    book,
    map,
    newspaper,
    code,
    chevron_down,
    chevron_up,
    chevron_left,
    chevron_right,
    directions,
    close,
};

export const validIcons = Object.assign(strapiIcons, internalIcons);

export type IconName =
    'utensils' |
    'europe' |
    'asia' |
    'afrika' |
    'americas' |
    'height' |
    'length' |
    'weight' |
    'baby' |
    'hourglass' |
    'egg' |
    'fish' |
    'meat' |
    'carrot' |
    'home' |
    'paw' |
    'book' |
    'map' |
    'newspaper' |
    'code' |
    'chevron_down' |
    'chevron_up' |
    'chevron_left' |
    'chevron_right' |
    'directions' |
    'close' |
    'menu'
;

