import React, {useRef, useEffect} from 'react'

const drawBackground = (width: number, height: number, ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width, height)
}

const drawGrid = (width: number, height: number, ctx: CanvasRenderingContext2D) => {
  const step = 20
  ctx.strokeStyle = '#0f0'

  for (let x = 0; x < width; x += step) {
    ctx.beginPath()
    ctx.moveTo(x + 0.5, 0)
    ctx.lineWidth = (x % (step * 3) === 0) ? 0.5 : 0.25
    ctx.lineTo(x + 0.5, height)
    ctx.stroke()
  }

  for (let y = 0; y < height; y += step) {
    ctx.beginPath()
    ctx.moveTo(0, y + 0.5)
    ctx.lineWidth = (y % (step * 3) === 0) ? 0.5 : 0.25
    ctx.lineTo(width, y + 0.5)
    ctx.stroke()
  }
}

export const Game = () => {
  const canvas = useRef(null)

  useEffect(() => {
    const {
      width,
      height
    } = canvas.current
    const ctx = canvas.current.getContext('2d')

    drawBackground(width, height, ctx)
    drawGrid(width, height, ctx)

    // paths
    ctx.beginPath()
    ctx.fillStyle = '#0f0'
    ctx.lineWidth = 2
    ctx.moveTo(60, 60)
    ctx.lineTo(180, 300)
    ctx.lineTo(300, 180)
    ctx.stroke()
    // labels
    ctx.fillText('(60, 60)', 65, 55)
    ctx.fillText('(180, 300)', 185, 315)
    ctx.fillText('(300, 180)', 305, 195)
    ctx.fill()
  }, [])

  return (
    <canvas width={480} height={480} ref={canvas} />
  )
}
