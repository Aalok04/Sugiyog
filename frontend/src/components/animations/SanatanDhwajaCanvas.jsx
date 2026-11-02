import React, { useEffect, useRef } from 'react';

/**
 * SanatanDhwajaCanvas - Real-Time 3D WebGL Cloth Simulation
 * Sacred saffron flag with golden Sun Mandala and Om (ॐ) insignia.
 * Features multi-frequency silk cloth physics, dynamic lighting,
 * and automatic pause when off-screen.
 */
export default function SanatanDhwajaCanvas({
  opacity = 0.86,
  windSpeed = 1.4,
  placement = 'behind-text',
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

    // Canvas Resizing
    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.parentElement.clientWidth || window.innerWidth;
      const height = canvas.parentElement.clientHeight || 700;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 1. Texture Generation
    function createSanatanFlagTexture() {
      const texCanvas = document.createElement('canvas');
      texCanvas.width = 1200;
      texCanvas.height = 720;
      const ctx = texCanvas.getContext('2d');
      const W = texCanvas.width;
      const H = texCanvas.height;

      ctx.clearRect(0, 0, W, H);

      // Classical Swallowtail Double-Pennant Cut
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(90, 40);             // Top mast corner
      ctx.lineTo(W - 70, 40);         // Top outer fly
      ctx.lineTo(W * 0.54, H * 0.49); // Swallowtail waist notch
      ctx.lineTo(W - 90, H - 40);     // Bottom fly tip
      ctx.lineTo(90, H - 40);         // Bottom mast corner
      ctx.closePath();
      ctx.clip();

      // Authentic Temple Kesariya Saffron Gradient (matching Swami Ji's robes)
      const saffronGrad = ctx.createLinearGradient(90, 40, W, H);
      saffronGrad.addColorStop(0.0, '#FF5E00'); // Luminous Kesariya
      saffronGrad.addColorStop(0.25, '#FF7A00'); // Warm Marigold
      saffronGrad.addColorStop(0.65, '#FFA726'); // Golden Saffron Glow
      saffronGrad.addColorStop(1.0, '#FF6500'); // Pure Sacred Saffron
      ctx.fillStyle = saffronGrad;
      ctx.fill();

      // Silk Weave Sheen
      ctx.fillStyle = 'rgba(255, 245, 215, 0.12)';
      for (let i = 40; i < H - 40; i += 7) {
        ctx.fillRect(90, i, W - 90, 2);
      }

      // Outer Gold Brocade Border
      ctx.strokeStyle = '#FFE082';
      ctx.lineWidth = 14;
      ctx.stroke();

      ctx.strokeStyle = '#C49A45';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Sacred Sun Mandala Medallion (Surya Chakra) with Om
      ctx.save();
      const centerX = W * 0.38;
      const centerY = H * 0.50;
      const discRadius = 145;

      // Radiant Sunburst Aura
      const auraGrad = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, discRadius + 45);
      auraGrad.addColorStop(0, 'rgba(255, 248, 210, 0.95)');
      auraGrad.addColorStop(0.5, 'rgba(255, 215, 0, 0.7)');
      auraGrad.addColorStop(0.85, 'rgba(255, 140, 0, 0.3)');
      auraGrad.addColorStop(1, 'rgba(255, 100, 0, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, discRadius + 45, 0, Math.PI * 2);
      ctx.fill();

      // Golden Sun Disc
      const discGrad = ctx.createRadialGradient(centerX, centerY, 15, centerX, centerY, discRadius);
      discGrad.addColorStop(0.0, '#FFFDF5');
      discGrad.addColorStop(0.35, '#FFE58F');
      discGrad.addColorStop(0.75, '#FFC02A');
      discGrad.addColorStop(1.0, '#D48806');
      ctx.fillStyle = discGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, discRadius, 0, Math.PI * 2);
      ctx.fill();

      // Filigree Ring & 16 Sacred Temple Rays
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, discRadius - 7, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#701F2D';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, discRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#FFE082';
      ctx.lineWidth = 4;
      for (let i = 0; i < 16; i++) {
        const angle = (i * Math.PI * 2) / 16;
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(angle) * (discRadius + 2), centerY + Math.sin(angle) * (discRadius + 2));
        ctx.lineTo(centerX + Math.cos(angle) * (discRadius + 24), centerY + Math.sin(angle) * (discRadius + 24));
        ctx.stroke();
      }

      // Sacred ॐ (Om) Inscribed in Deep Sugiyog Burgundy (#4A101A)
      ctx.font = 'bold 175px "Cormorant Garamond", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillStyle = 'rgba(74, 18, 29, 0.45)';
      ctx.fillText('ॐ', centerX + 3, centerY + 3);

      ctx.fillStyle = '#4A101A';
      ctx.fillText('ॐ', centerX, centerY);

      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#FFEAA7';
      ctx.strokeText('ॐ', centerX, centerY);

      ctx.restore();
      ctx.restore();

      // Left Flagpole Brass Mast
      const mastGrad = ctx.createLinearGradient(70, 0, 92, 0);
      mastGrad.addColorStop(0, '#5C4410');
      mastGrad.addColorStop(0.35, '#FFD700');
      mastGrad.addColorStop(0.7, '#FFF3A8');
      mastGrad.addColorStop(1, '#664A12');
      ctx.fillStyle = mastGrad;
      ctx.fillRect(72, 8, 18, H - 16);

      // Kalash Finial Top
      ctx.fillStyle = '#FFE082';
      ctx.beginPath();
      ctx.arc(81, 16, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#B8860B';
      ctx.lineWidth = 2.5;
      ctx.stroke();

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

        float amp = pow(u, 1.2) * 0.24;

        float wave1 = sin(u * 4.2 - uTime * uWindSpeed * 3.2 + v * 1.4) * 0.65;
        float wave2 = sin(u * 7.5 - uTime * uWindSpeed * 4.6 + v * 2.5) * 0.25;
        float wave3 = cos(u * 12.0 - uTime * uWindSpeed * 6.2) * 0.1;
        float zWave = (wave1 + wave2 + wave3) * amp;

        float xContraction = -0.05 * u * (1.0 - cos(zWave * 3.2));
        float yFlutter = sin(u * 3.6 - uTime * uWindSpeed * 2.4) * 0.025 * u;

        vec3 displacedPos = aPosition;
        displacedPos.x += xContraction;
        displacedPos.y += yFlutter;
        displacedPos.z += zWave;

        float dZdu = cos(u * 4.2 - uTime * uWindSpeed * 3.2) * 4.2 * amp + wave1 * 1.2 * pow(u, 0.2);
        vec3 tangentX = normalize(vec3(1.0, 0.0, dZdu));
        vec3 tangentY = vec3(0.0, 1.0, 0.0);
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
        if (texColor.a < 0.05) discard;

        vec3 lightDir = normalize(vec3(0.35, 0.65, 0.85));
        vec3 norm = normalize(vNormal);

        // High base ambient (0.80) ensures luminous Kesariya color stays bright
        float diff = max(dot(norm, lightDir), 0.0);
        float diffuseWeight = 0.80 + 0.32 * diff;

        vec3 viewDir = normalize(-vFragPos);
        vec3 reflectDir = reflect(-lightDir, norm);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 16.0) * 0.40;

        vec3 warmRadiance = vec3(0.12, 0.08, 0.02);
        vec3 finalRgb = (texColor.rgb * diffuseWeight) + warmRadiance + vec3(1.0, 0.92, 0.6) * spec;

        gl_FragColor = vec4(finalRgb, texColor.a * uOpacity);
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

    // 3. Mesh Grid (50 x 30)
    const COLS = 50;
    const ROWS = 30;
    const positions = [];
    const texCoords = [];
    const indices = [];

    const flagWidth = 3.2;
    const flagHeight = 1.85;

    for (let r = 0; r <= ROWS; r++) {
      for (let c = 0; c <= COLS; c++) {
        const u = c / COLS;
        const v = r / ROWS;
        const x = (u * flagWidth) - (flagWidth * 0.46);
        const y = (1.0 - v) * flagHeight - (flagHeight * 0.5);
        positions.push(x, y, 0.0);
        texCoords.push(u, v);
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
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // 4. Texture upload
    const glTexture = gl.createTexture();
    const uploadTexture = () => {
      if (isDisposed) return;
      const texImage = createSanatanFlagTexture();
      gl.bindTexture(gl.TEXTURE_2D, glTexture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texImage);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.generateMipmap(gl.TEXTURE_2D);
    };
    uploadTexture();

    if (document.fonts) {
      document.fonts.ready.then(() => uploadTexture());
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
      out[0] = m[0] * c - m[8] * s;
      out[2] = m[0] * s + m[8] * c;
      out[4] = m[4] * c - m[12] * s;
      out[6] = m[4] * s + m[12] * c;
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
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.DEPTH_TEST);

        const aspect = canvas.width / canvas.height;
        const projMatrix = mat4Perspective(45 * Math.PI / 180, aspect, 0.1, 100.0);

        let modelView = mat4Identity();
        const isMobile = window.innerWidth <= 1024;

        if (isMobile) {
          // Centered sacred backdrop on mobile
          modelView = mat4Translate(modelView, [0.0, 0.08, -2.85]);
          modelView = mat4RotateY(modelView, 0.0);
        } else if (placement === 'behind-text') {
          // Framed on left side behind ancient wisdom text
          modelView = mat4Translate(modelView, [-0.42, 0.12, -2.65]);
          modelView = mat4RotateY(modelView, 0.10);
        } else {
          // Centered
          modelView = mat4Translate(modelView, [0.0, 0.12, -2.6]);
          modelView = mat4RotateY(modelView, -0.04);
        }

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
