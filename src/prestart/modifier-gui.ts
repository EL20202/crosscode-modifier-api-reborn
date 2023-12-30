const BLANK_ICON = 54;

sc.EquipStatusContainer.inject({
    _createStatusDisplay(...args) {
        //console.log(args[9], args[10], args[11])
        ModifierAPI.currentModifier = args[10];
        let obj = this.parent(...args)
        ModifierAPI.currentModifier = null;

        return obj;
    },
})

sc.ItemEquipModifier.inject({
    _createStatusDisplay(...args) {
        ModifierAPI.currentModifier = args[8];
        let obj = this.parent(...args)
        ModifierAPI.currentModifier = null;

        return obj;
    },
})

sc.TradeToggleStats.inject({
    _createStatusDisplay(...args) {
        ModifierAPI.currentModifier = args[10];
        let obj = this.parent(...args)
        ModifierAPI.currentModifier = null;

        return obj;
    }
})

sc.SimpleStatusDisplay.inject({
    newIconGfx: null,
    newIconOffX: 0,
    newIconOffY: 0,

    init(name, lineID, iconID, usePercent, maxValue, simpleMode, width, noPercentMode) {
        if(iconID === -1) {
            iconID = BLANK_ICON;
            if(ModifierAPI.currentModifier) {
                let modifier = sc.MODIFIERS[ModifierAPI.currentModifier];
                this.newIconGfx = new ig.Image(modifier.altSheet!);
                this.newIconOffX = modifier.offX!;
                this.newIconOffY = modifier.offY!;
            }
        }
        this.parent(name, lineID, iconID, usePercent, maxValue, simpleMode, width, noPercentMode);
    },

    updateDrawables(renderer) {
        this.parent(renderer);

        if(this.newIconGfx) {
            renderer.addGfx(this.newIconGfx, 0, 0, this.newIconOffX, this.newIconOffY, 11, 11)
        }
    },
})

sc.StatusViewModifiersContainer.inject({
    createLine(modifier, lineID, iconID, hideValues, noPercent) {
        ModifierAPI.currentModifier = modifier;
        let parent = this.parent(modifier, lineID, iconID, hideValues, noPercent);
        ModifierAPI.currentModifier = null;
        return parent;
    },
})

sc.StatusParamBar.inject({
    init(name, description, size, lineID, iconID, usePercent, skillHidden, noPercent, longNumber) {
        if(iconID === -1) {
            iconID = BLANK_ICON;
            if(ModifierAPI.currentModifier) {
                let modifier = sc.MODIFIERS[ModifierAPI.currentModifier];
                this.newIconGfx = new ig.Image(modifier.altSheet!);
                this.newIconOffX = modifier.offX!;
                this.newIconOffY = modifier.offY!;
            }
        }
        this.parent(name, description, size, lineID, iconID, usePercent, skillHidden, noPercent, longNumber);
    },

    updateDrawables(renderer) {
        this.parent(renderer);

        if(this.newIconGfx) {
            renderer.addGfx(this.newIconGfx, 0, 0, this.newIconOffX, this.newIconOffY, 11, 11)
        }
    }
})

ig.baked=true;
ig.module("game.feature.combat.model.modifier-gui").defines(()=>{})