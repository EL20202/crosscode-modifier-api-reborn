# Modifier API Reborn
A complete rewrite of [modifier-api](https://github.com/Hsifnus/modifier-api) in TypeScript to remove vanilla code copy/paste and fix many of the small incompatibilities with modern versions of CrossCode.

By design, Modifier API Reborn is designed to be a drop-in replacement for the existing Modifier API. That is, it can act as a full replacement for the existing Modifier API - while also being able to have additional support for new features (such as post-damage calculation modifier function application). Any mod that works with the original Modifier API should work as-is with Reborn.

## How to Use (For Mod Users)
Simply download the latest release from [releases](https://github.com/EL20202/crosscode-modifier-api-rewritten/releases/latest). (Support will not be provided unless the latest `.ccmod` is being used)

## How to Use (For Mod Makers)
### Custom Modifiers
To get started with your custom modifier - you can start by declaring your modifier.
```js
sc.MODIFIERS["YOUR_MODIFIER_HERE"] = {
    //adjust to where your modifier should be sorted amongst other modifiers.
    order: 100,
    //set to true if your modifier isn't percent based.
    //think something like Riposte or Once More.
    noPercent: false,
    //an icon of -1 indicates to use a custom icon.
    icon: -1,
    //the location of your 11x11 modifier icon.
    altSheet: "media/gui/modifiers/your-modifier-img-here.png",
    //the x/y coordinates of where your modifier icon is.
    offX: 0,
    offY: 0,
}
```

Now, if your modifier does something like increases damage or some other effect - you can create "modifier functions" that get applied before or after damage is calculated to affect the damage is dealt - or for some other modification (such as applying status).
```js
// NOTE: To those familiar with the original Modifier API, this is just the same as what sc.DAMAGE_MODIFIER_FUNCS was.
// While that will still work - its usage is discouraged over the new form.
ModifierAPI.PreDamageCalcFuncs.YOUR_MODIFIER_HERE = function(attackInfo, damageFactor, combatantRoot, shieldResult, hitIgnore, params) {
    //parameters
    // attackInfo represents the data of the attack.
    // damageFactor is the relative amount of damage the attack will do.
    // combatantRoot is the attacker's entity.
    // shieldResult is if the attack was guarded or not. May be undefined.
    // hitIgnore is if the entity is ignoring hits.
    // params: This entity's combat params.

    //returns an object with these properties:
    // attackInfo: the modified attackInfo.
    // damageFactor: the new damage factor of the attack.
    // applyDamageCallback: a zero-argument function to be called while damage is applied.
    
    //New to Modifier API Reborn:
    //If any return value is undefined/null (or if nothing is returned at all), its value will remain unchanged.

    //To do a simple damage modification, you can do this:
    return {
        damageFactor: damageFactor * (1 + params.getModifier("YOUR_MODIFIER_HERE"))
    }
}

//New to Modifier API Reborn
ModifierAPI.PostDamageCalcFuncs.YOUR_MODIFIER_HERE = function(damageResult, attackInfo, combatant, shieldResult, hitIgnore, params) {
    //parameters
    // damageResult is the information about the attack. Includes the damage, if the attack was critical, among other things.
    // attackInfo represents the data of the attack.
    // combatantRoot is the attacker's entity.
    // shieldResult is if the attack was guarded or not. May be undefined.
    // hitIgnore is if the entity is ignoring hits.
    // params: This entity's combat params.

    //returns an object with these properties:
    // applyDamageCallback: a zero-argument function to be called while damage is applied.
    
    //Same as with PreDamageCalcFuncs, if any parameter is undefined it will be otherwise ignored.

    //For example, if you want to multiply damage on crit:
    if(damageResult.critical) {
        damageResult.damage *= (1 + params.getModifier("YOUR_MODIFIER_HERE"));
    }
}
```

To see how to add custom status effects or a more comprehensive way to use `ModifierAPI.PreDamageCalcFuncs`/`sc.DAMAGE_MODIFIER_FUNCS`, check out the [original version's README](https://github.com/Hsifnus/modifier-api#supported-features).