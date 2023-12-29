export { };

declare global {
    namespace ModifierAPI {
        namespace Functions {
            interface PreDamageReturn {
                attackInfo: sc.AttackInfo;
                damageFactor: number;
                applyDamageCallback: DamageCallback | null;
            }

            interface PostDamageReturn {
                applyDamageCallback?: Optional<DamageCallback>;
            }
            
            type DamageCallback = () => void;
 
            type PreDamageCalcFunction = (
                attackInfo: sc.AttackInfo,
                damageFactor: number,
                combatantRoot: ig.ENTITY.Combatant,
                shieldResult: sc.SHIELD_RESULT | undefined,
                hitIgnore: boolean | undefined,
                params: sc.CombatParams,
            ) => PreDamageReturn;

            type PostDamageCalcFunction = (
                damageResult: sc.CombatParams.DamageResult,
                attackInfo: sc.AttackInfo,
                combatant: ig.ENTITY.Combatant,
                shieldResult: sc.SHIELD_RESULT | undefined,
                hitIgnore: boolean | undefined,
                params: sc.CombatParams,
            ) => PostDamageReturn;
        }

        let PreDamageCalcFuncs: Record<string, Functions.PreDamageCalcFunction>;
        let PostDamageCalcFuncs: Record<string, Functions.PostDamageCalcFunction>
    }

    
    namespace sc {
        namespace CombatParams {
            interface DamageResult {
                callbacks: DamageCallback[];
            }
        }

        //kept solely for compatibility.
        var DAMAGE_MODIFIER_FUNCS: typeof ModifierAPI.PreDamageCalcFuncs;
    }
}