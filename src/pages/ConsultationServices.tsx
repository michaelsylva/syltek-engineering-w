import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChartLine, ArrowLeft, CheckCircle, Lightbulb, ClipboardText, Target, Note } from '@phosphor-icons/react'

interface ConsultationServicesProps {
  onNavigate: (view: string) => void
}

export function ConsultationServices({ onNavigate }: ConsultationServicesProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const services = [
    {
      title: 'Design Reviews',
      description: 'Expert evaluation of your mechanical designs for manufacturability, cost optimization, and performance',
      icon: <Note />,
      benefits: ['DFM analysis', 'Cost reduction opportunities', 'Performance optimization', 'Risk identification']
    },
    {
      title: 'Concept Development',
      description: 'Transform your ideas into viable engineering concepts with feasibility analysis and initial design',
      icon: <Lightbulb />,
      benefits: ['Feasibility assessment', 'Concept sketches', 'Technology selection', 'Budget estimation']
    },
    {
      title: 'Product Development',
      description: 'End-to-end support from concept through production, ensuring your product meets market requirements',
      icon: <Target />,
      benefits: ['Requirements definition', 'Design iterations', 'Prototype validation', 'Production transition']
    },
    {
      title: 'Technical Documentation',
      description: 'Comprehensive engineering documentation for manufacturing, assembly, and maintenance',
      icon: <ChartLine />,
      benefits: ['Assembly instructions', 'Maintenance guides', 'Technical specifications', 'Quality procedures']
    }
  ]

  const expertise = [
    'Design for Manufacturing (DFM)',
    'Design for Assembly (DFA)',
    'Cost optimization and value engineering',
    'Material selection and sourcing',
    'Tolerance stack-up analysis',
    'Failure mode analysis',
    'Production scaling strategies',
    'Vendor selection and management'
  ]

  const deliverables = [
    'Technical reports',
    'Design recommendations',
    'CAD models and drawings',
    'Bill of materials',
    'Manufacturing specifications',
    'Cost analysis',
    'Project timelines',
    'Risk assessments'
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
                <ChartLine className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Consultation & Product Development
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Expert guidance from concept to production, ensuring your product is manufacturable, cost-effective, and market-ready
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-accent group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                        {service.icon}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{service.title}</CardTitle>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {service.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 group-hover:text-primary transition-colors duration-300" weight="fill" />
                          <p className="text-sm text-foreground/80">{benefit}</p>
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
                <CardTitle className="text-2xl">Consultation Expertise</CardTitle>
                <CardDescription>
                  Areas where we provide expert guidance and support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expertise.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" weight="fill" />
                      <p className="text-sm text-foreground/80">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-2xl">What You Receive</CardTitle>
                <CardDescription>
                  Comprehensive deliverables for your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {deliverables.map((deliverable) => (
                    <Badge key={deliverable} variant="secondary" className="text-sm px-3 py-1.5 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all duration-200 cursor-default">
                      {deliverable}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Approach</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">1</div>
                  <h4 className="font-semibold text-foreground mb-2">Understand</h4>
                  <p className="text-sm text-muted-foreground">
                    Deep dive into your requirements, constraints, and objectives
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">2</div>
                  <h4 className="font-semibold text-foreground mb-2">Analyze</h4>
                  <p className="text-sm text-muted-foreground">
                    Evaluate options, identify risks, and develop recommendations
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <h4 className="font-semibold text-foreground mb-2">Deliver</h4>
                  <p className="text-sm text-muted-foreground">
                    Provide actionable insights and support through implementation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Need Expert Engineering Guidance?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Let's discuss how we can help optimize your design, reduce costs, and ensure manufacturability.
              </p>
              <Button size="lg" onClick={() => onNavigate('contact')} className="gap-2">
                Schedule a Consultation
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
