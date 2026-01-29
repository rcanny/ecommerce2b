'use client'
import { motion } from "framer-motion"
import { Instagram, MessageCircle } from "lucide-react"
import Link from "next/link"

const services = ["E-COMMERCE", "WEB DESIGN", "TRÁFEGO PAGO", "SEO", "UI/UX", "ESTRATÉGIA", "GROWTH"]

export default function Footer() {
    return (
        <footer id="footer" className="relative bg-[#020202] pt-20 pb-10 overflow-hidden z-40">
            {/* Infinite Marquee */}
            <div className="relative flex overflow-hidden py-10 border-y border-white/5 bg-white/[0.02]">
                <div className="flex whitespace-nowrap gap-16 animate-marquee">
                    {[...services, ...services, ...services, ...services].map((item, i) => (
                        <div key={i} className="flex items-center gap-16">
                            <span className="text-6xl md:text-8xl font-black text-transparent hover:text-white/10 transition-colors duration-300"
                                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                                {item}
                            </span>
                            <div className="w-3 h-3 rounded-full bg-action-green/50" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Links */}
            <div className="container mx-auto px-6 mt-20 grid md:grid-cols-2 gap-12 items-end">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                        Vamos <br />
                        <span className="text-logo-blue">Construir?</span>
                    </h2>
                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/ecommerce2b.com.br/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-logo-blue hover:text-white hover:border-logo-blue transition-all duration-300 flex items-center gap-2 group cursor-pointer">
                            <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Instagram</span>
                        </a>
                    </div>
                </div>

                <div className="md:text-right">
                    <p className="text-gray-500 mb-4">ecommerce2b © 2026. Todos os direitos reservados.</p>
                    {/* <div className="flex md:justify-end gap-8 text-sm text-gray-400">
                        <Link href="#" className="hover:text-white transition-colors">Termos</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
                    </div> */}
                </div>
            </div>
        </footer>
    )
}
