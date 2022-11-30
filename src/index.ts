import {damageFlags, DamagePrimaryType, Item} from './api';
import {Character} from './character';

const quinton = new Item('Clown', [
    {type: damageFlags.Chaos, value: 10},
    {type: damageFlags.Poison, value: 10},
    {type: damageFlags.Dot, value: 10},
    {type: damageFlags.Chaos | damageFlags.Dot, value: 10},
]);
const unityDev = new Item('xdd', [
    {type: DamagePrimaryType.Global, value: -69},
]);

const klaus = new Character('Klaus');
klaus.equipItem(quinton);
klaus.equipItem(quinton);
klaus.dumpInventory();
klaus.dumpStats();
console.log('poison', klaus.getStat(damageFlags.Poison));
console.log('chaos dot', klaus.getStat(damageFlags.Chaos | damageFlags.Dot));
klaus.unequipItem(quinton);
/*
console.log('poison', klaus.getStat(damageFlags.Poison));
console.log('chaos dot', klaus.getStat(damageFlags.Chaos | damageFlags.Dot));
klaus.equipItem(unityDev);
console.log('poison', klaus.getStat(damageFlags.Poison));
console.log('chaos dot', klaus.getStat(damageFlags.Chaos | damageFlags.Dot));
klaus.dumpStats();
*/
