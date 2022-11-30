import {BehaviorSubject, filter, mergeMap, scan, Subject, tap} from 'rxjs';
import {damageFlags, DamageFlags, damageTypeToString, Item, Modifier} from './api';

export class Character {
    private itemStream = new Subject<Modifier[]>();
    private modifierStream = this.itemStream.pipe(mergeMap(([...modifiers]) => modifiers));
    public equippedItems = new Map<string, Item>();

    characterStats = Object
        .entries(damageFlags)
        .reduce((acc, [key, value]) => ({
            ...acc,
            [key]: this.logFilter(value, key, false)
        }), {} as {[key: string]: BehaviorSubject<number>;});

    constructor(public name: string) {
        console.log(`${name} has arrived`);
    }

    equipItem(item: Item) {
        const {name, modifiers} = item;
        if (this.equippedItems.has(name)) {
            console.warn(`"${name}" is already equipped`);
            return;
        }

        console.log(`\n${this.name} equips ${item}`);
        this.itemStream.next(modifiers);
        this.equippedItems.set(name, item);
    };

    unequipItem(item: Item) {
        const {name, modifiers} = item;
        if (!this.equippedItems.has(name)) {
            console.warn(`"${name}" is not equipped`);
            return;
        }

        console.log(`\n${this.name} unequips ${item}`);
        this.itemStream.next(modifiers.map(modifier => ({...modifier, value: -modifier.value})));
        this.equippedItems.delete(name);
    };

    getStat(flags: DamageFlags) {
        return this.characterStats[damageTypeToString[flags]]?.value;
    }

    dumpStats() {
        console.log(
            Object.entries(this.characterStats)
                .filter(([_, v]) => v.value !== 0)
                .map(([k, v]) => [k, v.value]),
        );
    }

    dumpInventory() {
        console.log(`${this.name} inventory:\n${[...this.equippedItems.values()].map(item => `> ${item.toString()}`).join('\n')}`);
    }

    private dmgFilter(flags: DamageFlags) {
        return this.modifierStream.pipe(
            filter(modifier => (modifier.type & flags) === modifier.type),
            scan((acc, modifier) => acc + modifier.value, 0),
        );
    }

    private logFilter(flags: DamageFlags, description: string, logEvents: boolean) {
        const sub = new BehaviorSubject(0);
        this.modifierStream.pipe(
            filter(modifier => (modifier.type & flags) === modifier.type),
            scan((acc, modifier) => acc + modifier.value, 0),
            tap(newValue => logEvents && console.log(`${description}: ${newValue}`))
        ).subscribe(sub);
        return sub;
    };
}
