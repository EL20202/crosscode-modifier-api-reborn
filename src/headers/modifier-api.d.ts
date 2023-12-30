export { };

declare global {
    namespace ModifierAPI {
        namespace Functions {
            interface PreDamageReturn {
                attackInfo?: sc.AttackInfo;
                damageFactor?: number;
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
            ) => Optional<PreDamageReturn>;

            type PostDamageCalcFunction = (
                damageResult: sc.CombatParams.DamageResult,
                attackInfo: sc.AttackInfo,
                combatant: ig.ENTITY.Combatant,
                shieldResult: sc.SHIELD_RESULT | undefined,
                hitIgnore: boolean | undefined,
                params: sc.CombatParams,
            ) => Optional<PostDamageReturn>;
        }

        let PreDamageCalcFuncs: Record<string, Functions.PreDamageCalcFunction>;
        let PostDamageCalcFuncs: Record<string, Functions.PostDamageCalcFunction>

        let currentModifier: Optional<keyof sc.MODIFIERS>;
    }

    namespace ig.GUI {
        interface StatusBar {
            customGfxCache: Record<string, image>;
        }
    }
    
    namespace sc {
        interface Modifier {
            altSheet?: string,
            offX?: number,
            offY?: number,
        }

        interface SimpleStatusDisplay {
            newIconGfx: Optional<ig.Image>;
            newIconOffX: number;
            newIconOffY: number;
        }
        interface StatusParamBar {
            newIconGfx: Optional<ig.Image>;
            newIconOffX: number;
            newIconOffY: number;
        }
        interface StatusBarEntry {
            gfx?: string | ig.Image;
            iconX?: number;
            iconY?: number;
            barX?: number;
        }

        namespace CombatParams {
            interface DamageResult {
                callbacks: DamageCallback[];
            }
        }

        //kept solely for compatibility.
        var DAMAGE_MODIFIER_FUNCS: typeof ModifierAPI.PreDamageCalcFuncs;
    }
}