import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene = ({ className }: ThreeSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!mountRef.current) return;

    // Create scene
    const scene = new THREE.Scene();

    // Create camera with adjusted position for better ball positioning
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(-1.8, -0.8, 5.5); // Refined position for better view

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting for better 3D effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create rugby ball with darker, richer material
    const ballMaterial = new THREE.MeshPhongMaterial({
      color: 0x5d2906, // Darker, richer brown
      shininess: 120,
      specular: 0x444444,
    });

    // Create rugby ball geometry
    const ballGeometry = new THREE.SphereGeometry(0.75, 32, 32);
    ballGeometry.scale(1, 0.6, 0.6);

    const rugbyBall = new THREE.Mesh(ballGeometry, ballMaterial);
    //scene.add(rugbyBall);

    // More visible rugby ball seam
    const torusGeometry = new THREE.TorusGeometry(0.45, 0.03, 16, 100);
    const seamMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const seam = new THREE.Mesh(torusGeometry, seamMaterial);
    seam.rotation.x = Math.PI / 2;
    rugbyBall.add(seam);

    // Rugby ball markings
    const markingGeometry = new THREE.CircleGeometry(0.15, 32);
    const markingMaterial = new THREE.MeshPhongMaterial({
      color: 0xffc700, // Using the gold color from requirements
      side: THREE.DoubleSide,
    });

    const marking1 = new THREE.Mesh(markingGeometry, markingMaterial);
    marking1.position.set(0, 0, 0.41);
    marking1.rotation.x = Math.PI / 2;
    rugbyBall.add(marking1);

    const marking2 = new THREE.Mesh(markingGeometry, markingMaterial);
    marking2.position.set(0, 0, -0.41);
    marking2.rotation.x = Math.PI / 2;
    rugbyBall.add(marking2);

    // Create new abstract geometric shapes for flying particles
    const particles: THREE.Mesh[] = [];

    // Create different particle shapes
    const particleGeometries = [
      // Small rugby ball shape
      (() => {
        const geo = new THREE.SphereGeometry(0.04, 8, 8);
        geo.scale(1, 0.6, 0.6);
        return geo;
      })(),
      // Circle
      new THREE.CircleGeometry(0.03, 12),
      // Triangle
      new THREE.ConeGeometry(0.035, 0.07, 3),
      // Dot
      new THREE.SphereGeometry(0.02, 6, 6),
    ];

    // Create variety of materials
    const particleMaterials = [
      new THREE.MeshPhongMaterial({ color: 0xffc700 }), // Gold
      new THREE.MeshPhongMaterial({ color: 0xffffff }), // White
      new THREE.MeshPhongMaterial({ color: 0x003366 }), // Navy Blue
      new THREE.MeshPhongMaterial({ color: 0x00a6ff }), // Light Blue
    ];

    // Determine particle count based on device type
    const particleCount = isMobile ? 90 : 60; // Increase to 70 for mobile, keep 50 for desktop

    // Create particles with varied shapes based on particleCount
    for (let i = 0; i < particleCount; i++) {
      // Use dynamic particleCount
      const geometryIndex = Math.floor(
        Math.random() * particleGeometries.length
      );
      const materialIndex = Math.floor(
        Math.random() * particleMaterials.length
      );

      const particle = new THREE.Mesh(
        particleGeometries[geometryIndex],
        particleMaterials[materialIndex]
      );

      // Randomize position with wider distribution
      particle.position.set(
        (Math.random() - 0.5) * 10, // Random X between -5 and 5
        (Math.random() - 0.5) * 10, // Random Y between -5 and 5
        (Math.random() - 0.5) * 10 // Random Z between -5 and 5
      );

      // Randomize rotation
      particle.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // Add unique speed property for varied movement
      (particle as any).speed = 0.2 + Math.random() * 0.3;
      (particle as any).rotationSpeed = 0.005 + Math.random() * 0.01;
      (particle as any).fadeSpeed = 0.001 + Math.random() * 0.003;
      (particle as any).opacity = Math.random();
      (particle as any).fadeDirection = Math.random() > 0.5 ? 1 : -1;

      scene.add(particle);
      particles.push(particle);
    }

    // Variables for pointer interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Event listeners for mouse/touch interaction
    const handleMouseMove = (event: MouseEvent) => {
      // Update simple variables directly
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update target rotation for the rugby ball
      targetRotationX = mouseY * 0.2;
      targetRotationY = mouseX * 0.2;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        // Update simple variables directly
        mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouseY = -((event.touches[0].clientY / window.innerHeight) * 2 - 1);

        // Update target rotation for the rugby ball
        targetRotationX = mouseY * 0.2;
        targetRotationY = mouseX * 0.2;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Enhanced animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Gentle, sophisticated rotation for the rugby ball
      rugbyBall.rotation.y += 0.007;
      rugbyBall.rotation.x = THREE.MathUtils.lerp(
        rugbyBall.rotation.x,
        targetRotationX,
        0.03
      );
      rugbyBall.rotation.z = THREE.MathUtils.lerp(
        rugbyBall.rotation.z,
        targetRotationY,
        0.03
      );

      // Subtle floating motion - slower vertical movement
      rugbyBall.position.y = Math.sin(Date.now() * 0.0005) * 0.2;

      // Subtle horizontal movement with mouse
      rugbyBall.position.x = THREE.MathUtils.lerp(
        rugbyBall.position.x,
        mouseX * 0.8,
        0.01
      );

      // Animate particles with improved effects
      particles.forEach((particle: any) => {
        // Gentle rotation
        particle.rotation.x += particle.rotationSpeed;
        particle.rotation.y += particle.rotationSpeed * 0.8;

        // Move particles upward
        particle.position.y += particle.speed * 0.01;

        // Apply mouse interaction
        const mouseInfluenceFactor = 0.05;
        particle.position.x += mouseX * mouseInfluenceFactor * particle.speed;
        particle.position.z += mouseY * mouseInfluenceFactor * particle.speed;

        // --- Boundary Check and Respawn Logic ---
        const boundaryX = 6;
        const boundaryY = 5;
        const boundaryZ = 6;

        // Check if particle is out of bounds
        if (
          Math.abs(particle.position.y) > boundaryY || // Check top AND bottom
          Math.abs(particle.position.x) > boundaryX ||
          Math.abs(particle.position.z) > boundaryZ
        ) {
          // --- Respawn Randomly Across Screen ---
          // Determine which boundary was crossed to place it on the opposite side,
          // or just randomize completely if preferred.
          // Simple approach: Randomize all coordinates within bounds.
          particle.position.y = (Math.random() - 0.5) * boundaryY * 1.8; // Random Y within slightly wider bounds
          particle.position.x = (Math.random() - 0.5) * boundaryX * 1.8; // Random X within slightly wider bounds
          particle.position.z = (Math.random() - 0.5) * boundaryZ * 1.8; // Random Z within slightly wider bounds

          // Optionally reset opacity for a fresh fade-in
          particle.material.opacity = 0.1;
          particle.fadeDirection = 1;
        }

        // Fade in/out effect
        if (particle.material.opacity <= 0.1) {
          particle.fadeDirection = 1;
        } else if (particle.material.opacity >= 0.9) {
          particle.fadeDirection = -1;
        }
        if (!particle.material.transparent) {
          particle.material.transparent = true;
        }
        particle.material.opacity +=
          particle.fadeDirection * particle.fadeSpeed;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={mountRef} className={`canvas-container ${className || ""}`} />
  );
};

export default ThreeScene;
