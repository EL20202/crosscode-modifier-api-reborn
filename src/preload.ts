//@ts-expect-error
window.ModifierAPI = {}

ModifierAPI.PreDamageCalcFuncs = {}
ModifierAPI.PostDamageCalcFuncs = {}

// kept solely for compatibility.
// new mods' usage of sc.DAMAGE_MODIFIER_FUNCS is discouraged.
// please just use ModifierAPI.PreDamageCalcFuncs instead.
sc.DAMAGE_MODIFIER_FUNCS = ModifierAPI.PreDamageCalcFuncs;