
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useIsMobile } from '@/hooks/use-mobile';

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
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create rugby ball material
    const ballMaterial = new THREE.MeshPhongMaterial({
      color: 0x8B4513,
      shininess: 100,
      specular: 0x333333,
    });
    
    // Create rugby ball geometry as an elongated sphere
    const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
    ballGeometry.scale(1, 0.6, 0.6);
    
    const rugbyBall = new THREE.Mesh(ballGeometry, ballMaterial);
    scene.add(rugbyBall);

    // Add rugby ball seam
    const torusGeometry = new THREE.TorusGeometry(0.65, 0.02, 16, 100);
    const seamMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const seam = new THREE.Mesh(torusGeometry, seamMaterial);
    seam.rotation.x = Math.PI / 2;
    rugbyBall.add(seam);
    
    // Add rugby ball markings
    const markingGeometry = new THREE.PlaneGeometry(0.8, 0.1);
    const markingMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFD700,
      side: THREE.DoubleSide
    });
    
    const marking1 = new THREE.Mesh(markingGeometry, markingMaterial);
    marking1.position.set(0, 0, 0.61);
    marking1.rotation.x = Math.PI / 2;
    rugbyBall.add(marking1);
    
    const marking2 = new THREE.Mesh(markingGeometry, markingMaterial);
    marking2.position.set(0, 0, -0.61);
    marking2.rotation.x = Math.PI / 2;
    rugbyBall.add(marking2);
    
    // Create flying particles that look like small rugby balls or stars
    const particles: THREE.Mesh[] = [];
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    particleGeometry.scale(1, 0.6, 0.6);
    
    const particleMaterials = [
      new THREE.MeshPhongMaterial({ color: 0xFFD700 }), // Gold
      new THREE.MeshPhongMaterial({ color: 0x0D1E31 }), // Navy
    ];
    
    for (let i = 0; i < 20; i++) {
      const particle = new THREE.Mesh(
        particleGeometry, 
        particleMaterials[Math.floor(Math.random() * particleMaterials.length)]
      );
      
      // Randomize position
      particle.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      // Randomize rotation
      particle.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
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
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -((event.clientY / window.innerHeight) * 2 - 1);
      
      targetRotationX = mouseY * 0.5;
      targetRotationY = mouseX * 0.5;
    };
    
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouseY = -((event.touches[0].clientY / window.innerHeight) * 2 - 1);
        
        targetRotationX = mouseY * 0.5;
        targetRotationY = mouseX * 0.5;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smoothly rotate the rugby ball
      rugbyBall.rotation.y += 0.01;
      rugbyBall.rotation.x = THREE.MathUtils.lerp(rugbyBall.rotation.x, targetRotationX, 0.05);
      rugbyBall.rotation.z = THREE.MathUtils.lerp(rugbyBall.rotation.z, targetRotationY, 0.05);
      
      // Move the rugby ball slightly with the mouse
      rugbyBall.position.x = THREE.MathUtils.lerp(rugbyBall.position.x, mouseX * 2, 0.02);
      rugbyBall.position.y = THREE.MathUtils.lerp(rugbyBall.position.y, mouseY * 1.5, 0.02);
      
      // Animate particles
      particles.forEach((particle, index) => {
        particle.rotation.x += 0.01 * (index % 3);
        particle.rotation.y += 0.01 * ((index + 1) % 3);
        
        // Make particles float around
        particle.position.y += Math.sin(Date.now() * 0.001 + index) * 0.005;
        particle.position.x += Math.cos(Date.now() * 0.001 + index) * 0.005;
        
        // Reset particles that go out of bounds
        if (Math.abs(particle.position.x) > 10 || 
            Math.abs(particle.position.y) > 10 || 
            Math.abs(particle.position.z) > 10) {
          particle.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          );
        }
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div ref={mountRef} className={`canvas-container ${className || ''}`} />;
};

export default ThreeScene;
