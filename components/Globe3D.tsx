'use client'

import { useRef, useEffect, useMemo, Suspense, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdditiveBlending, BackSide, ShaderMaterial, Color, Vector3, Group, Mesh, MeshStandardMaterial } from 'three'
import { useTexture, Sphere } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { MotionValue, useMotionValue, useSpring } from 'framer-motion'

// --- Shaders ---

const AtmosphereShader = {
    uniforms: {
        uColor: { value: new Color('#4272F0') },
        uViewVector: { value: new Vector3(0, 0, 1) }
    },
    vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        
        void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPos.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
    `,
    fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        
        void main() {
            // Dynamic View Direction Calculation
            vec3 viewDir = normalize(cameraPosition - vWorldPosition);
            
            // Fresnel calculation
            float viewDot = dot(vNormal, viewDir);
            float intensity = pow(0.6 - viewDot, 4.0);
            
            // Clamp and boost
            intensity = clamp(intensity, 0.0, 1.0) * 3.5;
            
            // Soft fading at edges
            gl_FragColor = vec4(uColor, 1.0) * intensity; 
        }
    `
}

// --- Components ---


function EarthMesh({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    // Textures
    const [specularMap, lightsMap, cloudsMap] = useTexture([
        '/assets/textures/earth_specular_2048.jpg',
        '/assets/textures/earth_lights_2048.png',
        '/assets/textures/earth_clouds_1024.png'
    ])

    const meshRef = useRef<Mesh>(null)
    const atmosphereRef = useRef<Mesh>(null)
    const groupRef = useRef<Group>(null)

    // Mobile Detection for Performance
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const segments = isMobile ? 32 : 64

    // Material refs
    const earthMatRef = useRef<MeshStandardMaterial>(null)
    const atmosphereMatRef = useRef<ShaderMaterial>(null)

    useFrame((state) => {
        const scroll = scrollProgress.get() || 0
        const time = state.clock.getElapsedTime()

        // Opacity Logic: Solid (1.0) -> Mist (0.1)
        const targetOpacity = 1.0 - (scroll * 0.9) // Ends at 0.1

        if (earthMatRef.current) {
            earthMatRef.current.opacity = targetOpacity
            // Dim emissive slightly as it fades to avoid "floating lights" too strong
            earthMatRef.current.emissiveIntensity = 2.0 * (1.0 - scroll * 0.5)
        }

        // Atmosphere Transparency
        if (atmosphereMatRef.current) {
            atmosphereMatRef.current.transparent = true
            atmosphereMatRef.current.opacity = 1.0 // Atmosphere stays bright
        }

        // Cloud Rotation (Subtle detail)
        if (meshRef.current) {
            // meshRef.current.rotation.y += 0.0002
        }
    })

    return (
        <group ref={groupRef}>
            {/* Core Earth 
                - Using Specular Map as map to colorize Land Blue (#4272F0) and Ocean Black.
                - Using Lights Map for Night Lights.
            */}
            <Sphere args={[1.5, segments, segments]} ref={meshRef}>
                <meshStandardMaterial
                    ref={earthMatRef}
                    map={specularMap} // White Land, Black Ocean
                    color="#4272F0"   // Tints the White Land to Blue

                    emissiveMap={lightsMap}
                    emissive="#40E0D0" // Cyan/Turquoise Light
                    emissiveIntensity={2.0}

                    roughness={0.6}
                    metalness={0.2}

                    transparent
                    opacity={1}
                />
            </Sphere>

            {/* Clouds Layer (Optional, adds depth) */}
            <Sphere args={[1.51, segments, segments]}>
                <meshStandardMaterial
                    map={cloudsMap}
                    transparent
                    opacity={0.3}
                    blending={AdditiveBlending}
                    side={BackSide} // Or FrontSide with depthWrite false
                    depthWrite={false}
                />
            </Sphere>

            {/* Atmosphere Halo (Outer Glow) */}
            <Sphere args={[1.5, segments, segments]} scale={[1.03, 1.03, 1.03]} ref={atmosphereRef}>
                <shaderMaterial
                    ref={atmosphereMatRef}
                    args={[AtmosphereShader]}
                    transparent
                    blending={AdditiveBlending}
                    side={BackSide}
                    depthWrite={false}
                />
            </Sphere>
        </group>
    )
}

function Scene({ scrollProgress, mouseX, mouseY }: { scrollProgress: MotionValue<number>, mouseX: MotionValue<number>, mouseY: MotionValue<number> }) {
    const groupRef = useRef<Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return

        const scroll = scrollProgress.get() || 0
        const mX = mouseX.get()
        const mY = mouseY.get()

        // --- Layout Transition ---

        // Position: x=3.5 (Hero) -> x=0 (Center)
        const startX = 3.5
        const endX = 0
        const currentX = startX + (endX - startX) * scroll

        // Scale: 1.0 (Hero) -> 2.5 (Immersion)
        const startScale = 1.0
        const endScale = 2.5
        const currentScale = startScale + (endScale - startScale) * scroll

        groupRef.current.position.x = currentX
        groupRef.current.scale.setScalar(currentScale)

        // --- Rotation Physics ---

        // Initial Orientation: ~140 degrees to showcase Americas/Europe high-res textures
        const initialRotation = 2.4

        // Auto-rotate: Reduced speed for detail appreciation
        const ambientRotation = state.clock.getElapsedTime() * 0.04

        // Mouse Influence (High sensitivity as requested 0.12)
        const tiltMax = 0.12

        // X Rotation (Tilt Up/Down): Mouse only
        groupRef.current.rotation.x = mY * tiltMax

        // Y Rotation (Spin): Initial + Ambient + Mouse
        groupRef.current.rotation.y = initialRotation + ambientRotation + (mX * tiltMax)

        // Z Rotation: Slight static tilt for realism
        groupRef.current.rotation.z = 0.2
    })

    return (
        <group ref={groupRef} position={[3.5, 0, 0]}>
            <EarthMesh scrollProgress={scrollProgress} />
        </group>
    )
}






export default function Globe3D({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Smooth Spring for mouse (Refined Weight)
    const springConfig = { stiffness: 50, damping: 20, mass: 1 }
    const mouseXSpring = useSpring(mouseX, springConfig)
    const mouseYSpring = useSpring(mouseY, springConfig)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1
            const y = -(e.clientY / window.innerHeight) * 2 + 1
            mouseX.set(x)
            mouseY.set(y)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    return (
        <Canvas
            gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
                depth: true
            }}
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 8], fov: 40, near: 0.1, far: 200 }}
        >
            <color attach="background" args={['#000000']} />

            {/* Cinematic Lighting */}
            <ambientLight intensity={0.1} /> {/* Low ambient for contrast */}

            {/* Main Key Light (Sun) - Blue/White */}
            <directionalLight position={[10, 5, 5]} intensity={3} color="#ffffff" />

            {/* Rim Light for Edge Definition */}
            <pointLight position={[-10, 10, -5]} intensity={5} color="#4272F0" distance={50} />

            <Suspense fallback={null}>
                <Scene
                    scrollProgress={scrollProgress}
                    mouseX={mouseXSpring}
                    mouseY={mouseYSpring}
                />
            </Suspense>

            {!isMobile && (
                <EffectComposer enableNormalPass={false}>
                    <Bloom
                        luminanceThreshold={0.15} // Glow mostly on highlights
                        mipmapBlur
                        intensity={1.5}
                        radius={0.7}
                    />
                </EffectComposer>
            )}
        </Canvas>
    )
}
