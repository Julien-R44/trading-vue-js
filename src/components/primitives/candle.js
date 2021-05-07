
// Candle object for Candles overlay

export default class CandleExt {

    constructor(overlay, ctx, data) {
        this.ctx = ctx
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
        ctx.arcTo(x + w, y + h, x, y + h, r)
        ctx.arcTo(x, y + h, x, y, r)
        ctx.arcTo(x, y, x + w, y, r)
        ctx.closePath()
        return ctx
    }

    draw(data) {
        const green = data.raw[4] >= data.raw[1]

        const body_color = green ?
            this.style.colorCandleUp :
            this.style.colorCandleDw

        const wick_color = green ?
            this.style.colorWickUp :
            this.style.colorWickDw

        let w = Math.max(data.w, 1)
        let hw = Math.max(Math.floor(w * 0.5), 1)
        let h = Math.abs(data.o - data.c)
        let max_h = data.c === data.o ? 1 : 2
        let x05 = Math.floor(data.x) - 0.5

        this.ctx.strokeStyle = wick_color

        this.ctx.beginPath()
        this.ctx.moveTo(x05, Math.floor(data.h))
        this.ctx.lineTo(x05, Math.floor(data.l))

        this.ctx.stroke()

        if (data.w > 1.5) {

            this.ctx.fillStyle = body_color
            if (this.self.sett.shadow) {
                let sett = this.self.sett
                this.ctx.shadowColor = sett.shadowColor
                this.ctx.shadowBlur = sett.shadowBlur
                this.ctx.shadowOffsetX = sett.shadowOffsetX
                this.ctx.shadowOffsetY = sett.shadowOffsetY
            }

            // TODO: Move common calculations to layout.js
            let candleH = Math.max(h, max_h)
            
            const yPos = green ? data.c : data.c - candleH
            this.roundRect(
                this.ctx,
                Math.floor(data.x - hw -1),
                yPos,
                Math.floor(hw * 2 + 1),
                candleH,
                this.self.sett.roundRadius || 0
            ).fill()
        } else {

            this.ctx.strokeStyle = body_color

            this.ctx.beginPath()
            this.ctx.moveTo(
                x05,
                Math.floor(Math.min(data.o, data.c)),
            )
            this.ctx.lineTo(
                x05,
                Math.floor(Math.max(data.o, data.c)) +
                    (data.o === data.c ? 1 : 0)
            )

            this.ctx.stroke()

        }

    }

}
