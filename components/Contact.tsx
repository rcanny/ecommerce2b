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
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        empresa: '',
        telefone: '',
        site: '',
        mensagem: ''
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        try {
            await fetch("https://script.google.com/macros/s/AKfycbznVXZEAWzQ8YEx-axW1v7ISpfXDqV_SHRX-UvxIM0GiCaQNeM-g-KByODB595vtS759A/exec", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify(formData),
            });

            setStatus('success')
            setFormData({
                nome: '',
                sobrenome: '',
                email: '',
                empresa: '',
                telefone: '',
                site: '',
                mensagem: ''
            })

        } catch (error) {
            console.error("Erro no envio:", error);
            setStatus('error')
        }
    }

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

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium ml-1">Nome <span className="text-action-green">*</span></label>
                            <input
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                type="text"
                                required
                                placeholder="Digite seu nome"
                                disabled={status === 'loading'}
                                className="w-full h-14 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300 disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium ml-1">Sobrenome <span className="text-action-green">*</span></label>
                            <input
                                name="sobrenome"
                                value={formData.sobrenome}
                                onChange={handleChange}
                                type="text"
                                required
                                placeholder="Digite seu sobrenome"
                                disabled={status === 'loading'}
                                className="w-full h-14 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300 disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium ml-1">E-mail <span className="text-action-green">*</span></label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            required
                            placeholder="Digite seu melhor E-mail"
                            disabled={status === 'loading'}
                            className="w-full h-14 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300 disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium ml-1">Empresa <span className="text-action-green">*</span></label>
                        <input
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleChange}
                            type="text"
                            required
                            placeholder="Digite o nome da empresa"
                            disabled={status === 'loading'}
                            className="w-full h-14 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300 disabled:opacity-50"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium ml-1">Telefone <span className="text-action-green">*</span></label>
                            <input
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                type="tel"
                                required
                                placeholder="(11) 99999-9999"
                                disabled={status === 'loading'}
                                className="w-full h-14 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300 disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium ml-1">Site</label>
                            <input
                                name="site"
                                value={formData.site}
                                onChange={handleChange}
                                type="url"
                                placeholder="https://seu-site.com (Opcional)"
                                disabled={status === 'loading'}
                                className="w-full h-14 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300 disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium ml-1">Perguntas ou Comentários <span className="text-action-green">*</span></label>
                        <textarea
                            name="mensagem"
                            value={formData.mensagem}
                            onChange={handleChange}
                            rows={4}
                            required
                            placeholder="Digite aqui sua mensagem..."
                            disabled={status === 'loading'}
                            className="w-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6CC92D] focus:shadow-[0_0_15px_rgba(108,201,45,0.2)] transition-all duration-300 resize-none disabled:opacity-50"
                        ></textarea>
                    </div>

                    <div className="pt-8 flex flex-col items-center">
                        <MagneticButton>
                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className="relative px-12 py-5 rounded-full bg-action-green text-black font-bold text-lg overflow-hidden shadow-[0_0_20px_rgba(108,201,45,0.4)] hover:scale-105 transition-all duration-500 group cursor-pointer w-full md:w-auto disabled:grayscale disabled:hover:scale-100"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {status === 'loading' ? 'Enviando...' : status === 'success' ? 'Enviado!' : 'Iniciar Projeto'}
                                </span>
                                {status !== 'loading' && status !== 'success' && (
                                    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] rotate-45 animate-[shine_5s_cubic-bezier(0.42,0,0.58,1)_infinite]" />
                                )}
                            </button>
                        </MagneticButton>

                        {status === 'success' && (
                            <p className="mt-4 text-action-green font-medium animate-in fade-in slide-in-from-bottom-2">
                                Obrigado! Entraremos em contato em breve.
                            </p>
                        )}

                        {status === 'error' && (
                            <p className="mt-4 text-red-500 font-medium animate-in fade-in slide-in-from-bottom-2">
                                Erro ao enviar. Tente novamente.
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </section>
    )
}
