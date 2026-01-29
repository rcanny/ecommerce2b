'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

const Globe3D = dynamic(() => import('./Globe3D'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-black" />
})


export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Text transforms
    const opacity1 = useTransform(smoothProgress, [0, 0.2, 0.25], [1, 1, 0])
    const y1 = useTransform(smoothProgress, [0, 0.2, 0.25], [0, 0, -50])
    const pointerEvents1 = useTransform(smoothProgress, (val) => val > 0.25 ? 'none' : 'auto')

    const opacity2 = useTransform(smoothProgress, [0.2, 0.25, 0.75, 0.8], [0, 1, 1, 0])
    const y2 = useTransform(smoothProgress, [0.2, 0.25, 0.75, 0.8], [50, 0, 0, -50])
    const pointerEvents2 = useTransform(smoothProgress, (val) => (val > 0.2 && val < 0.8) ? 'auto' : 'none')

    const opacity3 = useTransform(smoothProgress, [0.75, 0.8, 1], [0, 1, 1])
    const y3 = useTransform(smoothProgress, [0.75, 0.8, 1], [50, 0, 0])
    const pointerEvents3 = useTransform(smoothProgress, (val) => val > 0.75 ? 'auto' : 'none')

    return (


        <div id="hero" ref={containerRef} className="relative h-[250dvh] bg-deep-onyx">
            <div className="sticky top-0 h-[100dvh] overflow-hidden">

                {/* 3D Globe Container - Absolute Positioned */}
                <div
                    className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none overflow-hidden"
                    style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)' }}
                >
                    <div className="w-full h-full relative">
                        <Globe3D scrollProgress={smoothProgress} />
                    </div>
                </div>

                {/* Overlays for integration */}
                <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-deep-onyx to-transparent" />
                    {/* Blue Glow in Background - Re-positioned */}
                    <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[800px] h-[800px] bg-[#4272F0]/10 blur-[150px] pointer-events-none" />
                </div>

                {/* Content Container */}
                <div className="container mx-auto h-full relative z-20 pointer-events-none">
                    <div className="h-full flex flex-col justify-center lg:w-1/2 px-6 lg:px-0">

                        {/* SCENE 1: 0% - 20% */}
                        <motion.div
                            style={{ opacity: opacity1, y: y1, pointerEvents: pointerEvents1 }}
                            className="absolute inset-0 flex flex-col justify-center"
                        >
                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
                                E-commerce
                                <span className="block text-logo-blue drop-shadow-[0_0_15px_rgba(66,114,240,0.5)]">
                                    Do Futuro
                                </span>
                            </h1>
                            <p className="text-gray-400 text-lg lg:text-xl max-w-lg leading-relaxed mb-8">
                                Transforme sua loja online com autoridade visual, máxima performance e interatividade que converte.
                            </p>
                            <div className="flex flex-wrap gap-4 pointer-events-auto">
                                <MagneticButton>
                                    <button
                                        onClick={() => {
                                            const contact = document.getElementById('contato');
                                            if (contact) contact.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="relative px-8 py-4 rounded-full bg-action-green text-black font-bold overflow-hidden shadow-[0_0_20px_rgba(108,201,45,0.4)] hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group cursor-pointer z-50 pointer-events-auto"
                                    >
                                        <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Começar Agora <ArrowRight className="w-5 h-5" />
                                        </span>
                                        <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] rotate-45 animate-[shine_5s_cubic-bezier(0.42,0,0.58,1)_infinite]" />
                                    </button>
                                </MagneticButton>
                                <MagneticButton>
                                    <button
                                        onClick={() => {
                                            const element = document.getElementById('premios');
                                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="hidden md:flex px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors items-center gap-2 backdrop-blur-md cursor-pointer"
                                    >
                                        <Play className="w-4 h-4 fill-current" />
                                        Showreel
                                    </button>
                                </MagneticButton>
                            </div>
                        </motion.div>

                        {/* SCENE 2: 25% - 75% */}
                        <motion.div
                            style={{ opacity: opacity2, y: y2, pointerEvents: pointerEvents2 }}
                            className="absolute inset-0 flex flex-col justify-center"
                        >
                            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
                                Engenharia de
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                                    Performance
                                </span>
                            </h2>
                            <p className="text-gray-400 text-lg lg:text-xl max-w-lg leading-relaxed">
                                Mergulhe nas camadas profundas da conversão. Cada pixel otimizado para velocidade máxima.
                            </p>
                        </motion.div>

                        {/* SCENE 3: 80% - 100% */}
                        <motion.div
                            style={{ opacity: opacity3, y: y3, pointerEvents: pointerEvents3 }}
                            className="absolute inset-0 flex flex-col justify-center"
                        >
                            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
                                Pronto para
                                <span className="block text-action-green drop-shadow-[0_0_15px_rgba(108,201,45,0.5)]">
                                    Construir?
                                </span>
                            </h2>
                            <p className="text-gray-400 text-lg lg:text-xl max-w-lg leading-relaxed mb-8">
                                A sua nova identidade digital começa aqui.
                            </p>
                            <div className="flex gap-4 pointer-events-auto">
                                <button onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors cursor-pointer">
                                    Falar com Especialista
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator (Fades out) */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-40"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
                </motion.div>
            </div>
        </div>
    )
}

function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const x = clientX - (rect.left + rect.width / 2);
            const y = clientY - (rect.top + rect.height / 2);
            setPosition({ x: x * 0.15, y: y * 0.15 });
        }
    }

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    }

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    )
}
