'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { useRef } from 'react'

export default function Testimonials() {
    // --- 3D Tilt Logic ---
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Smooth physics
    const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }
    const xSpring = useSpring(x, springConfig)
    const ySpring = useSpring(y, springConfig)

    // Transform mouse range [-0.5, 0.5] to rotation degrees
    const rotateX = useTransform(ySpring, [-0.5, 0.5], [7, -7]) // Up/Down tilt
    const rotateY = useTransform(xSpring, [-0.5, 0.5], [-7, 7]) // Left/Right tilt

    // Dynamic Sheen Position
    const sheenX = useTransform(xSpring, [-0.5, 0.5], ["-100%", "200%"])
    const sheenOpacity = useTransform(xSpring, [-0.5, 0.5], [0, 0.5]) // Only visible when active? No, visible on move.

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        // Normalized coordinates -0.5 to 0.5
        const xPct = (mouseX / width) - 0.5
        const yPct = (mouseY / height) - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <section id="cases" className="relative z-30 -mt-[50px] bg-deep-onyx rounded-t-[3rem] shadow-[0_-25px_60px_-12px_rgba(0,0,0,0.8)] pt-32 pb-32 px-6 overflow-hidden scroll-mt-[120px] md:scroll-mt-[100px]">
            <div className="container mx-auto max-w-6xl relative z-10">
                <div id="cases-mobile" className="absolute -top-20 left-0 w-full h-px opacity-0 pointer-events-none md:hidden scroll-mt-[150px]" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Coluna Esquerda: A Narrativa Estratégica */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                            Resultados que <br />
                            <span className="text-gray-500">transformam negócios.</span>
                        </h2>

                        <p className="text-lg md:text-xl text-[#A1A1AA] leading-relaxed max-w-lg">
                            Casos como o da <strong className="text-white">VALE AUTOMAÇÃO</strong> mostram o impacto que uma metodologia estratégica e uma parceria sólida com a E-commerce2b podem gerar!
                        </p>

                        <div className="flex flex-wrap gap-x-6 gap-y-3">
                            {['Diagnóstico', 'Reestruturação', 'Gestão de Tráfego', 'Performance'].map((tag) => (
                                <span key={tag} className="flex items-center gap-2 text-gray-400 font-mono text-sm tracking-tight cursor-default group hover:text-white transition-colors">
                                    <Check className="w-3 h-3 text-action-green/80 group-hover:text-action-green" />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-lg text-[#A1A1AA] italic font-light pt-4 border-l-2 border-action-green pl-6">
                            &quot;Se você deseja sair do improviso e escalar com método, o próximo caso de sucesso pode ser o seu.&quot;
                        </p>
                    </motion.div>

                    {/* Coluna Direita: The Interactive Physics Glass Card */}
                    <div className="relative perspective-1000" style={{ perspective: 1000 }}>

                        {/* 1. Abstract Graph Background (Atmosphere) - Static behind */}
                        <div className="absolute inset-0 -z-10 translate-x-10 translate-y-10 scale-110 opacity-20 pointer-events-none">
                            <svg viewBox="0 0 400 300" className="w-full h-full text-action-green overflow-visible">
                                <defs>
                                    <linearGradient id="graphGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                                    </linearGradient>
                                    <mask id="fadeRightMask">
                                        <linearGradient id="fadeGradient" x1="0" x2="1" y1="0" y2="0">
                                            <stop offset="0%" stopColor="white" />
                                            <stop offset="50%" stopColor="white" />
                                            <stop offset="100%" stopColor="black" />
                                        </linearGradient>
                                        <rect width="100%" height="100%" fill="url(#fadeGradient)" />
                                    </mask>
                                </defs>
                                <g mask="url(#fadeRightMask)">
                                    <path
                                        d="M0,280 C150,280 250,80 400,80"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                    <path
                                        d="M0,280 C150,280 250,80 400,80 V300 H0 Z"
                                        fill="url(#graphGradient)"
                                        stroke="none"
                                    />
                                </g>
                            </svg>
                        </div>

                        {/* Spotlight Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-action-green/20 blur-[100px] rounded-full opacity-30 pointer-events-none" />

                        {/* 2. Interactive Tilt Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}

                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}

                            className="relative group rounded-3xl preserve-3d cursor-default"
                        >
                            {/* Gradient Border Layer (Diamond Cut) */}
                            <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-white/60 via-white/5 to-action-green/10 pointer-events-none"
                                style={{ transform: "translateZ(0px)" }} // Ensure it sticks
                            />

                            {/* Card Content Block */}
                            <div className="relative bg-black/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_-10px_rgba(108,201,45,0.15)] overflow-hidden h-full">
                                {/* Note: Removed outer border since we have the wrapper border */}

                                {/* Noise Texture */}
                                <div
                                    className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                                    }}
                                />

                                {/* 3. Dynamic Sheen (Gloss Reflection) */}
                                <motion.div
                                    className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] pointer-events-none z-50"
                                    style={{ left: sheenX, opacity: 0.5 }} // Should move as we tilt
                                />

                                {/* Decorative Quote */}
                                <div className="absolute top-6 right-8 text-white/5 font-serif text-[10rem] leading-none select-none -z-10 font-bold" style={{ transform: "translateZ(-20px)" }}>
                                    &rdquo;
                                </div>

                                <div className="mb-8 relative z-10" style={{ transform: "translateZ(20px)" }}>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Empresa</h3>
                                    <p className="text-white font-semibold text-lg">Vale Automação Industrial</p>
                                </div>

                                <blockquote className="text-xl md:text-2xl text-gray-200 font-medium leading-relaxed mb-10 relative z-10" style={{ transform: "translateZ(30px)" }}>
                                    &quot;A empresa E-commerce2b transformou o nosso E-commerce... crescemos

                                    <span
                                        className="text-5xl md:text-6xl font-bold text-white mx-2 align-bottom inline-block"
                                        style={{ textShadow: "0 0 30px rgba(108, 201, 45, 0.6), 0 0 60px rgba(108, 201, 45, 0.3)" }}
                                    >
                                        10X
                                    </span>

                                    em menos de 6 meses.&quot;
                                </blockquote>

                                <div className="flex items-center gap-6 relative z-10" style={{ transform: "translateZ(40px)" }}>
                                    <div className="w-20 h-20 rounded-full border-2 border-action-green/50 p-1 relative overflow-hidden flex-shrink-0">
                                        <Image
                                            src="/assets/jonathan-russi.jpg"
                                            alt="Jonathan Russi"
                                            fill
                                            className="rounded-full object-cover object-top"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-xl">Jonathan Russi</h4>
                                        <p className="text-base text-action-green font-medium leading-normal">CEO Grupo VALEmat</p>
                                        <a href="https://lojavale.com.br" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors mt-1 block">
                                            Lojavale.com.br
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}
