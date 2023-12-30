ig.GUI.StatusBar.inject({
    customGfxCache: {},

    drawStatusEntry(renderer, x, y, type) {
        let typeData = sc.STATUS_BAR_ENTRY[type];
        
        if(typeData.gfx) {
            let entry = this.statusEntries[type];
            let scale = 1;

            if(entry.timer < 0.1) {
                scale = entry.timer / 0.1;
            }

            if(scale != 1) {
                renderer.addTransform().setPivot(x, y + 2).setScale(1, scale)
            }
            let i = 24;
            let j = 0;
            if (typeData.half) {
                j = i = i / 2;
            }

            var cache = this.customGfxCache;
            if(!cache[type]){
                cache[type] = typeof typeData.gfx == "string" ? new ig.Image(typeData.gfx) : typeData.gfx;
            } 
            if (entry.stick) {
                renderer.addGfx(cache[type], x - 6, y - 2, typeData.iconX || 24, typeData.iconY || 0, 8, 8);
            } else {
                if (entry.timer > 1.7) {
                    let shakeX = Math.sin(Math.PI * 8 * (2 - entry.timer) / 0.3);
                    x += shakeX;
                } 
                let fillWidth = 1 + Math.floor(entry.value * (i - 2));
                let blackWidth = i - 1 - fillWidth;
                x += j;
                renderer.addGfx(cache[type], x, y, typeData.barX!, typeData.barY!, fillWidth, 4);
                if(blackWidth) {
                    renderer.addGfx(this.gfx, x + fillWidth, y, 216 + fillWidth, 12, blackWidth, 4);
                }
                renderer.addGfx(cache[type], x + (i - 1), y - 2, 25, 0, 7, 8)
            }
        } else this.parent(renderer, x, y, type);        
    }
})

ig.GUI