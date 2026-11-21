'use client';

import * as React from 'react';

const VERTEX_SRC = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SRC = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_progress;
uniform float u_scale;
uniform float u_soft;
uniform float u_bias;
uniform float u_seed;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21) + u_seed);
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  float norm = 0.0;
  for (int i = 0; i < 5; i++) {
    sum += amp * noise(p);
    norm += amp;
    p *= 2.03;
    amp *= 0.5;
  }
  return sum / norm;
}

void main() {
  float m = min(u_resolution.x, u_resolution.y);
  vec2 p = (v_uv * u_resolution) / m;

  float n = fbm(p * u_scale);
  n = smoothstep(0.28, 0.72, n);

  vec2 d2 = (v_uv - 0.5) * vec2(max(u_resolution.x / max(u_resolution.y, 1.0), 1.0),
                                max(u_resolution.y / max(u_resolution.x, 1.0), 1.0));
  float d = clamp(length(d2) * 1.41421, 0.0, 1.0);

  // u_progress: 1.0 = transparent, 0.0 = solid opaque veil
  float t = mix(-u_soft - 0.02, 1.0 + u_soft + 0.02, u_progress);
  float thr = t * (1.0 + u_bias) - u_bias * d;

  float alpha = smoothstep(thr - u_soft, thr + u_soft, n);

  fragColor = vec4(u_color, clamp(alpha, 0.0, 1.0));
}`;

function parseHex(hex) {
  let h = hex.trim().replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return [0, 0, 0];
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

/**
 * NoiseDissolveReveal
 *
 * WebGL FBM noise dissolve overlay.
 * dissolve = 0    => completely transparent (alpha 0)
 * dissolve = 0..1 => black noise tears grow across
 * dissolve = 1    => completely solid black
 */
export default function NoiseDissolveReveal({
  dissolve = 0,
  veilColor = '#0e0e0e',
  noiseScale = 5.5,
  softness = 0.055,
  centerBias = 0.3,
  className = '',
}) {
  const canvasRef = React.useRef(null);
  const dissolveRef = React.useRef(dissolve);
  dissolveRef.current = dissolve;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    });
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    const posAttr = gl.getAttribLocation(prog, 'a_position');
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const u = (n) => gl.getUniformLocation(prog, n);
    const loc = {
      res: u('u_resolution'),
      color: u('u_color'),
      progress: u('u_progress'),
      scale: u('u_scale'),
      soft: u('u_soft'),
      bias: u('u_bias'),
      seed: u('u_seed'),
    };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const seed = 42.0;
    let raf = 0;
    let destroyed = false;

    const render = () => {
      if (destroyed) return;

      const dVal = Math.min(Math.max(dissolveRef.current, 0), 1);

      // If dissolve is 0, keep canvas 100% transparent
      if (dVal <= 0.001) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        raf = requestAnimationFrame(render);
        return;
      }

      // If dissolve is 100%, render solid veil color immediately
      if (dVal >= 0.999) {
        const [r, g, b] = parseHex(veilColor);
        gl.clearColor(r, g, b, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        raf = requestAnimationFrame(render);
        return;
      }

      // In shader: u_progress 1 = transparent, 0 = solid opaque
      const uProgress = 1.0 - dVal;
      const [r, g, b] = parseHex(veilColor);

      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(posAttr);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(loc.res, canvas.width, canvas.height);
      gl.uniform3f(loc.color, r, g, b);
      gl.uniform1f(loc.progress, uProgress);
      gl.uniform1f(loc.scale, noiseScale);
      gl.uniform1f(loc.soft, Math.max(softness, 0.001));
      gl.uniform1f(loc.bias, centerBias);
      gl.uniform1f(loc.seed, seed);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [veilColor, noiseScale, softness, centerBias]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
