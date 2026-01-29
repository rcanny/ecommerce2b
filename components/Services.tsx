'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Smartphone, Globe, BarChart, Zap, Layers } from 'lucide-react'

const services = [
    { id: 1, title: 'E-commerce Custom', desc: 'Arquitetura escalável e design totalmente personalizado para sua marca.', icon: ShoppingCart, span: 'col-span-12 md:col-span-8', gradient: 'from-logo-blue/20 to-transparent' },
    { id: 2, title: 'App Mobile', desc: 'Experiência nativa iOS e Android integrada.', icon: Smartphone, span: 'col-span-12 md:col-span-4', gradient: 'from-action-green/20 to-transparent' },
    { id: 3, title: 'SEO Técnico', desc: 'Otimização profunda para dominar os buscadores.', icon: Globe, span: 'col-span-12 md:col-span-4', gradient: 'from-purple-500/20 to-transparent' },
    { id: 4, title: 'Growth & Analytics', desc: 'Dashboards inteligentes e estratégia de dados.', icon: BarChart, span: 'col-span-12 md:col-span-4', gradient: 'from-orange-500/20 to-transparent' },
    { id: 5, title: 'Automação', desc: 'Processos otimizados com IA.', icon: Zap, span: 'col-span-12 md:col-span-4', gradient: 'from-pink-500/20 to-transparent' },
]

function SpotlightCard({ children, className = "", gradient = "" }: { children: React.ReactNode, className?: string, gradient?: string }) {
    const divRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0, opacity: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!divRef.current) return
        const rect = divRef.current.getBoundingClientRect()
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 })
    }

    const handleMouseLeave = () => {
        setPosition((prev) => ({ ...prev, opacity: 0 }))
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px transition duration-300 z-10"
                style={{
                    opacity: position.opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`
                }}
            />
            <div className={`relative h-full z-0 bg-gradient-to-br ${gradient} opacity-50 absolute inset-0 transition-opacity duration-500 hover:opacity-100`} />

            <div className="relative h-full z-20">
                {children}
            </div>
        </motion.div>
    )
}

export default function Services() {
    return (
        <section id="servicos" className="relative z-20 -mt-[50px] bg-deep-onyx rounded-t-[3rem] shadow-[0_-25px_60px_-12px_rgba(0,0,0,0.8)] pt-24 pb-24 px-6">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-4">Ecossistema <span className="text-logo-blue">Completo</span></h2>
                    <p className="text-gray-400">Tudo o que você precisa para escalar.</p>
                </div>

                <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[250px]">
                    {services.map((item) => (
                        <SpotlightCard key={item.id} className={`${item.span} group`} gradient={item.gradient}>
                            <div className="h-full p-8 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                                        <item.icon className="w-6 h-6 text-white group-hover:text-logo-blue transition-colors" />
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Layers className="w-5 h-5 text-gray-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-logo-blue transition-colors">{item.title}</h3>
                                    <p className="text-sm text-gray-400 max-w-[80%]">{item.desc}</p>
                                </div>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    )
}
