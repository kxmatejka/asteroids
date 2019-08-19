import React, {useRef, useEffect} from 'react'

const rotateCanvas = (width: number, height: number, angle: number, ctx: CanvasRenderingContext2D) => {
  const halfWidth = width / 2
  const halfHeight = height / 2
  ctx.translate(halfWidth / 2, halfHeight)
  ctx.rotate(angle)
  ctx.translate(-halfWidth, -halfHeight)
}

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
  ctx.quadraticCurveTo(
    x - radius * 0.6,
    y - radius * 0.6,
    x + Math.cos(Math.PI - angle) * radius,
    y + Math.sin(Math.PI - angle) * radius
  )
  ctx.quadraticCurveTo(
    x,
    y + radius * 0.25,
    x + Math.cos(angle) * radius,
    y + Math.sin(angle) * radius
  )
  ctx.quadraticCurveTo(
    x + radius * 0.6,
    y - radius * 0.6,
    x,
    y - radius
  )
  ctx.closePath()
  ctx.stroke()
  ctx.fill()
}

const drawAsteroid = (segments: number, radius: number, ctx: CanvasRenderingContext2D) => {
  ctx.lineWidth = 2
  ctx.fillStyle = '#0f0'

  ctx.save()
  ctx.beginPath()

  const angle = 2 * Math.PI / segments
  for (let i = 0; i < segments; i++) {
    ctx.lineTo(radius, 0)
    ctx.rotate(angle)
  }

  ctx.closePath()
  ctx.stroke()

  ctx.lineWidth = 0.5
  ctx.arc(0, 0, radius, 0, 2*Math.PI)
  ctx.stroke()
  ctx.restore()
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

    drawShip(700, 700, 75, ctx)

    ctx.lineWidth = 2
    ctx.fillStyle = '#0f0'
    ctx.save()
    ctx.translate(150, 150)
    drawAsteroid(7, 100, ctx)
    ctx.restore()

  }, [])

  return (
    <canvas width={900} height={900} ref={canvas} />
  )
}
