import {DamageType} from './api';
import {Character} from './character';

const klaus = new Character('Klaus');
klaus.equipItem([
    {type: DamageType.Global, value: 40},
    {type: DamageType.Fire, value: 10},
]);
klaus.equipItem([
    {type: DamageType.Elemental, value: -30},
    {type: DamageType.Cold, value: 10},
]);
klaus.equipItem([
    {type: DamageType.Chaos, value: -109},
]);
klaus.unequipItem([
    {type: DamageType.Cold, value: 10},
]);
