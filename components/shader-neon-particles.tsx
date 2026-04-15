'use client'
import React, { useRef, useEffect } from 'react';

const ShaderNeonParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
    if (!gl) {
      console.error("WebGL no soportado");
      return;
    }

    const vsSource = `
      attribute vec2 a_position;
      attribute float a_size;
      attribute vec3 a_color;
      attribute float a_phase;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec3 v_color;
      varying float v_phase;
      void main() {
        vec2 pos = a_position;
        pos.x += sin(u_time * 0.4 + a_phase) * 0.15;
        pos.y += cos(u_time * 0.2 + a_phase) * 0.15;
        pos = mod(pos + 1.0, 2.0) - 1.0;
        gl_Position = vec4(pos, 0.0, 1.0);
        gl_PointSize = a_size;
        v_color = a_color;
        v_phase = a_phase;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec3 v_color;
      varying float v_phase;
      uniform float u_time;
      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;
        float glow = pow(1.0 - dist * 2.0, 3.0);
        float flicker = 0.8 + 0.2 * sin(u_time * 3.0 + v_phase);
        gl_FragColor = vec4(v_color, glow * flicker);
      }
    `;

    function compileShader(gl: WebGLRenderingContext, source: string, type: number) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(gl, vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const COUNT = 1000;
    const data = new Float32Array(COUNT * 7); // x, y, size, r, g, b, phase
    for (let i = 0; i < COUNT; i++) {
      const idx = i * 7;
      data[idx] = Math.random() * 2 - 1;
      data[idx + 1] = Math.random() * 2 - 1;
      data[idx + 2] = 2.0 + Math.random() * 12.0;
      const r = Math.random();
      if (r < 0.6) { data[idx+3]=0.0; data[idx+4]=0.8; data[idx+5]=1.0; } // Cyan
      else if (r < 0.9) { data[idx+3]=0.2; data[idx+4]=0.4; data[idx+5]=1.0; } // Azul
      else { data[idx+3]=0.8; data[idx+4]=0.2; data[idx+5]=1.0; } // Púrpura
      data[idx + 6] = Math.random() * Math.PI * 2;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    const stride = 7 * 4;
    const locs = {
      pos: gl.getAttribLocation(program, 'a_position'),
      size: gl.getAttribLocation(program, 'a_size'),
      color: gl.getAttribLocation(program, 'a_color'),
      phase: gl.getAttribLocation(program, 'a_phase')
    };

    gl.enableVertexAttribArray(locs.pos);
    gl.vertexAttribPointer(locs.pos, 2, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(locs.size);
    gl.vertexAttribPointer(locs.size, 1, gl.FLOAT, false, stride, 2 * 4);
    gl.enableVertexAttribArray(locs.color);
    gl.vertexAttribPointer(locs.color, 3, gl.FLOAT, false, stride, 3 * 4);
    gl.enableVertexAttribArray(locs.phase);
    gl.vertexAttribPointer(locs.phase, 1, gl.FLOAT, false, stride, 6 * 4);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.uniform2f(resLoc, canvas.width, canvas.height);
    }

    let frameId: number;
    function render(time: number) {
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.uniform1f(timeLoc, time * 0.001);
      gl!.enable(gl!.BLEND);
      gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE);
      gl!.drawArrays(gl!.POINTS, 0, COUNT);
      frameId = requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);
    resize();
    frameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ShaderNeonParticles;
