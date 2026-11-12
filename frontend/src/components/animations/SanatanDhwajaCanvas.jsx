import React, { useEffect, useRef } from 'react';

/**
 * SanatanDhwajaCanvas - Real-Time 3D WebGL Cloth Simulation
 * Sacred Bhagwa / Kesariya (Saffron) flag representing Sanatan Dharma,
 * featuring the golden Sun Mandala (Surya Chakra) and Om (ॐ) insignia.
 * Multi-frequency silk cloth physics, dynamic specular lighting,
 * and automatic pause when off-screen.
 */
export default function SanatanDhwajaCanvas({
  opacity = 1.0,
  windSpeed = 1.25,
  placement = 'full-screen',
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    let isVisible = true;
    let animationFrameId;
    let isDisposed = false;
    let updateMeshFn = null;

    // Canvas Resizing
    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.parentElement.clientWidth || window.innerWidth;
      const height = canvas.parentElement.clientHeight || 700;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        const aspect = canvas.width / canvas.height;
        const isMobile = aspect < 1.0;
        if (updateMeshFn) {
          updateMeshFn(aspect);
        }
        if (isMobile !== currentIsMobile || !currentAspect || Math.abs(aspect - currentAspect) > 0.15) {
          uploadTexture(isMobile, aspect);
        }
      }
    };

    window.addEventListener('resize', resizeCanvas);

    // 1. Full-Screen Saffron Silk Tapestry Texture (Power-of-Two 1024x512)
    function createSanatanFlagTexture(isMobile = false, aspect = 1.0) {
      const texCanvas = document.createElement('canvas');
      texCanvas.width = 1024;
      texCanvas.height = 512;
      const ctx = texCanvas.getContext('2d');
      const W = texCanvas.width;
      const H = texCanvas.height;

      // Authentic Temple Kesariya Saffron Gradient (exact match to Swami Ji's sacred robes)
      // Spanning full width and height with deep sacred Kesariya folds
      const saffronGrad = ctx.createLinearGradient(0, 0, W, H);
      saffronGrad.addColorStop(0.0, '#BF2E00');  // Deep sacred Kesariya fold
      saffronGrad.addColorStop(0.18, '#E54400'); // Rich temple saffron
      saffronGrad.addColorStop(0.48, '#FF5C04'); // Authentic Swami Ji robe saffron (#FF5C04)
      saffronGrad.addColorStop(0.78, '#FF6E08'); // Luminous Kesariya
      saffronGrad.addColorStop(1.0, '#CF3500');  // Deep saffron fold
      ctx.fillStyle = saffronGrad;
      ctx.fillRect(0, 0, W, H);

      // On mobile screens, place sacred Om medallion directly in the center zone requested by user (Circle 1: H * 0.48)
      // On desktop, position gracefully in the left content sanctuary (W * 0.42, H * 0.44)
      const centerX = isMobile ? W * 0.50 : W * 0.42;
      const centerY = isMobile ? H * 0.48 : H * 0.44;
      const discRadius = isMobile ? 62 : 70;

      // Compensate for mesh UV stretch so medallion is ALWAYS a true circular medallion
      const yScale = (H / W) * (isMobile ? (aspect * 1.06) : Math.max(aspect * 1.15, 5.2 / 2.45));

      // Radiant Saffron Core Aura around the sacred Surya Chakra
      const coreAura = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, W * 0.30);
      coreAura.addColorStop(0.0, isMobile ? 'rgba(255, 135, 15, 0.35)' : 'rgba(255, 125, 10, 0.30)');
      coreAura.addColorStop(0.55, isMobile ? 'rgba(255, 95, 10, 0.16)' : 'rgba(255, 85, 5, 0.14)');
      coreAura.addColorStop(1.0, 'rgba(255, 55, 0, 0.0)');
      ctx.fillStyle = coreAura;
      ctx.fillRect(0, 0, W, H);

      // Micro Silk Weave Sheen (Ultra-delicate continuous luxury silk texture)
      ctx.fillStyle = 'rgba(255, 248, 225, 0.035)';
      for (let i = 0; i < H; i += 3) {
        ctx.fillRect(0, i, W, 1);
      }

      // Sacred Sun Mandala Medallion (Surya Chakra) with Om
      ctx.save();
      if (isMobile) {
        ctx.globalAlpha = 0.90; // High clarity, radiant sacred Om medallion exactly in user circled center
      }
      ctx.translate(centerX, centerY);
      ctx.scale(1, yScale);

      // Radiant Sunburst Aura
      const auraGrad = ctx.createRadialGradient(0, 0, 14, 0, 0, discRadius + 28);
      auraGrad.addColorStop(0, 'rgba(255, 240, 190, 0.90)');
      auraGrad.addColorStop(0.45, 'rgba(255, 195, 0, 0.70)');
      auraGrad.addColorStop(0.80, 'rgba(255, 120, 0, 0.30)');
      auraGrad.addColorStop(1, 'rgba(255, 80, 0, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(0, 0, discRadius + 28, 0, Math.PI * 2);
      ctx.fill();

      // Golden Sun Disc
      const discGrad = ctx.createRadialGradient(0, 0, 8, 0, 0, discRadius);
      discGrad.addColorStop(0.0, '#FFFDF5');
      discGrad.addColorStop(0.35, '#FFE082');
      discGrad.addColorStop(0.70, '#FFB300');
      discGrad.addColorStop(1.0, '#E67300');
      ctx.fillStyle = discGrad;
      ctx.beginPath();
      ctx.arc(0, 0, discRadius, 0, Math.PI * 2);
      ctx.fill();

      // Filigree Ring & 16 Sacred Temple Rays
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, discRadius - 3.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#871E2D';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(0, 0, discRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#FFE082';
      ctx.lineWidth = 2.5;
      for (let i = 0; i < 16; i++) {
        const angle = (i * Math.PI * 2) / 16;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * (discRadius + 2), Math.sin(angle) * (discRadius + 2));
        ctx.lineTo(Math.cos(angle) * (discRadius + 14), Math.sin(angle) * (discRadius + 14));
        ctx.stroke();
      }

      // Sacred ॐ (Om) Inscribed on the Flag - perfectly centered
      const omFontSize = isMobile ? '72px' : '90px';
      ctx.font = `bold ${omFontSize} "Cormorant Garamond", Georgia, "Noto Sans Devanagari", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillStyle = 'rgba(74, 18, 29, 0.45)';
      ctx.fillText('ॐ', 1.5, 1.5);

      ctx.fillStyle = '#4A101A';
      ctx.fillText('ॐ', 0, 0);

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFEAA7';
      ctx.strokeText('ॐ', 0, 0);

      ctx.restore();

      return texCanvas;
    }

    // 2. WebGL Shaders
    const vsSource = `
      attribute vec3 aPosition;
      attribute vec2 aTexCoord;

      uniform mat4 uProjection;
      uniform mat4 uModelView;
      uniform float uTime;
      uniform float uWindSpeed;

      varying vec2 vTexCoord;
      varying vec3 vNormal;
      varying vec3 vFragPos;

      void main(void) {
        vTexCoord = aTexCoord;

        float u = aTexCoord.x;
        float v = aTexCoord.y;

        // Continuous full-screen silk cloth ripples
        float wave1 = sin(u * 5.2 - uTime * uWindSpeed * 2.8 + v * 2.2) * 0.14;
        float wave2 = cos(u * 8.4 - uTime * uWindSpeed * 3.8 + v * 3.5) * 0.08;
        float wave3 = sin((u + v) * 11.0 - uTime * uWindSpeed * 4.6) * 0.035;
        float zWave = wave1 + wave2 + wave3;

        vec3 displacedPos = aPosition;
        displacedPos.z += zWave;

        float dZdu = cos(u * 5.2 - uTime * uWindSpeed * 2.8 + v * 2.2) * 5.2 * 0.14
                   - sin(u * 8.4 - uTime * uWindSpeed * 3.8 + v * 3.5) * 8.4 * 0.08;
        float dZdv = cos(u * 5.2 - uTime * uWindSpeed * 2.8 + v * 2.2) * 2.2 * 0.14
                   - sin(u * 8.4 - uTime * uWindSpeed * 3.8 + v * 3.5) * 3.5 * 0.08;

        vec3 tangentX = normalize(vec3(1.0, 0.0, dZdu));
        vec3 tangentY = normalize(vec3(0.0, 1.0, dZdv));
        vNormal = normalize(cross(tangentX, tangentY));

        vFragPos = (uModelView * vec4(displacedPos, 1.0)).xyz;
        gl_Position = uProjection * vec4(vFragPos, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;

      varying vec2 vTexCoord;
      varying vec3 vNormal;
      varying vec3 vFragPos;

      uniform sampler2D uSampler;
      uniform float uOpacity;

      void main(void) {
        vec4 texColor = texture2D(uSampler, vTexCoord);

        vec3 norm = normalize(vNormal);
        vec3 lightDir = normalize(vec3(0.35, 0.55, 0.75));

        // Two-sided cloth fold illumination so both front and ripples stay luminous
        float diff = abs(dot(norm, lightDir));
        float diffuseWeight = 0.86 + 0.28 * diff;

        vec3 viewDir = normalize(-vFragPos);
        vec3 reflectDir = reflect(-lightDir, norm);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 16.0) * 0.35;

        // Warm golden radiance matching Swami Ji's sacred saffron robes
        vec3 saffronRadiance = vec3(0.04, 0.015, 0.0);
        vec3 finalRgb = (texColor.rgb * diffuseWeight) + saffronRadiance + vec3(1.0, 0.95, 0.65) * spec;

        // Prevent oversaturation clipping
        finalRgb = clamp(finalRgb, 0.0, 1.0);

        gl_FragColor = vec4(finalRgb, uOpacity);
      }
    `;

    function compileShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        position: gl.getAttribLocation(shaderProgram, 'aPosition'),
        texCoord: gl.getAttribLocation(shaderProgram, 'aTexCoord'),
      },
      uniformLocations: {
        projection: gl.getUniformLocation(shaderProgram, 'uProjection'),
        modelView: gl.getUniformLocation(shaderProgram, 'uModelView'),
        time: gl.getUniformLocation(shaderProgram, 'uTime'),
        windSpeed: gl.getUniformLocation(shaderProgram, 'uWindSpeed'),
        sampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
        opacity: gl.getUniformLocation(shaderProgram, 'uOpacity'),
      },
    };

    // 3. Full-Screen Mesh Grid (50 x 30)
    const COLS = 50;
    const ROWS = 30;
    const texCoords = [];
    const indices = [];

    for (let r = 0; r <= ROWS; r++) {
      for (let c = 0; c <= COLS; c++) {
        texCoords.push(c / COLS, r / ROWS);
      }
    }

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i0 = r * (COLS + 1) + c;
        const i1 = i0 + 1;
        const i2 = (r + 1) * (COLS + 1) + c;
        const i3 = i2 + 1;
        indices.push(i0, i1, i2);
        indices.push(i1, i3, i2);
      }
    }

    const posBuffer = gl.createBuffer();
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Dynamic mesh sizing to guarantee 100% coverage and centered sacred Om across all screens
    const updateMesh = (aspect) => {
      const isMobile = aspect < 1.0;
      const meshHeight = 2.45;
      // On mobile (aspect < 1.0), constrain meshWidth to aspect ratio with 6% wave margin so u=0.5 aligns with x=0 (the exact screen center)
      const meshWidth = isMobile
        ? meshHeight * aspect * 1.06
        : Math.max(meshHeight * aspect * 1.15, 5.2);

      const positions = [];
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const u = c / COLS;
          const v = r / ROWS;
          const x = (u - 0.5) * meshWidth;
          const y = (0.5 - v) * meshHeight;
          positions.push(x, y, 0.0);
        }
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);
    };

    updateMeshFn = updateMesh;

    // 4. Texture upload (Power-of-two 1024x512 with safe WebGL 1.0 parameters)
    const glTexture = gl.createTexture();
    let currentIsMobile = null;
    let currentAspect = 1.0;
    const uploadTexture = (isMobile = false, aspect = 1.0) => {
      if (isDisposed) return;
      currentIsMobile = isMobile;
      currentAspect = aspect;
      const texImage = createSanatanFlagTexture(isMobile, aspect);
      gl.bindTexture(gl.TEXTURE_2D, glTexture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texImage);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    };

    resizeCanvas();

    if (document.fonts) {
      document.fonts.ready.then(() => uploadTexture(currentIsMobile, currentAspect));
    }

    // Matrix Helpers
    function mat4Perspective(fov, aspect, near, far) {
      const f = 1.0 / Math.tan(fov / 2);
      const nf = 1 / (near - far);
      return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, (2 * far * near) * nf, 0
      ];
    }

    function mat4Identity() {
      return [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
    }

    function mat4Translate(m, v) {
      const out = [...m];
      out[12] = m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12];
      out[13] = m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13];
      out[14] = m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14];
      out[15] = m[3] * v[0] + m[7] * v[1] + m[11] * v[2] + m[15];
      return out;
    }

    function mat4RotateY(m, rad) {
      const s = Math.sin(rad), c = Math.cos(rad);
      const out = [...m];
      out[0] = m[0] * c + m[8] * s;
      out[1] = m[1] * c + m[9] * s;
      out[2] = m[2] * c + m[10] * s;
      out[3] = m[3] * c + m[11] * s;
      out[8] = -m[0] * s + m[8] * c;
      out[9] = -m[1] * s + m[9] * c;
      out[10] = -m[2] * s + m[10] * c;
      out[11] = -m[3] * s + m[11] * c;
      return out;
    }

    // 5. Intersection Observer to pause when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // 6. Reduced Motion check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    // 7. Render Loop
    let startTime = performance.now();
    function render(currentTime) {
      if (isDisposed) return;

      if (isVisible) {
        const elapsed = prefersReducedMotion ? 0.5 : (currentTime - startTime) * 0.001;

        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);

        const aspect = canvas.width / canvas.height;
        const projMatrix = mat4Perspective(45 * Math.PI / 180, aspect, 0.1, 100.0);

        let modelView = mat4Identity();
        modelView = mat4Translate(modelView, [0.0, 0.0, -2.5]);

        gl.useProgram(programInfo.program);

        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.vertexAttribPointer(programInfo.attribLocations.position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(programInfo.attribLocations.position);

        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.vertexAttribPointer(programInfo.attribLocations.texCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(programInfo.attribLocations.texCoord);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        gl.uniformMatrix4fv(programInfo.uniformLocations.projection, false, new Float32Array(projMatrix));
        gl.uniformMatrix4fv(programInfo.uniformLocations.modelView, false, new Float32Array(modelView));
        gl.uniform1f(programInfo.uniformLocations.time, elapsed);
        gl.uniform1f(programInfo.uniformLocations.windSpeed, windSpeed);
        gl.uniform1f(programInfo.uniformLocations.opacity, opacity);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, glTexture);
        gl.uniform1i(programInfo.uniformLocations.sampler, 0);

        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
      }

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);

      if (gl) {
        gl.deleteBuffer(posBuffer);
        gl.deleteBuffer(texCoordBuffer);
        gl.deleteBuffer(indexBuffer);
        gl.deleteTexture(glTexture);
        gl.deleteProgram(shaderProgram);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
      }
    };
  }, [opacity, windSpeed, placement]);

  return (
    <canvas
      ref={canvasRef}
      className={`sanatan-dhwaja-canvas ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
}
