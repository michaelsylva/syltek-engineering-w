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
  CaretDown
} from '@phosphor-icons/react'

type View = 'home' | 'mechanical-design' | 'automation-robotics' | 'prototype-development' | 'consultation' | 'contact'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState<View>('home')
  const [navServicesOpen, setNavServicesOpen] = useState(false)
  const [heroServicesOpen, setHeroServicesOpen] = useState(false)

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
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Gear className="w-8 h-8 text-primary" weight="fill" />
              <span className="text-xl font-bold text-foreground">Syltek Engineering</span>
            </button>

            <div className="hidden md:flex items-center gap-6">
              <div className="relative"
                onMouseEnter={() => setNavServicesOpen(true)}
                onMouseLeave={() => setNavServicesOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  Services <CaretDown className={`w-4 h-4 transition-transform ${navServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {navServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onMouseEnter={() => setNavServicesOpen(true)}
                    onMouseLeave={() => setNavServicesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    {servicePages.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => navigateToView(service.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:bg-accent/10 hover:text-primary transition-colors"
                      >
                        <div className="text-accent">{service.icon}</div>
                        {service.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Button onClick={() => scrollToSection('contact')} size="sm">
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
                          className="flex items-center gap-3 text-left text-foreground hover:text-primary transition-colors py-2"
                        >
                          <div className="text-accent">{service.icon}</div>
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
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button onClick={() => scrollToSection('contact')} className="w-full">
                    Get in Touch
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Precision Mechanical Engineering
              <br />
              <span className="text-primary">& Automation Design</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Syltek Engineering delivers high-end mechanical design, automation systems, and biomedical
              instrumentation solutions. We specialize in turning complex engineering challenges into
              functional, manufacturable products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="relative"
                onMouseEnter={() => setHeroServicesOpen(true)}
                onMouseLeave={() => setHeroServicesOpen(false)}
              >
                <Button size="lg" className="gap-2">
                  Explore Services <CaretDown className={`w-5 h-5 transition-transform ${heroServicesOpen ? 'rotate-180' : ''}`} />
                </Button>
                {heroServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onMouseEnter={() => setHeroServicesOpen(true)}
                    onMouseLeave={() => setHeroServicesOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    {servicePages.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => navigateToView(service.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:bg-accent/10 hover:text-primary transition-colors"
                      >
                        <div className="text-accent">{service.icon}</div>
                        {service.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}>
                Contact Us
              </Button>
            </div>
            
            <div className="w-full max-w-2xl mx-auto h-64">
              <MechanicalAssembly3D />
            </div>
          </motion.div>
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
                  className="h-full hover:shadow-lg hover:border-accent/50 transition-all duration-300 group cursor-pointer"
                  onClick={() => service.id !== 'home' && navigateToView(service.id)}
                >
                  <CardHeader>
                    <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl flex items-center justify-between">
                      {service.title}
                      {service.id !== 'home' && (
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
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
                  <AccordionItem value={`process-${index}`} className="bg-card border rounded-lg px-6">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4">
                        <div className="text-accent">{process.icon}</div>
                        <span className="text-lg font-medium">{process.title}</span>
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Cube className="w-5 h-5 text-primary" />
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
                        <Badge key={tool} variant="secondary" className="text-sm px-4 py-2">
                          <Lightning className="w-4 h-4 mr-2" />
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="automation" className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      {softwareTools.automation.map((tool) => (
                        <Badge key={tool} variant="secondary" className="text-sm px-4 py-2">
                          <Robot className="w-4 h-4 mr-2" />
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="engineering" className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      {softwareTools.engineering.map((tool) => (
                        <Badge key={tool} variant="secondary" className="text-sm px-4 py-2">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors">
                    <div className="p-3 bg-accent/20 rounded-lg">
                      <Envelope className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <a href="mailto:info@syltekengineering.com" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                        info@syltekengineering.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <a href="tel:+1234567890" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                        Contact for details
                      </a>
                    </div>
                  </div>

                  <Separator />

                  <div className="text-center pt-4">
                    <p className="text-foreground/80 mb-6 leading-relaxed">
                      Whether you need precision mechanical design, automation systems, or prototype development,
                      we're here to help turn your engineering challenges into solutions.
                    </p>
                    <Button size="lg" className="gap-2">
                      <Envelope className="w-5 h-5" />
                      Send an Inquiry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                <li>Mechanical Design</li>
                <li>Automation & Robotics</li>
                <li>Prototype Development</li>
                <li>Consultation Services</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Capabilities</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li>3D CAD & SolidWorks</li>
                <li>CNC Machining</li>
                <li>3D Printing</li>
                <li>Manufacturing Processes</li>
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
