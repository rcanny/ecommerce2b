import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Method from '@/components/Method'
import Contact from '@/components/Contact'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
    return (
        <main className="relative w-full">
            <Navbar />
            <Hero />
            <About />
            <Method />
            <Testimonials />
            <Contact />
            <Footer />
        </main>
    )
}
