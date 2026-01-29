'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Grid, MessageCircle, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { clsx } from 'clsx'

const navItems = [
    { name: 'Home', icon: Home, href: '#hero' },
    { name: 'Sobre', icon: User, href: '#sobre' },
    { name: 'Resultados', icon: Grid, href: '#cases' },
    { name: 'Contato', icon: MessageCircle, href: '#contato' },
]

export default function Navbar() {
    const [active, setActive] = useState('Home')
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleScroll = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Prevent hydration mismatch by returning null until mounted? 
    // Or just render desktop by default. Rendering desktop by default is safer for SEO.
    // However, to strictly follow "no ghost elements", we rely on the state.

    return (
        <>
            {/* Desktop Menu */}
            {!isMobile && (
                <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-max max-w-[90vw] mix-blend-difference">
                    <div className="flex relative items-center gap-1 p-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-md">
                        {navItems.map((item) => {
                            const isActive = active === item.name
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActive(item.name);
                                        handleScroll(item.href);
                                    }}
                                    className="relative px-4 py-2 rounded-full cursor-pointer group"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-light"
                                            className="absolute inset-0 bg-logo-blue/20 rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}

                                    <span className={clsx(
                                        "relative z-10 flex items-center gap-2 text-sm font-medium transition-colors duration-300",
                                        isActive ? "text-white" : "text-white/60 group-hover:text-white"
                                    )}>
                                        <item.icon className="w-4 h-4" />
                                        <span className="">{item.name}</span>
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </nav>
            )}

            {/* Mobile Header (Pill) */}
            {isMobile && (
                <div className="fixed top-6 left-0 w-full flex justify-center z-[100] mix-blend-difference pointer-events-none">
                    <div className="pointer-events-auto bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-4">
                        <img src="/logo-icon.png" alt="Logo" className="w-8 h-8 object-contain" />
                        <button
                            onClick={() => setIsOpen(true)}
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-[20px] flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex flex-col gap-8 text-center">
                            {navItems.map((item, i) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsOpen(false);
                                        setActive(item.name);
                                        handleScroll(item.href);
                                    }}
                                    className="text-4xl font-bold text-white hover:text-logo-blue transition-colors"
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
