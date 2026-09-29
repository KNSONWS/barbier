/*
 * Animierter Seiden-Hintergrund (WebGL).
 * Shader adaptiert von „Silk“ aus React Bits — https://reactbits.dev
 * Copyright (c) 2026 David Haz — MIT + Commons Clause License
 * Hier ohne three.js umgesetzt (reines WebGL), damit die Seite leicht bleibt.
 */
import { useEffect, useRef } from 'react'
import { cn } from '../lib/cn'

const VERTEX = /* glsl */ `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT = /* glsl */ `
precision highp float;
varying vec2 vUv;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
uniform float uAspect;
uniform vec2  uPointer;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c) * uv;
}

void main() {
  float rnd     = noise(gl_FragCoord.xy);
  vec2  base    = vec2(vUv.x * min(uAspect, 1.6), vUv.y);
  vec2  uv      = rotateUvs(base * uScale, uRotation);
  vec2  tex     = uv * uScale;
  float tOffset = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  // weiches Licht, das dem Zeiger folgt
  float glow = smoothstep(0.75, 0.0, distance(vUv * vec2(uAspect, 1.0), uPointer * vec2(uAspect, 1.0)));

  vec3 col = uColor * pattern * (0.85 + 0.45 * glow) - vec3(rnd / 15.0 * uNoiseIntensity);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

type Props = {
  color?: string
  speed?: number
  scale?: number
  rotation?: number
  noiseIntensity?: number
  className?: string
}

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.replace('#', ''), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255] as const
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export function SilkBackground({
  color = '#5d5750',
  speed = 4,
  scale = 1,
  rotation = 0.35,
  noiseIntensity = 1.2,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) {
      canvas.style.display = 'none'
      return
    }

    // Seide ist weich — eine niedrigere Auflösung sieht gleich aus und spart Akku
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
    let program: WebGLProgram | null = null
    let buffer: WebGLBuffer | null = null
    let uTime: WebGLUniformLocation | null = null
    let uAspect: WebGLUniformLocation | null = null
    let uPointer: WebGLUniformLocation | null = null

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uAspect, w / Math.max(1, h))
    }

    // Programm und Geometrie anlegen — auch erneut, falls der Browser den WebGL-Kontext zurücksetzt
    const setup = () => {
      program = gl.createProgram()
      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false
      gl.useProgram(program)

      // Ein Dreieck, das den ganzen Viewport abdeckt
      buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      const position = gl.getAttribLocation(program, 'position')
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

      const u = (name: string) => gl.getUniformLocation(program!, name)
      uTime = u('uTime')
      uAspect = u('uAspect')
      uPointer = u('uPointer')
      gl.uniform3fv(u('uColor'), hexToRgb(color))
      gl.uniform1f(u('uSpeed'), speed)
      gl.uniform1f(u('uScale'), scale)
      gl.uniform1f(u('uRotation'), rotation)
      gl.uniform1f(u('uNoiseIntensity'), noiseIntensity)
      resize()
      return true
    }

    if (!setup()) {
      canvas.style.display = 'none'
      return
    }
    canvas.style.display = ''

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const pointer = { x: 0.7, y: 0.6, tx: 0.7, ty: 0.6 }
    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.tx = (e.clientX - r.left) / r.width
      pointer.ty = 1 - (e.clientY - r.top) / r.height
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let visible = true
    let lost = false
    let elapsed = 0
    let last = performance.now()

    const draw = (now: number) => {
      elapsed += Math.min(now - last, 100) / 1000
      last = now
      pointer.x += (pointer.tx - pointer.x) * 0.04
      pointer.y += (pointer.ty - pointer.y) * 0.04
      gl.uniform1f(uTime, elapsed * 0.1 + 2)
      gl.uniform2f(uPointer, pointer.x, pointer.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const loop = (now: number) => {
      draw(now)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (reduceMotion || raf || lost || !visible || document.hidden) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    draw(performance.now())
    start()

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    const onLost = (e: Event) => {
      e.preventDefault() // erlaubt dem Browser, den Kontext wiederherzustellen
      lost = true
      stop()
    }
    const onRestored = () => {
      lost = false
      if (!setup()) return
      draw(performance.now())
      start()
    }
    canvas.addEventListener('webglcontextlost', onLost)
    canvas.addEventListener('webglcontextrestored', onRestored)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
      // Ressourcen freigeben, den Kontext aber behalten (React Strict Mode mountet im Dev-Modus zweimal)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [color, speed, scale, rotation, noiseIntensity])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('block h-full w-full', className)} />
}
