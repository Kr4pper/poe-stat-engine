import {BehaviorSubject, filter, mergeMap, scan, Subject, tap} from 'rxjs';
import {DamageFlags, DamageType, damageTypeToString, Item} from './api';

export class Character {
    private itemStream = new Subject<Item>();
    private modifierStream = this.itemStream.pipe(mergeMap(([...modifiers]) => modifiers));
    private equippedItems = new Map<string, Item>();

    characterStats = {
        [DamageType.Global]: this.logFilter(DamageFlags.Global, 'Global Dmg'),
        [DamageType.Physical]: this.logFilter(DamageFlags.Physical, 'Physical Dmg'),
        [DamageType.Chaos]: this.logFilter(DamageFlags.Chaos, 'Chaos Dmg'),
        [DamageType.Elemental]: this.logFilter(DamageFlags.Elemental, 'Elemental Dmg'),
        [DamageType.Fire]: this.logFilter(DamageFlags.Fire, 'Fire Dmg'),
        [DamageType.Cold]: this.logFilter(DamageFlags.Cold, 'Cold Dmg'),
        [DamageType.Lightning]: this.logFilter(DamageFlags.Lightning, 'Lightning Dmg'),
    };

    constructor(public name: string) {
        console.log(`${name} has arrived`);
    }

    equipItem(item: Item) {
        console.log(`\n> ${this.name} equips item [${item.map(mod => `${damageTypeToString[mod.type]}: ${mod.value}`).join(', ')}]`);
        this.itemStream.next(item);
    };

    unequipItem(item: Item) {
        console.log(`\n> ${this.name} unequips item [${item.map(mod => `${damageTypeToString[mod.type]}: ${mod.value}`).join(', ')}]`);
        this.itemStream.next(item.map(mod => ({...mod, value: -mod.value})));
    };

    private dmgFilter(flags: DamageFlags) {
        return this.modifierStream.pipe(
            filter(mod => (mod.type & flags) === mod.type),
            scan((acc, mod) => acc + mod.value, 0),
        );
    }

    private logFilter(flags: DamageFlags, description: string) {
        const sub = new BehaviorSubject(0);
        this.dmgFilter(flags).pipe(tap(value => console.log(`${description}: ${value}`))).subscribe(sub);
        return sub;
    };

}
