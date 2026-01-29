'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, TrendingUp, ShoppingBag, Layers, Cpu, Search, ChevronLeft, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const cards = [
    {
        icon: Target,
        title: "Tráfego Pago",
        desc: "Estratégias customizadas por canal, segmentação precisa e otimização contínua. (Google Ads, Meta Ads e LinkedIn Ads)."
    },
    {
        icon: TrendingUp,
        title: "Consultoria & Mentoria",
        desc: "Acompanhamento individual ou por equipe para estruturar, otimizar e escalar e-commerces. Foco em lucro e funis."
    },
    {
        icon: ShoppingBag,
        title: "Implantação de E-commerce",
        desc: "Criação de lojas virtuais de alta performance, usabilidade, SEO, meios de pagamento e logística."
    },
    {
        icon: Layers,
        title: "Criação de Sites",
        desc: "Projetos profissionais para gerar autoridade e conversão, com foco em performance, SEO e experiência do usuário."
    },
    {
        icon: Cpu,
        title: "Integrações e Automatizações",
        desc: "Conectamos sistemas internos, ERPs, CRMs e plataformas com eficiência. Ideal para escalar operação."
    },
    {
        icon: Search,
        title: "SEO e Performance",
        desc: "Aumentamos o tráfego orgânico e melhoramos o posicionamento da sua empresa no Google."
    },
]

export default function About() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const logoRef = useRef(null)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const nextCard = () => {
        setActiveIndex((prev) => (prev + 1) % cards.length)
    }

    const prevCard = () => {
        setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }

    // Logo Animation
    useEffect(() => {
        gsap.to(logoRef.current, {
            y: 20,
            rotationY: 15,
            duration: 4,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        })
    }, [])

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextCard()
            if (e.key === 'ArrowLeft') prevCard()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const getCardStyle = (index: number) => {
        const diff = (index - activeIndex + cards.length) % cards.length

        let adjustedDiff = diff
        if (adjustedDiff > cards.length / 2) adjustedDiff -= cards.length
        if (adjustedDiff < -cards.length / 2) adjustedDiff += cards.length

        // Config Vars
        const xOffset = isMobile ? 320 : 420 // Responsive offset
        const zOffset = -400
        const rotateY = -25
        const scale = 0.8
        const opacity = 0.4

        if (adjustedDiff === 0) {
            return {
                x: 0,
                z: 0,
                rotateY: 0,
                scale: 1,
                opacity: 1,
                zIndex: 10,
                brightness: 1
            }
        }

        if (adjustedDiff === 1 || adjustedDiff === -1) {
            const dir = adjustedDiff > 0 ? 1 : -1
            return {
                x: dir * xOffset,
                z: zOffset,
                rotateY: dir * -rotateY,
                scale: scale,
                opacity: 0.6,
                zIndex: 5,
                brightness: 0.5
            }
        }

        const dir = adjustedDiff > 0 ? 1 : -1
        return {
            x: dir * xOffset * 1.8,
            z: zOffset * 2,
            rotateY: dir * -rotateY * 1.5,
            scale: 0.5,
            opacity: 0,
            zIndex: 0,
            brightness: 0
        }
    }

    return (
        <section id="sobre" className="min-h-screen py-24 relative flex flex-col items-center justify-center overflow-hidden">

            {/* 3D Floating Logo */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none z-0">
                <div ref={logoRef} className="w-48 h-48 relative preserve-3d">
                    <div className="absolute inset-4 rounded-full bg-white/[0.02] backdrop-blur-[12px] border border-white/5 opacity-100 z-0 pointer-events-none" />
                    <img
                        src="/logo-icon.png"
                        alt="Logo"
                        className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(108,201,45,0.4)] drop-shadow-[2px_4px_6px_rgba(0,255,255,0.4)]"
                    />
                </div>
            </div>

            {/* Header Content */}
            <div className="text-center mb-20 relative z-10 max-w-4xl px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tighter">
                    Sobre a <span className="text-logo-blue drop-shadow-[0_0_20px_rgba(66,114,240,0.4)]">E-commerce2b</span>
                </h2>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    Atendemos desde a solução mais complexa em E-commerce até negócios locais que precisam aumentar a sua visibilidade e faturamento.
                </p>
            </div>

            {/* 3D Carousel Container */}
            <div className="relative w-full max-w-[1400px] h-[550px] md:h-[600px] flex items-center justify-center perspective-[1000px]">

                {/* Navigation Buttons */}
                <>
                    <button
                        onClick={prevCard}
                        className="absolute left-1 md:left-20 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-logo-blue hover:border-logo-blue hover:scale-110 transition-all group"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={nextCard}
                        className="absolute right-1 md:right-20 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-logo-blue hover:border-logo-blue hover:scale-110 transition-all group"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </>

                {/* Cards */}
                <div className="relative w-full h-full flex items-center justify-center preserve-3d">
                    <AnimatePresence mode="popLayout">
                        {cards.map((card, i) => {
                            const style = getCardStyle(i)
                            if (style.opacity === 0) return null

                            return (
                                <motion.div
                                    key={i}
                                    className="absolute w-[300px] md:w-[420px] h-[500px] md:h-[520px] bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center text-center backdrop-blur-xl shadow-2xl origin-center cursor-pointer"
                                    initial={false}
                                    animate={{
                                        x: style.x,
                                        z: style.z,
                                        rotateY: style.rotateY,
                                        scale: style.scale,
                                        opacity: style.opacity,
                                        zIndex: style.zIndex,
                                        filter: `brightness(${style.brightness}) blur(${style.opacity === 1 ? 0 : 4}px)`
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        ease: [0.23, 1, 0.32, 1]
                                    }}
                                    onClick={() => setActiveIndex(i)}
                                    style={{
                                        boxShadow: style.opacity === 1 ? '0 0 60px rgba(0,0,0,0.9), 0 0 0 1px rgba(108,201,45,0.4)' : 'none'
                                    }}
                                >
                                    {/* Card Content */}
                                    <div className="flex flex-col items-center justify-center h-full relative z-10 w-full">

                                        {/* Icon */}
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 md:mb-8 group-hover:border-[#6CC92D]/40 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                                            <card.icon className="w-8 h-8 md:w-10 md:h-10 text-[#6CC92D]" strokeWidth={1.5} />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl md:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 tracking-tighter drop-shadow-md leading-tight">
                                            {card.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 leading-relaxed text-sm md:text-base px-2">
                                            {card.desc}
                                        </p>

                                        {/* Glow Effect only on Active */}
                                        {style.opacity === 1 && (
                                            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-[#6CC92D]/10 to-transparent pointer-events-none opacity-40 mix-blend-screen" />
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Pagination Indicators */}
            <div className="flex gap-3 mt-4 z-20">
                {cards.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-[#6CC92D] w-12 shadow-[0_0_10px_#6CC92D]' : 'bg-white/20 w-2 hover:bg-white/40'
                            }`}
                    />
                ))}
            </div>

        </section>
    )
}
