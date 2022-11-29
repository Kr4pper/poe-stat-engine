export const enum DamageType {
    Global = 1 << 0,
    Physical = 1 << 1,
    Chaos = 1 << 2,
    Elemental = 1 << 3,
    Fire = 1 << 4,
    Cold = 1 << 5,
    Lightning = 1 << 6,
}

export enum DamageFlags {
    Global = DamageType.Global,
    Physical = DamageType.Global | DamageType.Physical,
    Chaos = DamageType.Global | DamageType.Chaos,
    Elemental = DamageType.Global | DamageType.Elemental,
    Fire = DamageType.Global | DamageType.Elemental | DamageType.Fire,
    Cold = DamageType.Global | DamageType.Elemental | DamageType.Cold,
    Lightning = DamageType.Global | DamageType.Elemental | DamageType.Lightning,
}

export const damageTypeToString: {[key in DamageType]: string;} = {
    [DamageType.Global]: 'Global',
    [DamageType.Physical]: 'Physical',
    [DamageType.Chaos]: 'Chaos',
    [DamageType.Elemental]: 'Elemental',
    [DamageType.Fire]: 'Fire',
    [DamageType.Cold]: 'Cold',
    [DamageType.Lightning]: 'Lightning',
};

export type Modifier = {type: DamageType; value: number;};
export type Item = Modifier[];
