import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MechanicalAssembly3D } from './components/MechanicalAssembly3D'
import { MechanicalDesign } from './pages/MechanicalDesign'
import { AutomationRobotics } from './pages/AutomationRobotics'
import { PrototypeDevelopment } from './pages/PrototypeDevelopment'
import { ConsultationServices } from './pages/ConsultationServices'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet'
import { Separator } from './components/ui/separator'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import { toast } from 'sonner'
import {
  Cube,
  Gear,
  Robot,
  Flask,
  Printer,
  Wrench,
  ChartLine,
  Lightning,
  Phone,
  Envelope,
  List,
  ArrowRight,
  CheckCircle,
  GitBranch,
  Cpu,
  Package,
  CaretDown,
  PaperPlaneRight
} from '@phosphor-icons/react'

type View = 'home' | 'mechanical-design' | 'automation-robotics' | 'prototype-development' | 'consultation' | 'contact'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState<View>('home')
  const [navServicesOpen, setNavServicesOpen] = useState(false)
  const [heroServicesOpen, setHeroServicesOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setCurrentView('home')
    setMobileMenuOpen(false)
    setNavServicesOpen(false)
    setHeroServicesOpen(false)
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const navigateToView = (view: View) => {
    setCurrentView(view)
    setMobileMenuOpen(false)
    setNavServicesOpen(false)
    setHeroServicesOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        toast.error('Failed to send message. Please try emailing us directly.')
      }
    } catch (error) {
      toast.error('Failed to send message. Please try emailing us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const servicePages = [
    { id: 'mechanical-design' as View, label: 'Mechanical Design', icon: <Cube className="w-4 h-4" /> },
    { id: 'automation-robotics' as View, label: 'Automation & Robotics', icon: <Robot className="w-4 h-4" /> },
    { id: 'prototype-development' as View, label: 'Prototype Development', icon: <Printer className="w-4 h-4" weight="fill" /> },
    { id: 'consultation' as View, label: 'Consultation', icon: <ChartLine className="w-4 h-4" /> }
  ]

  const services = [
    {
      icon: <Cube className="w-8 h-8" />,
      title: 'Mechanical Engineering & Design',
      description: 'Precision 3D CAD (SolidWorks), mechanism design, motion systems, NEMA motor linear axes, custom assemblies',
      id: 'mechanical-design' as View
    },
    {
      icon: <Robot className="w-8 h-8" />,
      title: 'Automation & Robotics',
      description: 'Custom pipetting systems, fluidics, planar motors, sample handling, OEM subsystem development for biomedical and lab instruments',
      id: 'automation-robotics' as View
    },
    {
      icon: <Printer className="w-8 h-8" weight="fill" />,
      title: 'Prototype Development & Build',
      description: 'Rapid prototyping, 3D printing, CNC machining, assembly, testing, and small-batch manufacturing',
      id: 'prototype-development' as View
    },
    {
      icon: <ChartLine className="w-8 h-8" />,
      title: 'Consultation & Product Development',
      description: 'Concept-to-production support, design reviews, technical documentation, cost-down redesigns',
      id: 'consultation' as View
    },
    {
      icon: <Flask className="w-8 h-8" />,
      title: 'Specialized Lab Devices',
      description: 'Precision linear actuators, syringe pumps, tip-loading stations, truss plates, motion platforms',
      id: 'home' as View
    },
    {
      icon: <Gear className="w-8 h-8" />,
      title: 'Custom Mechanisms',
      description: 'Stepper/servo mechanisms, material handling systems, and specialized automation solutions',
      id: 'home' as View
    }
  ]

  const processes = [
    {
      title: '3D Printing',
      icon: <Printer className="w-6 h-6" weight="fill" />,
      description: 'Rapid prototyping of functional components using FDM, SLA, and SLS technologies. Ideal for concept validation, fixtures, and housings.'
    },
    {
      title: 'CNC Machining',
      icon: <Wrench className="w-6 h-6" />,
      description: 'High-precision milling & turning of metals and plastics. Tight-tolerance components for automation and instrumentation. Supports prototype and small-batch production.'
    },
    {
      title: 'Sheet Metal Fabrication',
      icon: <Package className="w-6 h-6" />,
      description: 'Laser cutting, bending, punching, and forming. Enclosures, brackets, chassis, and mechanical frames.'
    },
    {
      title: 'Casting',
      icon: <Cpu className="w-6 h-6" />,
      description: 'Metal casting for complex, high-strength parts. Aluminum, steel, and specialty alloys. Great for durable industrial components.'
    },
    {
      title: 'Injection Molding',
      icon: <GitBranch className="w-6 h-6" />,
      description: 'High-volume plastic part production. Tight repeatability and low per-piece cost. Suitable for commercial medical device housings and precision components.'
    },
    {
      title: 'Rubber Molding',
      icon: <CheckCircle className="w-6 h-6" />,
      description: 'Flexible, durable components including seals, bellows, and grommets. Various elastomers such as silicone, EPDM, and neoprene.'
    },
    {
      title: 'Compression Molding',
      icon: <Gear className="w-6 h-6" />,
      description: 'High-strength thermoset and composite parts. Ideal for structural, heat-resistant, or chemical-resistant components.'
    }
  ]

  const cadServices = [
    {
      title: 'SolidWorks 3D Modeling',
      description: 'Precision 3D CAD design for mechanical, biomedical, and automation components. High-accuracy part creation optimized for manufacturability.'
    },
    {
      title: 'Assemblies',
      description: 'Complete multi-component assembly modeling. Motion studies, interference checks, and mechanism validation. Parametric automation for scalable designs.'
    },
    {
      title: 'Manufacturing Drawings',
      description: 'Fully dimensioned engineering drawings. GD&T, fit tolerances, exploded views. Revision-controlled documentation for production machining.'
    },
    {
      title: 'Bills of Materials',
      description: 'Structured part lists for assemblies and sub-assemblies. Material specifications, quantities, vendor references. BOMs formatted for CNC shops, 3D printing, and procurement workflows.'
    }
  ]

  const softwareTools = {
    programming: ['Python', 'C/C++', 'C#', 'JavaScript', 'Node.js'],
    automation: ['Codesys', 'Arduino / PlatformIO', 'MicroPython'],
    engineering: ['SolidWorks', 'SolidWorks Motion']
  }

  const expertise = [
    'SolidWorks 3D modeling, assemblies, and motion studies',
    'Prototype design & build: CNC Machining, 3D printing, fabrication',
    'Automation & robotics for biomedical instrumentation',
    'Stepper/servo mechanisms, linear actuators, and precision motion',
    'Material handling systems and custom mechanisms'
  ]

  const navItems = [
    { label: 'Home', id: 'home', action: () => navigateToView('home') },
    { label: 'Capabilities', id: 'capabilities', action: () => scrollToSection('capabilities') },
    { label: 'Expertise', id: 'expertise', action: () => scrollToSection('expertise') },
    { label: 'Contact', id: 'contact', action: () => scrollToSection('contact') }
  ]

  if (currentView === 'mechanical-design') {
    return <MechanicalDesign onNavigate={navigateToView} />
  }

  if (currentView === 'automation-robotics') {
    return <AutomationRobotics onNavigate={navigateToView} />
  }

  if (currentView === 'prototype-development') {
    return <PrototypeDevelopment onNavigate={navigateToView} />
  }

  if (currentView === 'consultation') {
    return <ConsultationServices onNavigate={navigateToView} />
  }

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => navigateToView('home')}
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
                          onClick={() => navigateToView(service.id)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                        >
                          <div className="text-accent hover:scale-110 transition-transform duration-200">{service.icon}</div>
                          {service.label}
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
              <Button onClick={() => scrollToSection('contact')} size="sm" className="hover:shadow-lg transition-shadow duration-200">
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
                          onClick={() => navigateToView(service.id)}
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
                  <Button onClick={() => scrollToSection('contact')} className="w-full hover:shadow-lg transition-shadow duration-200">
                    Get in Touch
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh pt-20">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Precision Mechanical Engineering
              <br />
              <span className="text-primary">& Automation Design</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 mb-8 leading-relaxed">
              Syltek Engineering delivers high-end mechanical design, automation systems, and biomedical
              instrumentation solutions. We specialize in turning complex engineering challenges into
              functional, manufacturable products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div 
                className="relative"
                onMouseEnter={() => setHeroServicesOpen(true)}
                onMouseLeave={() => setHeroServicesOpen(false)}
              >
                <Button 
                  size="lg" 
                  className="gap-2 hover:shadow-lg transition-shadow duration-200"
                >
                  Explore Services <CaretDown className={`w-5 h-5 transition-transform duration-200 ${heroServicesOpen ? 'rotate-180' : ''}`} />
                </Button>
                {heroServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 pt-2 z-50"
                  >
                    <div className="w-64 bg-background border border-border rounded-lg shadow-lg overflow-hidden">
                      {servicePages.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => navigateToView(service.id)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                        >
                          <div className="text-accent hover:scale-110 transition-transform duration-200">{service.icon}</div>
                          {service.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')} className="hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-200">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive mechanical engineering and automation solutions for complex technical challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className="h-full hover:shadow-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group cursor-pointer"
                  onClick={() => service.id !== 'home' && navigateToView(service.id)}
                >
                  <CardHeader>
                    <div className="text-accent mb-4 group-hover:scale-110 group-hover:text-primary transition-all duration-300">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl flex items-center justify-between group-hover:text-primary transition-colors duration-300">
                      {service.title}
                      {service.id !== 'home' && (
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Process & Tool Knowledge</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced manufacturing capabilities and comprehensive software expertise
            </p>
          </motion.div>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Manufacturing Processes</h3>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {processes.map((process, index) => (
                <motion.div
                  key={process.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <AccordionItem value={`process-${index}`} className="bg-card border rounded-lg px-6 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200">
                    <AccordionTrigger className="hover:no-underline py-4 group">
                      <div className="flex items-center gap-4">
                        <div className="text-accent group-hover:text-primary group-hover:scale-110 transition-all duration-200">{process.icon}</div>
                        <span className="text-lg font-medium group-hover:text-primary transition-colors duration-200">{process.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {process.description}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-6">SolidWorks 3D Modeling & Documentation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cadServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors duration-200">
                        <Cube className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">Automation Software Tools</h3>
            <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue="programming" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="programming">Programming</TabsTrigger>
                    <TabsTrigger value="automation">Automation</TabsTrigger>
                    <TabsTrigger value="engineering">Engineering</TabsTrigger>
                  </TabsList>
                  <TabsContent value="programming" className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      {softwareTools.programming.map((tool) => (
                        <Badge key={tool} variant="secondary" className="text-sm px-4 py-2 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all duration-200 cursor-default">
                          <Lightning className="w-4 h-4 mr-2" />
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="automation" className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      {softwareTools.automation.map((tool) => (
                        <Badge key={tool} variant="secondary" className="text-sm px-4 py-2 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all duration-200 cursor-default">
                          <Robot className="w-4 h-4 mr-2" />
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="engineering" className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      {softwareTools.engineering.map((tool) => (
                        <Badge key={tool} variant="secondary" className="text-sm px-4 py-2 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all duration-200 cursor-default">
                          <Cube className="w-4 h-4 mr-2" />
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="expertise" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Meet Our Team</h2>
              <h3 className="text-2xl font-semibold text-primary mb-4">Frank Sylva</h3>
              <p className="text-lg text-muted-foreground mb-6">Lead Mechanical Design Engineer</p>
              
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-foreground mb-4">Expertise</h4>
                <div className="space-y-3">
                  {expertise.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" weight="fill" />
                      <p className="text-foreground/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-lg font-medium text-foreground mb-2">Experience</p>
                  <p className="text-3xl font-bold text-primary mb-2">30+ Years</p>
                  <p className="text-muted-foreground">
                    Hands-on engineering in lab automation, robotics, and precision mechanical design
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <Cube className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">3D CAD Modeling</p>
                        <p className="text-sm text-muted-foreground">SolidWorks Expert</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-accent/20 rounded-lg">
                        <Robot className="w-8 h-8 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Automation Systems</p>
                        <p className="text-sm text-muted-foreground">Biomedical & Lab Instruments</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-secondary/20 rounded-lg">
                        <Wrench className="w-8 h-8 text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Precision Manufacturing</p>
                        <p className="text-sm text-muted-foreground">CNC, 3D Printing, Fabrication</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">
              Ready to discuss your next engineering project? Let's connect.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                        placeholder="Your Company Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        placeholder="Tell us about your project..."
                        rows={5}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full gap-2 hover:shadow-lg transition-shadow duration-200"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <PaperPlaneRight className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Prefer to reach out directly? Here's how to contact us.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a 
                    href="mailto:info@syltekengineering.com"
                    className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all duration-200 group"
                  >
                    <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/40 group-hover:scale-110 transition-all duration-200">
                      <Envelope className="w-6 h-6 text-accent group-hover:text-primary transition-colors duration-200" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 group-hover:text-primary/70 transition-colors duration-200">Email</p>
                      <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                        info@syltekengineering.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-transparent">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="text-lg font-medium text-foreground">
                        Contact for details
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/5 to-primary/5">
                <CardContent className="pt-6">
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    Whether you need precision mechanical design, automation systems, or prototype development,
                    we're here to help turn your engineering challenges into solutions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle className="w-3 h-3" weight="fill" />
                      30+ Years Experience
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle className="w-3 h-3" weight="fill" />
                      Custom Solutions
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle className="w-3 h-3" weight="fill" />
                      Fast Turnaround
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full h-[500px]"
          >
            <MechanicalAssembly3D />
          </motion.div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Gear className="w-6 h-6" weight="fill" />
                <span className="text-lg font-bold">Syltek Engineering</span>
              </div>
              <p className="text-secondary-foreground/80 text-sm">
                Precision Mechanical Engineering & Automation Design
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li>
                  <button 
                    onClick={() => navigateToView('mechanical-design')}
                    className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Mechanical Design
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToView('automation-robotics')}
                    className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Automation & Robotics
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToView('prototype-development')}
                    className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Prototype Development
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToView('consultation')}
                    className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Consultation Services
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Capabilities</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li>
                  <button 
                    onClick={() => scrollToSection('capabilities')}
                    className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    3D CAD & SolidWorks
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('capabilities')}
                    className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    CNC Machining
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('capabilities')}
                    className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    3D Printing
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('capabilities')}
                    className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Manufacturing Processes
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-secondary-foreground/20" />

          <div className="text-center text-sm text-secondary-foreground/60">
            <p>&copy; {new Date().getFullYear()} Syltek Engineering, LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
