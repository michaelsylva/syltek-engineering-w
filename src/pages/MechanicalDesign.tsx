import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cube, ArrowLeft, CheckCircle, Gear, Ruler, Package } from '@phosphor-icons/react'

interface MechanicalDesignProps {
  onNavigate: (view: string) => void
}

export function MechanicalDesign({ onNavigate }: MechanicalDesignProps) {
  const capabilities = [
    'SolidWorks 3D CAD modeling and assemblies',
    'Mechanism design and motion analysis',
    'NEMA motor integration and linear axes',
    'Custom mechanical assemblies',
    'Design for manufacturability (DFM)',
    'GD&T and tolerance analysis',
    'Parametric modeling for design variations',
    'Interference detection and clearance analysis'
  ]

  const deliverables = [
    { title: '3D CAD Models', description: 'High-fidelity SolidWorks parts and assemblies', icon: <Cube /> },
    { title: 'Engineering Drawings', description: 'Fully dimensioned manufacturing drawings with GD&T', icon: <Ruler /> },
    { title: 'Bills of Materials', description: 'Detailed BOMs with part specifications and sourcing info', icon: <Package /> },
    { title: 'Motion Studies', description: 'Assembly motion validation and mechanism verification', icon: <Gear /> }
  ]

  const applications = [
    'Biomedical instrumentation',
    'Laboratory automation systems',
    'Precision positioning equipment',
    'Material handling mechanisms',
    'Custom test fixtures and tooling',
    'OEM subsystem development'
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
                <Cube className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Mechanical Engineering & Design
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Precision 3D CAD modeling, mechanism design, and custom assemblies tailored to your exact specifications
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-2xl">What We Deliver</CardTitle>
                <CardDescription>
                  Complete mechanical design solutions from concept to manufacturing-ready documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deliverables.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-accent mt-1">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-2xl">Core Capabilities</CardTitle>
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
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Typical Applications</CardTitle>
              <CardDescription>
                Industries and use cases where our mechanical design expertise delivers value
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {applications.map((app) => (
                  <Badge key={app} variant="secondary" className="text-sm px-4 py-2">
                    {app}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Start Your Design Project?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Let's discuss your mechanical engineering needs and create a solution that meets your exact requirements.
              </p>
              <Button size="lg" onClick={() => onNavigate('contact')} className="gap-2">
                Get in Touch
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
