import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Robot, ArrowLeft, CheckCircle, Cpu, GitBranch, Flask } from '@phosphor-icons/react'

interface AutomationRoboticsProps {
  onNavigate: (view: string) => void
}

export function AutomationRobotics({ onNavigate }: AutomationRoboticsProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const capabilities = [
    'Custom pipetting and liquid handling systems',
    'Fluidics design and integration',
    'Planar motor positioning systems',
    'Automated sample handling solutions',
    'Stepper and servo mechanism design',
    'OEM subsystem development',
    'PLC programming (Codesys)',
    'Microcontroller programming (Arduino, C/C++)'
  ]

  const solutions = [
    {
      title: 'Pipetting Systems',
      description: 'High-precision automated pipetting for biomedical and lab applications with microliter accuracy',
      icon: <Flask />
    },
    {
      title: 'Motion Control',
      description: 'Advanced stepper/servo systems with planar motors and multi-axis coordination',
      icon: <Cpu />
    },
    {
      title: 'Sample Handling',
      description: 'Automated tip loading, plate handling, and material transport systems',
      icon: <GitBranch />
    },
    {
      title: 'Custom Automation',
      description: 'Tailored automation solutions for unique laboratory and industrial processes',
      icon: <Robot />
    }
  ]

  const industries = [
    'Biomedical instrumentation',
    'Clinical diagnostics',
    'Research laboratories',
    'Life sciences',
    'Pharmaceutical manufacturing',
    'High-throughput screening'
  ]

  const technologies = [
    'Codesys PLC',
    'Arduino / PlatformIO',
    'MicroPython',
    'C/C++ embedded',
    'Stepper motors',
    'Servo systems',
    'Linear actuators',
    'Planar motors'
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header scrolled={scrolled} onNavigate={onNavigate} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-8 gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Robot className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Automation & Robotics
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Custom automation systems and robotics for biomedical instrumentation and laboratory applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
                  <CardHeader>
                    <div className="text-accent mb-3 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                      {solution.icon}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">{solution.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{solution.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Core Capabilities</CardTitle>
                <CardDescription>
                  Comprehensive automation and robotics expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {capabilities.map((capability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" weight="fill" />
                      <p className="text-sm text-foreground/80">{capability}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Technologies & Tools</CardTitle>
                <CardDescription>
                  Software and hardware platforms we work with
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm px-3 py-1.5 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all duration-200 cursor-default">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Industry Focus</CardTitle>
              <CardDescription>
                Sectors where our automation solutions make an impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {industries.map((industry) => (
                  <Badge key={industry} variant="outline" className="text-sm px-4 py-2">
                    {industry}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Need Custom Automation Solutions?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We specialize in turning complex automation challenges into reliable, efficient systems.
              </p>
              <Button size="lg" onClick={() => onNavigate('contact')} className="gap-2">
                Discuss Your Project
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
