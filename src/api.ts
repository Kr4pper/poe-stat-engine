export enum DamagePrimaryType {
    Global = 1 << 0,
    Physical = 1 << 1,
    Chaos = 1 << 2,
    Elemental = 1 << 3,
    Fire = 1 << 4,
    Cold = 1 << 5,
    Lightning = 1 << 6,
}

export enum DamageSecondaryType {
    Hit = 1 << 20,
    Dot = 1 << 21,
    Area = 1 << 22,
    Projectile = 1 << 23,
    Poison = 1 << 24,
}

export type DamageType = DamagePrimaryType | DamageSecondaryType;

export enum DamageFlags {
    Global = DamagePrimaryType.Global,
    Physical = DamagePrimaryType.Global | DamagePrimaryType.Physical,
    Chaos = DamagePrimaryType.Global | DamagePrimaryType.Chaos,
    Elemental = DamagePrimaryType.Global | DamagePrimaryType.Elemental,
    Fire = DamagePrimaryType.Global | DamagePrimaryType.Elemental | DamagePrimaryType.Fire,
    Cold = DamagePrimaryType.Global | DamagePrimaryType.Elemental | DamagePrimaryType.Cold,
    Lightning = DamagePrimaryType.Global | DamagePrimaryType.Elemental | DamagePrimaryType.Lightning,
    Hit = DamagePrimaryType.Global | DamageSecondaryType.Hit,
    Dot = DamagePrimaryType.Global | DamageSecondaryType.Dot,
    Area = DamagePrimaryType.Global | DamageSecondaryType.Area,
    Projectile = DamagePrimaryType.Global | DamageSecondaryType.Projectile,
    Poison = DamagePrimaryType.Global | DamagePrimaryType.Chaos | DamageSecondaryType.Dot | DamageSecondaryType.Poison,
}

type Hashtable = {[key: string]: number;};

const simpleDamageFlags: Hashtable = Object.entries(DamageFlags)
    .filter(([_, v]) => Number.isInteger(v))
    .reduce((res, [k, v]) => ({...res, [k]: v}), {});

const compoundDamageFlags = Object.entries(DamagePrimaryType)
    .filter(([k, v]) => Number.isInteger(v) && k !== 'Global') // TODO: maybe exclude GLOBAL here?
    .reduce((outerAcc, [primaryKey, primaryValue]) => ({
        ...outerAcc,
        ...Object.entries(DamageSecondaryType)
            .filter(([_, v]) => Number.isInteger(v))
            .reduce((innerAcc, [secondaryKey, secondaryValue]) => ({
                ...innerAcc,
                [primaryKey + secondaryKey]: DamagePrimaryType.Global | (primaryValue as DamagePrimaryType) | (secondaryValue as DamageSecondaryType),
            }), {} as Hashtable),
    }), {} as Hashtable);

export const damageFlags = {...simpleDamageFlags, ...compoundDamageFlags};

export const damageTypeToString: {[key in DamagePrimaryType | DamageSecondaryType]: string;} = Object.entries(damageFlags).reduce((res, [k, v]) => ({...res, [v]: k}), {});

export type Modifier = {type: DamageType; value: number;};

export class Item {
    constructor(public name: string, public modifiers: Modifier[]) {}

    toString() {
        return `"${this.name}" (${this.modifiers.map(modifier => `${damageTypeToString[modifier.type | DamagePrimaryType.Global]}: ${modifier.value}`).join(', ')})`;
    }
}
