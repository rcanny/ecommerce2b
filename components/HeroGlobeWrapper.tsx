'use client'

import { useIsMobile } from '@/hooks/useIsMobile'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { MotionValue } from 'framer-motion'

// Move the dynamic import here
const Globe3D = dynamic(() => import('./Globe3D'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-black" />
})

interface HeroGlobeWrapperProps {
    scrollProgress: MotionValue<number>
}

export default function HeroGlobeWrapper({ scrollProgress }: HeroGlobeWrapperProps) {
    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <Image
                src="/assets/globo-mobile-ref.png"
                alt="Globe Mobile Reference"
                width={1000}
                height={1000}
                priority
                loading="eager"
                className="
          absolute 
          top-1/2 
          -translate-y-1/2 
          -right-[65%] 
          w-[180vw] 
          h-auto 
          max-w-none 
          z-0 
          pointer-events-none 
          object-contain 
          opacity-90
        "
            />
        )
    }

    return (
        <Globe3D scrollProgress={scrollProgress} />
    )
}
