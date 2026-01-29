'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

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

export default function Contact() {
    return (
        <section id="contato" className="relative z-20 -mt-[50px] bg-deep-onyx rounded-t-[3rem] shadow-[0_-25px_60px_-12px_rgba(0,0,0,0.8)] pt-24 pb-24 px-6 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

            <div className="container mx-auto relative z-10 max-w-[600px]">
                {/* Title */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter leading-[1.1]">
                        Vamos construir o <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                            seu próximo nível.
                        </span>
                    </h2>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium ml-1">Nome <span className="text-action-green">*</span></label>
                            <input
                                type="text"
                                placeholder="Digite seu nome"
                                className="w-full h-14 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium ml-1">Sobrenome <span className="text-action-green">*</span></label>
                            <input
                                type="text"
                                placeholder="Digite seu sobrenome"
                                className="w-full h-14 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium ml-1">E-mail <span className="text-action-green">*</span></label>
                        <input
                            type="email"
                            placeholder="Digite seu melhor E-mail"
                            className="w-full h-14 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium ml-1">Empresa <span className="text-action-green">*</span></label>
                        <input
                            type="text"
                            placeholder="Digite o nome da empresa"
                            className="w-full h-14 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium ml-1">Telefone <span className="text-action-green">*</span></label>
                            <input
                                type="tel"
                                placeholder="(11) 99999-9999"
                                className="w-full h-14 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium ml-1">Site <span className="text-action-green">*</span></label>
                            <input
                                type="url"
                                placeholder="https://seu-site.com"
                                className="w-full h-14 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium ml-1">Perguntas ou Comentários <span className="text-action-green">*</span></label>
                        <textarea
                            rows={4}
                            placeholder="Digite aqui sua mensagem..."
                            className="w-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300 resize-none"
                        ></textarea>
                    </div>

                    <div className="pt-8 flex justify-center">
                        <MagneticButton>
                            <button className="relative px-12 py-5 rounded-full bg-action-green text-black font-bold text-lg overflow-hidden shadow-[0_0_20px_rgba(108,201,45,0.4)] hover:scale-105 transition-all duration-500 group cursor-pointer w-full md:w-auto">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Iniciar Projeto
                                </span>
                                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] rotate-45 animate-[shine_5s_cubic-bezier(0.42,0,0.58,1)_infinite]" />
                            </button>
                        </MagneticButton>
                    </div>
                </form>
            </div>
        </section>
    )
}
