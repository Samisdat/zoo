export type IucnStatus = 'EX' | 'EW' | 'CR' | 'EN' | 'VU' | 'NT' | 'LC' | 'DD' | 'NE';

export const EXTINCT: IucnStatus = 'EX';
export const EXTINCT_IN_THE_WILD: IucnStatus = 'EW';
export const CRITICALLY_ENDANGERED: IucnStatus = 'CR';
export const ENDANGERED: IucnStatus = 'EN';
export const VULNERABLE: IucnStatus = 'VU';
export const NEAR_THREATENED: IucnStatus = 'NT';
export const LEAST_CONCERN: IucnStatus = 'LC';
export const DATA_DEFICIENT: IucnStatus = 'DD';

export const IUCN_STATI: IucnStatus[] = [
    EXTINCT,
    EXTINCT_IN_THE_WILD,
    CRITICALLY_ENDANGERED,
    ENDANGERED,
    VULNERABLE,
    NEAR_THREATENED,
    LEAST_CONCERN,
    DATA_DEFICIENT,
];