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

const drawShip = (x: number, y: number, radius: number, ctx: CanvasRenderingContext2D) => {
  ctx.beginPath()
  ctx.lineWidth = 0.5
  ctx.fillStyle = '#0f0'
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.stroke()

  const angle = 45 * Math.PI / 180 // Math.PI * 0.25

  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.fillStyle = '#0f0'
  ctx.moveTo(x, y - radius)
  ctx.lineTo(
    x + Math.cos(Math.PI - angle) * radius,
    y + Math.sin(Math.PI - angle) * radius
  )
  ctx.lineTo(
    x + Math.cos(angle) * radius,
    y + Math.sin(angle) * radius
  )
  ctx.closePath()
  ctx.stroke()
  ctx.fill()
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
    drawShip(240, 240, 150, ctx)
  }, [])

  return (
    <canvas width={480} height={480} ref={canvas} />
  )
}
