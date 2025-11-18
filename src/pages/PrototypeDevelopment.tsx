import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Printer, ArrowLeft, CheckCircle, Wrench, Package, Cpu } from '@phosphor-icons/react'

interface PrototypeDevelopmentProps {
  onNavigate: (view: string) => void
}

export function PrototypeDevelopment({ onNavigate }: PrototypeDevelopmentProps) {
  const processes = [
    {
      title: '3D Printing',
      description: 'FDM, SLA, and SLS technologies for rapid functional prototypes, fixtures, and housings',
      icon: <Printer weight="fill" />,
      capabilities: ['Functional prototypes', 'Test fixtures', 'Housings and enclosures', 'Concept validation']
    },
    {
      title: 'CNC Machining',
      description: 'High-precision milling and turning for tight-tolerance metal and plastic components',
      icon: <Wrench />,
      capabilities: ['Aluminum parts', 'Steel components', 'Plastic machining', 'Tight tolerances (±0.001")']
    },
    {
      title: 'Sheet Metal',
      description: 'Laser cutting, bending, and forming for enclosures, brackets, and chassis',
      icon: <Package />,
      capabilities: ['Enclosures', 'Brackets and mounts', 'Chassis frames', 'Custom panels']
    },
    {
      title: 'Assembly & Testing',
      description: 'Complete assembly services with functional testing and quality verification',
      icon: <Cpu />,
      capabilities: ['Full assembly', 'Functional testing', 'Quality inspection', 'Documentation']
    }
  ]

  const materials = [
    'Aluminum (6061, 7075)',
    'Stainless steel',
    'Mild steel',
    'ABS plastic',
    'Polycarbonate',
    'PEEK',
    'PLA / PETG',
    'Resin (engineering grade)'
  ]

  const advantages = [
    'Rapid turnaround times',
    'Small-batch manufacturing',
    'Design iteration support',
    'Cost-effective prototyping',
    'In-house quality control',
    'Direct engineer collaboration',
    'DFM feedback and optimization',
    'Path to production scaling'
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-8 gap-2"
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
              <div className="p-3 bg-primary/10 rounded-lg">
                <Printer className="w-8 h-8 text-primary" weight="fill" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Prototype Development & Build
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Rapid prototyping, precision manufacturing, and small-batch production to bring your designs to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {processes.map((process, index) => (
              <motion.div
                key={process.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg hover:border-accent/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-accent">
                        {process.icon}
                      </div>
                      <CardTitle className="text-xl">{process.title}</CardTitle>
                    </div>
                    <CardDescription>{process.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {process.capabilities.map((cap) => (
                        <div key={cap} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" weight="fill" />
                          <p className="text-sm text-foreground/80">{cap}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Materials We Work With</CardTitle>
                <CardDescription>
                  Wide range of materials for diverse application requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {materials.map((material) => (
                    <Badge key={material} variant="secondary" className="text-sm px-3 py-1.5">
                      {material}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-2xl">Why Choose Us</CardTitle>
                <CardDescription>
                  Advantages of working with Syltek for prototyping
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {advantages.map((advantage, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" weight="fill" />
                      <p className="text-sm text-foreground/80">{advantage}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Build Your Prototype?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                From concept to physical prototype, we'll help you validate your design and prepare for production.
              </p>
              <Button size="lg" onClick={() => onNavigate('contact')} className="gap-2">
                Start Your Project
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
