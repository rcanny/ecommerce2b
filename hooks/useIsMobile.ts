import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint: number = 768) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Check if window is defined (SSR safe)
        if (typeof window === 'undefined') return

        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint)
        }

        // Initial check
        checkMobile()

        // Add listener
        window.addEventListener('resize', checkMobile)

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile)
    }, [breakpoint])

    return isMobile
}
