"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLowPowerOrReduced, setIsLowPowerOrReduced] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion or low power
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsLowPowerOrReduced(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0b, 0.05);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 50);
    camera.position.set(0, 0.5, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    // Ambient warm glow
    const ambientLight = new THREE.AmbientLight(0x221a12, 1.2);
    scene.add(ambientLight);

    // Warm amber pendant spotlight shining down onto bar
    const pendantSpot = new THREE.SpotLight(0xffb84d, 5, 12, Math.PI / 4, 0.6, 1);
    pendantSpot.position.set(0, 4, 1);
    pendantSpot.target.position.set(0, -1, 0);
    scene.add(pendantSpot);
    scene.add(pendantSpot.target);

    // Secondary cool teal/blue counter fill (speakeasy mood contrast)
    const rimLight = new THREE.PointLight(0x264d59, 2, 8);
    rimLight.position.set(-3, 2, -1);
    scene.add(rimLight);

    // Warm golden back light for bottles
    const backGlow = new THREE.PointLight(0xd4af37, 3, 7);
    backGlow.position.set(1.5, 0.5, -2);
    scene.add(backGlow);

    // --- GEOMETRY: BAR COUNTER SURFACE ---
    const barGeo = new THREE.BoxGeometry(10, 0.4, 4);
    const barMat = new THREE.MeshStandardMaterial({
      color: 0x141418,
      roughness: 0.35,
      metalness: 0.2,
    });
    const barCounter = new THREE.Mesh(barGeo, barMat);
    barCounter.position.set(0, -1.2, 0);
    scene.add(barCounter);

    // Brass edge trim on bar counter
    const brassTrimGeo = new THREE.BoxGeometry(10.02, 0.08, 0.1);
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.2,
      metalness: 0.85,
    });
    const brassTrim = new THREE.Mesh(brassTrimGeo, brassMat);
    brassTrim.position.set(0, -1, 2);
    scene.add(brassTrim);

    // --- PENDANT LAMPS (Hanging from ceiling) ---
    const pendantGroup = new THREE.Group();
    [-1.8, 0, 1.8].forEach((xPos) => {
      // Wire
      const wireGeo = new THREE.CylinderGeometry(0.01, 0.01, 3);
      const wireMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
      const wire = new THREE.Mesh(wireGeo, wireMat);
      wire.position.set(xPos, 3.5, 0.5);
      pendantGroup.add(wire);

      // Brass shade cone
      const shadeGeo = new THREE.ConeGeometry(0.35, 0.3, 24, 1, true);
      const shade = new THREE.Mesh(shadeGeo, brassMat);
      shade.rotation.x = Math.PI;
      shade.position.set(xPos, 2, 0.5);
      pendantGroup.add(shade);

      // Glowing filament bulb
      const bulbGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffe29a });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.set(xPos, 1.9, 0.5);
      pendantGroup.add(bulb);
    });
    scene.add(pendantGroup);

    // --- GLASS BOTTLES & DECANTER ON BAR ---
    const bottleGroup = new THREE.Group();

    // Bottle 1: Tall liquor bottle (dark amber)
    const bottle1Body = new THREE.CylinderGeometry(0.18, 0.18, 0.7, 24);
    const bottle1Neck = new THREE.CylinderGeometry(0.06, 0.08, 0.4, 16);
    bottle1Neck.translate(0, 0.5, 0); // translate geometry instead of position

    const amberGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xc87d38,
      transparent: true,
      opacity: 0.75,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      ior: 1.5,
    });
    const b1 = new THREE.Mesh(bottle1Body, amberGlassMat);
    const b1Neck = new THREE.Mesh(bottle1Neck, amberGlassMat);
    b1.add(b1Neck);
    b1.position.set(-1.2, -0.65, 0.8);
    bottleGroup.add(b1);

    // Bottle 2: Fluted Whiskey Decanter
    const decanterGeo = new THREE.BoxGeometry(0.4, 0.65, 0.4);
    const decanterNeck = new THREE.CylinderGeometry(0.08, 0.09, 0.3, 16);
    decanterNeck.translate(0, 0.45, 0); // translate geometry instead of position

    const crystalGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe6e4df,
      transparent: true,
      opacity: 0.65,
      roughness: 0.05,
      metalness: 0.05,
      transmission: 0.85,
      ior: 1.52,
    });
    const decanter = new THREE.Mesh(decanterGeo, crystalGlassMat);
    const decNeck = new THREE.Mesh(decanterNeck, crystalGlassMat);
    decanter.add(decNeck);
    decanter.position.set(-0.5, -0.68, 0.5);
    decanter.rotation.y = 0.3;
    bottleGroup.add(decanter);

    // Glass Tumbler with Ice
    const glassGeo = new THREE.CylinderGeometry(0.16, 0.13, 0.32, 24);
    const tumbler = new THREE.Mesh(glassGeo, crystalGlassMat);
    tumbler.position.set(0.6, -0.84, 1.2);
    bottleGroup.add(tumbler);

    scene.add(bottleGroup);

    // --- FLOATING EMBER / DUST PARTICLES ---
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      scales[i] = Math.random() * 0.04 + 0.015;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- INTERACTION: MOUSE PARALLAX & SCROLL ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0006;
      mouseY = (e.clientY - windowHalfY) * 0.0006;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop with Visibility Control
    let isVisible = true;
    let animId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Scroll camera dolly
      const scrollOffset = scrollY * 0.0018;

      camera.position.x = targetX * 2;
      camera.position.y = 0.5 - targetY * 1.5 - scrollOffset * 0.5;
      camera.position.z = 5 - scrollOffset * 1.5;
      camera.lookAt(0, -0.2 - scrollOffset * 0.3, 0);

      // Subtle float on bottles & pendant
      pendantGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.015;
      bottleGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.02;

      // Drifting dust particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let y = posAttr.getY(i);
        y += 0.003;
        if (y > 3) y = -3;
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;

      // Gentle flickering of pendant spotlight
      pendantSpot.intensity = 4.8 + Math.sin(elapsed * 4) * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (isLowPowerOrReduced) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#141419] via-[#0A0A0B] to-[#0A0A0B] flex items-center justify-center opacity-80">
        <div className="w-72 h-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
