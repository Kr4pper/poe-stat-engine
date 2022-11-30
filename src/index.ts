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
//klaus.equipItem(unityDev);
//klaus.unequipItem(quinton);
klaus.dumpStats();
klaus.dumpInventory();
console.log(klaus.getStat(damageFlags.Poison));
klaus.unequipItem(quinton);
console.log(klaus.getStat(damageFlags.Chaos | damageFlags.Dot));
