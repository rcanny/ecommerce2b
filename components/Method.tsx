'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { Target, Zap, Layout, MoveRight } from 'lucide-react'

export default function Method() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // --- Height: 450vh (Desktop) / Auto (Mobile) ---

    // Layer 1 (0% to 15%)
    // Layer 1 (0% to 15%)
    const layer1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.1, 0.15], [0, 1, 1, 0])
    const layer1Scale = useTransform(scrollYProgress, [0, 0.05], [0.95, 1])
    const layer1BlurVal = useTransform(scrollYProgress, [0, 0.05, 0.1, 0.15], ["10px", "0px", "0px", "10px"])
    const layer1Blur = useTransform(layer1BlurVal, v => `blur(${v})`)

    // Layer 2 (15% to 40%)
    const layer2Opacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0])
    const layer2Scale = useTransform(scrollYProgress, [0.15, 0.2], [0.95, 1])
    const layer2BlurVal = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], ["10px", "0px", "0px", "10px"])
    const layer2Blur = useTransform(layer2BlurVal, v => `blur(${v})`)

    // Layer 3 (40% to 85%) 
    const layer3Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.8, 0.85], [0, 1, 1, 0])
    const layer3Scale = useTransform(scrollYProgress, [0.4, 0.5, 0.85], [0.95, 1, 0.7])
    const layer3BlurVal = useTransform(scrollYProgress, [0.4, 0.5, 0.8, 0.85], ["10px", "0px", "0px", "10px"])
    const layer3Blur = useTransform(layer3BlurVal, v => `blur(${v})`)
    const layer3Y = useTransform(scrollYProgress, [0.8, 0.85], ["0vh", "-20vh"])

    return (
        <section
            id="metodo"
            ref={containerRef}
            className="relative bg-black"
        >
            {/* --- 1. Sticky Layer Architecture (Height 450vh / Auto on Mobile) --- */}
            <div className={`relative w-full z-10 ${isMobile ? 'h-auto py-20' : 'h-[250vh] md:h-[450vh] pb-[20vh]'}`}>
                <div className={`${isMobile ? 'relative h-auto flex flex-col gap-20' : 'sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden'}`}>

                    <div className={`relative w-full px-6 flex flex-col items-center ${isMobile ? 'gap-20' : ''}`}>

                        {/* Layer 01 */}
                        <motion.div
                            style={isMobile ? {} : { opacity: layer1Opacity, scale: layer1Scale, filter: layer1Blur }}
                            className={`${isMobile ? 'relative opacity-100' : 'absolute inset-0 flex items-center justify-center w-full'}`}
                        >
                            <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter whitespace-nowrap px-4 text-center">
                                Estruturamos sua presença digital
                            </h2>
                        </motion.div>

                        {/* Layer 02 */}
                        <motion.div
                            style={isMobile ? {} : { opacity: layer2Opacity, scale: layer2Scale, filter: layer2Blur }}
                            className={`${isMobile ? 'relative opacity-100' : 'absolute inset-0 flex items-center justify-center w-full'}`}
                        >
                            <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter whitespace-nowrap px-4 text-center">
                                Performance e foco total em vendas
                            </h2>
                        </motion.div>

                        {/* Layer 03 */}
                        <motion.div
                            style={isMobile ? {} : { opacity: layer3Opacity, scale: layer3Scale, filter: layer3Blur, y: layer3Y }}
                            className={`${isMobile ? 'relative opacity-100' : 'absolute inset-0 flex items-center justify-center w-full'}`}
                        >
                            <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter whitespace-nowrap px-4 text-center">
                                Nosso foco é ajudar negócios como o seu a saírem do offline
                            </h2>
                        </motion.div>

                    </div>

                    {/* Deep Atmosphere */}
                    <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-20 pointer-events-none -z-10" />
                </div>
            </div>

            {/* --- 2. Sheet Overlay (White Copy) --- */}
            {/* Syncs with end of 450vh scroll */}
            {/* REFINED: Rounded Top 40px + Negative Shadow + Z-Index 15 (Lowered for next section overlay) */}
            <div
                className="relative z-[15] -mt-[50vh] bg-[#F5F5F7] rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] origin-top"
            >

                {/* Visual "Lip" Shadow */}
                <div className="absolute inset-x-0 top-0 h-px shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.5)] z-30 opacity-50" />

                <div className="container mx-auto max-w-[1000px] pt-32 px-6 pb-48">
                    {/* Header Manifesto */}
                    <div className="mb-24 space-y-16">
                        <div className="space-y-8">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1D1D1F] tracking-tight leading-[1.05]"
                            >
                                Somos o seu <br />
                                <span className="text-black/40">parceiro estratégico.</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-xl md:text-2xl leading-[1.6] text-[#1D1D1F]/70 font-medium max-w-2xl"
                            >
                                Conectamos sua empresa ao digital com sites, lojas virtuais e páginas de vendas que realmente convertem.
                            </motion.p>
                        </div>

                        <div className="w-full h-px bg-[#1D1D1F]/10" />

                        {/* Grid de Benefícios */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col space-y-4"
                            >
                                <div className="w-12 h-12 bg-[#6CC92D]/10 rounded-2xl flex items-center justify-center mb-2">
                                    <Target className="w-6 h-6 text-[#6CC92D]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1D1D1F]">Estratégia Integrada</h3>
                                <p className="text-lg leading-[1.7] text-[#1D1D1F]/70">
                                    Mais do que uma agência, somos seu braço direito. Trabalhamos junto com seu time comercial para integrar anúncios, estrutura e processos que geram resultado.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col space-y-4"
                            >
                                <div className="w-12 h-12 bg-[#6CC92D]/10 rounded-2xl flex items-center justify-center mb-2">
                                    <Zap className="w-6 h-6 text-[#6CC92D]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1D1D1F]">Ciclo Completo</h3>
                                <p className="text-lg leading-[1.7] text-[#1D1D1F]/70">
                                    Fechamos o ciclo da venda: da atração ao pedido. Otimizamos o atendimento via WhatsApp, telefone e e-mail para transformar leads em vendas todos os dias.
                                </p>
                            </motion.div>
                        </div>

                        {/* Manifesto Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-[#FBFBFD] rounded-3xl p-10 border border-[#1D1D1F]/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)]"
                        >
                            <h3 className="text-xs font-bold tracking-widest uppercase text-[#1D1D1F]/40 mb-6 flex items-center gap-2">
                                <Layout className="w-4 h-4" />
                                O Manifesto E-commerce2B
                            </h3>
                            <blockquote className="text-xl md:text-2xl leading-[1.6] text-[#1D1D1F] font-serif italic border-l-4 border-[#6CC92D] pl-6">
                                &quot;Na E-commerce2B, entendemos que você não precisa apenas de um site bonito, precisa de resultados... Atuamos como parceiros do seu negócio, assumindo a responsabilidade de gerar vendas.&quot;
                            </blockquote>
                        </motion.div>
                    </div>

                    {/* --- Unified Content Grid (Bento) --- */}
                    <div id="premios" className="mt-24 mb-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6 h-auto md:h-[600px] w-full max-w-6xl mx-auto">

                            {/* Card 01: Visita Técnica (Left - Tall) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative md:row-span-2 rounded-[1.5rem] overflow-hidden group cursor-pointer min-h-[300px] scroll-mt-[500px] md:scroll-mt-[300px]"
                            >
                                <Image
                                    src="/assets/green-tower.jpg"
                                    alt="Visita Técnica Green Tower"
                                    fill
                                    className="object-cover filter md:grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 transform transition-transform duration-500 group-hover:-translate-y-1">
                                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">Visita Técnica – Green Tower & STECK</h3>
                                    <p className="text-white/70 text-base md:text-lg">Validação presencial de processos e infraestrutura</p>
                                </div>
                            </motion.div>

                            {/* Card 02: Prêmio (Top Right) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="relative rounded-[1.5rem] overflow-hidden group cursor-pointer min-h-[300px]"
                            >
                                <Image
                                    src="/assets/steck.jpg"
                                    alt="Prêmio Tamo On"
                                    fill
                                    className="object-cover object-[center_60%] filter md:grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                />
                                {/* Compact Gradient: Bottom 40% only */}
                                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black/90 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-6 transform transition-transform duration-500 group-hover:-translate-y-1">
                                    <h3 className="text-white text-lg font-bold mb-1">Prêmio Tamo On – Schneider Electric</h3>
                                    <p className="text-white/70 text-sm leading-tight">Vencedores 2024/2025: Performance e inovação</p>
                                </div>
                            </motion.div>

                            {/* Card 03: Cultura (Bottom Right) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative rounded-[1.5rem] overflow-hidden group cursor-pointer min-h-[300px]"
                            >
                                <Image
                                    src="/assets/team.jpg"
                                    alt="Cultura E-commerce2b"
                                    fill
                                    className="object-cover filter md:grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 transform transition-transform duration-500 group-hover:-translate-y-1">
                                    <h3 className="text-white text-xl md:text-2xl font-bold">Cultura de Alta Performance</h3>
                                </div>
                            </motion.div>

                        </div>
                    </div>

                    {/* --- Final CTA (Magnetic) --- */}
                    <div className="flex justify-center mt-[100px] relative px-6">
                        <MagneticButton onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })} className="group relative bg-[#000000] text-white px-10 py-5 rounded-full text-lg font-bold tracking-wide transition-all hover:scale-105 active:scale-95 z-20 overflow-hidden">
                            <span className="relative z-10 flex items-center gap-3">
                                Falar com Especialista
                                <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            {/* Glow Background */}
                            <div className="absolute inset-0 -z-10 bg-[#6CC92D] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                        </MagneticButton>

                        {/* Ambient Pulse Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#6CC92D]/30 blur-[40px] rounded-full animate-pulse z-0 pointer-events-none" />
                    </div>
                </div>

            </div >
        </section >
    )
}

function MagneticButton({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
    const ref = useRef<HTMLButtonElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
    const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e
        const { left, top, width, height } = ref.current!.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2
        x.set((clientX - centerX) * 0.25)
        y.set((clientY - centerY) * 0.25)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={className}
        >
            {children}
        </motion.button>
    )
}
