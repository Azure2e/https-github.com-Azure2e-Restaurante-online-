import React, { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Reservation from './components/Reservation'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Modal from './components/Modal'

export default function App() {
  // Modal state
  const [selectedDish, setSelectedDish] = useState(null)

  useEffect(() => {
    // Set theme from localStorage if available
    const theme = localStorage.getItem('theme') || 'light'
    document.body.dataset.theme = theme
  }, [])

  useEffect(() => {
    // reveal animation on scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('section').forEach((s) => {
      s.classList.add('reveal') // default hidden state
      observer.observe(s)
    })

    return () => observer.disconnect()
  }, [])

  function openModal(dish) {
    setSelectedDish(dish)
  }

  function closeModal() {
    setSelectedDish(null)
  }

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Menu openModal={openModal} />
        <Gallery />
        <Reservation />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />

      <Modal dish={selectedDish} onClose={closeModal} />
    </>
  )
}