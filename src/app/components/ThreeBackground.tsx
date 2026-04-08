
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (!mountRef.current) return;
        mountRef.current.appendChild(renderer.domElement);

        // particles
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 800;

        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00ffff,
        });

        const particles = new THREE.Points(
            particlesGeometry,
            particlesMaterial
        );

        scene.add(particles);

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);

            particles.rotation.y += 0.0008;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none" ref={mountRef} />
    );
}