
export default class VolbarExt {

    constructor(overlay, ctx, data) {
        this.ctx = ctx
        this.$p = overlay.$props
        this.self = overlay
        this.style = data.raw[6] || this.self
        this.draw(data)
    }

    roundRect(ctx, x, y, w, h, r) {
        if (w < 2 * r) r = w / 2
        if (h < 2 * r) r = h / 2
        ctx.beginPath()
        ctx.moveTo(x + r, y)
        ctx.arcTo(x + w, y, x + w, y + h, r)
        ctx.arcTo(x + w, y + h, x, y + h, 0)
        ctx.arcTo(x, y + h, x, y, 0)
        ctx.arcTo(x, y, x + w, y, r)
        ctx.closePath()
        return ctx
    }

    draw(data) {
        let y0 = this.$p.layout.height
        let w = data.x2 - data.x1
        let h = Math.floor(data.h)

        this.ctx.fillStyle = data.green ?
            this.style.colorVolUp :
            this.style.colorVolDw

        let sett = this.self.sett

        let volMarginX = (sett.volMarginX || 2) / w
        w -= w <= 1 ? 0 : volMarginX
        this.roundRect(
            this.ctx,
            Math.floor(data.x1),
            Math.floor(y0 - h - 0.5),
            Math.floor(w),
            Math.floor(h + 1),
            sett.volRadius || 4,
        ).fill()

    }

}
