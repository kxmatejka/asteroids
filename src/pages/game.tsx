import React, {useRef, useEffect} from 'react'

const randomRange = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)

const clearCanvas = (width: number, height: number, ctx: CanvasRenderingContext2D) => ctx.clearRect(0, 0, width, height)

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
  ctx.save()
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
  ctx.restore()
}

const drawShip = (x: number, y: number, radius: number, ctx: CanvasRenderingContext2D) => {
  ctx.save()
  ctx.beginPath()
  ctx.lineWidth = 0.5
  ctx.fillStyle = '#0f0'
  ctx.strokeStyle = '#0f0'
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.stroke()

  const angle = 45 * Math.PI / 180 // Math.PI * 0.25

  ctx.beginPath()
  ctx.lineWidth = 2
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
  ctx.restore()
}

class Asteroid {
  private readonly ctx: CanvasRenderingContext2D
  private readonly radius: number
  private readonly segments: number[] = []

  constructor (radius: number, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.radius = radius
    this.segments = Asteroid.generateSegments(radius)
  }

  draw (x: number, y: number) {
    this.ctx.save()
    this.ctx.translate(x, y)

    this.ctx.lineWidth = 2
    this.ctx.strokeStyle = '#0f0'

    this.ctx.beginPath()

    const angle = 2 * Math.PI / this.segments.length
    for (let i = 0; i < this.segments.length; i++) {
      this.ctx.lineTo(this.segments[i], 0)
      this.ctx.rotate(angle)
    }

    this.ctx.closePath()
    this.ctx.stroke()

    this.ctx.lineWidth = 0.5
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI)
    this.ctx.stroke()
    this.ctx.restore()
  }

  private static generateSegments (radius: number) {
    const segments = []
    const numberOfSegments = randomRange(16, 32)
    for (let i = 0; i < numberOfSegments; i++) {
      segments.push(randomRange(radius * 0.75, radius))
    }

    return segments
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

    const asteroid = new Asteroid(50, ctx)

    let vx = 3
    let vy = 2
    let x = 200
    let y = 0

    const animate = () => {
      clearCanvas(width, height, ctx)
      drawBackground(width, height, ctx)
      drawGrid(width, height, ctx)

      drawShip(450, 750, 25, ctx)

      x+=vx
      y+=vy
      if (x >= width + 50 || x <= -50 || y >= height + 50 || y <= -50) {
        x = 200
        y = 0
      }

      asteroid.draw(x, y)

      window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate)
  }, [])

  return (
    <canvas width={900} height={900} ref={canvas} />
  )
}
