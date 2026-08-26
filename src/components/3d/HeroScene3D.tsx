import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroScene3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;
    camera.position.y = 0.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for whole drink and aura
    const drinkGroup = new THREE.Group();
    scene.add(drinkGroup);

    // 1. Outer Glass (Transparent cylinder with frosted/glow rim)
    const glassGeometry = new THREE.CylinderGeometry(1.2, 0.9, 2.8, 32, 1, true);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x54ACBF,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    drinkGroup.add(glassMesh);

    // Glass Base
    const baseGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.15, 32);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x26658C,
      roughness: 0.2,
      metalness: 0.5,
      transparent: true,
      opacity: 0.6,
    });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.y = -1.4;
    drinkGroup.add(baseMesh);

    // Glass Glowing Rim
    const rimGeometry = new THREE.TorusGeometry(1.2, 0.04, 16, 64);
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xA7EBF2,
      emissive: 0x54ACBF,
      emissiveIntensity: 0.8,
      roughness: 0.1,
    });
    const rimMesh = new THREE.Mesh(rimGeometry, rimMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 1.4;
    drinkGroup.add(rimMesh);

    // 2. Liquid inside (Layered gradient effect)
    const liquidGeometry = new THREE.CylinderGeometry(1.15, 0.86, 2.4, 32);
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x023859,
      emissive: 0x26658C,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.85,
      roughness: 0.2,
      transmission: 0.5,
    });
    const liquidMesh = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquidMesh.position.y = -0.15;
    drinkGroup.add(liquidMesh);

    // 3. Floating Ice Cubes inside the drink
    const iceCubes: THREE.Mesh[] = [];
    const iceGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const iceMat = new THREE.MeshPhysicalMaterial({
      color: 0xA7EBF2,
      emissive: 0x54ACBF,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.75,
      roughness: 0.05,
      transmission: 0.85,
      ior: 1.31,
    });

    const icePositions = [
      { x: 0.2, y: 0.6, z: 0.1, rotX: 0.3, rotY: 0.4 },
      { x: -0.3, y: 0.1, z: 0.2, rotX: 0.8, rotY: -0.5 },
      { x: 0.1, y: -0.5, z: -0.2, rotX: -0.4, rotY: 0.9 },
    ];

    icePositions.forEach((pos) => {
      const cube = new THREE.Mesh(iceGeo, iceMat);
      cube.position.set(pos.x, pos.y, pos.z);
      cube.rotation.set(pos.rotX, pos.rotY, 0);
      drinkGroup.add(cube);
      iceCubes.push(cube);
    });

    // 4. Glowing Aura Rings orbiting the beverage
    const ringGeo1 = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xA7EBF2,
      transparent: true,
      opacity: 0.6,
    });
    const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitRing1.rotation.x = Math.PI / 2.8;
    orbitRing1.rotation.y = 0.2;
    scene.add(orbitRing1);

    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x54ACBF,
      transparent: true,
      opacity: 0.4,
    });
    const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitRing2.rotation.x = -Math.PI / 3;
    orbitRing2.rotation.y = -0.3;
    scene.add(orbitRing2);

    // 5. Floating steam / rising bubbles particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 3.5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4 - 1;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      particleSpeeds[i] = 0.006 + Math.random() * 0.012;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xA7EBF2,
      size: 0.06,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x023859, 1.8);
    scene.add(ambientLight);

    const topCyanLight = new THREE.PointLight(0xA7EBF2, 3.5, 12);
    topCyanLight.position.set(2, 4, 3);
    scene.add(topCyanLight);

    const rimBlueLight = new THREE.PointLight(0x54ACBF, 4.0, 10);
    rimBlueLight.position.set(-3, -1, -2);
    scene.add(rimBlueLight);

    const backDeepLight = new THREE.DirectionalLight(0x26658C, 2.0);
    backDeepLight.position.set(0, 3, -4);
    scene.add(backDeepLight);

    // Mouse Parallax
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse parallax
      currentRotY += (targetRotY - currentRotY) * 0.05;
      currentRotX += (targetRotX - currentRotX) * 0.05;

      // Group floating movement
      drinkGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12;
      drinkGroup.rotation.y = elapsedTime * 0.25 + currentRotY;
      drinkGroup.rotation.x = currentRotX + Math.sin(elapsedTime * 0.8) * 0.04;
      drinkGroup.rotation.z = Math.cos(elapsedTime * 1.0) * 0.03;

      // Orbit rings rotation
      orbitRing1.rotation.z = elapsedTime * 0.15;
      orbitRing2.rotation.z = -elapsedTime * 0.12;

      // Floating ice subtle rotation
      iceCubes.forEach((cube, idx) => {
        cube.rotation.x += 0.005 * (idx + 1);
        cube.rotation.y += 0.007 * (idx + 1);
        cube.position.y += Math.sin(elapsedTime * 2 + idx) * 0.001;
      });

      // Move particles upward
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        if (positions[i * 3 + 1] > 2.5) {
          positions[i * 3 + 1] = -2.2;
          positions[i * 3] = (Math.random() - 0.5) * 3.5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] md:h-[560px] flex items-center justify-center">
      {/* Dynamic 3D Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10" />

      {/* Layered cinematic glow & badge */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-luna-sky/20 blur-3xl -z-10 animate-pulse-slow" />
        <div className="w-48 h-48 rounded-full bg-luna-ice/15 blur-2xl -z-10 translate-x-12 -translate-y-8" />
      </div>

      {/* Interactive floating craft label tag */}
      <div className="absolute bottom-6 right-6 md:right-12 glass-deep px-4 py-2.5 rounded-2xl border border-luna-ice/30 shadow-glow-sky text-left z-20 animate-float-slow hidden sm:flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luna-ice opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-luna-sky"></span>
        </span>
        <div>
          <p className="text-[11px] uppercase tracking-widest text-luna-ice font-semibold">Artisanal Bar</p>
          <p className="text-xs font-medium text-white/90">Signature Cold Brew & Boba</p>
        </div>
      </div>
    </div>
  );
};
