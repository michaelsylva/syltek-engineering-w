import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Gear, List, CaretDown, Cube, Robot, Printer, ChartLine } from '@phosphor-icons/react'

type View = 'home' | 'mechanical-design' | 'automation-robotics' | 'prototype-development' | 'consultation' | 'contact'

interface HeaderProps {
  scrolled: boolean
  onNavigate: (view: View) => void
  onScrollToSection?: (id: string) => void
}

export function Header({ scrolled, onNavigate, onScrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navServicesOpen, setNavServicesOpen] = useState(false)

  const servicePages = [
    { id: 'mechanical-design' as View, label: 'Mechanical Design', icon: <Cube className="w-4 h-4" /> },
    { id: 'automation-robotics' as View, label: 'Automation & Robotics', icon: <Robot className="w-4 h-4" /> },
    { id: 'prototype-development' as View, label: 'Prototype Development', icon: <Printer className="w-4 h-4" weight="fill" /> },
    { id: 'consultation' as View, label: 'Consultation', icon: <ChartLine className="w-4 h-4" /> }
  ]

  const handleScrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    setNavServicesOpen(false)
    if (onScrollToSection) {
      onScrollToSection(id)
    }
  }

  const handleNavigate = (view: View) => {
    setMobileMenuOpen(false)
    setNavServicesOpen(false)
    onNavigate(view)
  }

  const navItems = [
    { label: 'Home', id: 'home', action: () => handleNavigate('home') },
    { label: 'Capabilities', id: 'capabilities', action: () => handleScrollToSection('capabilities') },
    { label: 'Expertise', id: 'expertise', action: () => handleScrollToSection('expertise') },
    { label: 'Contact', id: 'contact', action: () => handleScrollToSection('contact') }
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-all duration-200 group"
          >
            <Gear className="w-8 h-8 text-primary group-hover:rotate-45 transition-transform duration-300" weight="fill" />
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">Syltek Engineering</span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            <div 
              className="relative"
              onMouseEnter={() => setNavServicesOpen(true)}
              onMouseLeave={() => setNavServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                Services <CaretDown className={`w-4 h-4 transition-transform duration-200 ${navServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {navServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 pt-2 z-50"
                >
                  <div className="w-64 bg-background border border-border rounded-lg shadow-lg overflow-hidden">
                    {servicePages.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleNavigate(service.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:bg-accent/20 hover:text-primary transition-all duration-200 group"
                      >
                        <div className="text-accent group-hover:text-primary group-hover:scale-110 transition-all duration-200">{service.icon}</div>
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">{service.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            <Button onClick={() => handleScrollToSection('contact')} size="sm" className="hover:shadow-lg transition-shadow duration-200">
              Get in Touch
            </Button>
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <List className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Services</p>
                  <div className="flex flex-col gap-2">
                    {servicePages.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleNavigate(service.id)}
                        className="flex items-center gap-3 text-left text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 py-2 px-2 rounded-md"
                      >
                        <div className="text-accent hover:scale-110 transition-transform duration-200">{service.icon}</div>
                        <span className="font-medium">{service.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <Separator />
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="text-lg font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 text-left py-2 px-2 rounded-md"
                  >
                    {item.label}
                  </button>
                ))}
                <Button onClick={() => handleScrollToSection('contact')} className="w-full hover:shadow-lg transition-shadow duration-200">
                  Get in Touch
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
