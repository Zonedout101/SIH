"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Shield, MapPin, QrCode, Users, TrendingUp, CheckCircle, Globe } from "lucide-react"
import { motion } from "framer-motion"

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardHover = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="font-serif text-2xl font-bold text-foreground">AyurTrace</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-6 text-sm font-medium">
                Blockchain-Powered Transparency
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 text-balance"
            >
              Authentic Ayurvedic Herbs, <span className="text-primary">Verified Journey</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty"
            >
              From farm to pharmacy, track every step of your Ayurvedic herbs' journey with immutable blockchain
              technology. Ensuring authenticity, sustainability, and trust in traditional medicine.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-lg px-8 py-6">
                  <QrCode className="mr-2 h-5 w-5" />
                  Scan & Verify
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                  <Globe className="mr-2 h-5 w-5" />
                  Explore Platform
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Revolutionary Traceability Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combining ancient wisdom with modern technology for complete supply chain transparency
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} whileHover={cardHover.hover}>
              <Card className="border-border hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <MapPin className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl font-serif">Geo-Tagged Collection</CardTitle>
                  <CardDescription>
                    GPS-enabled tracking from the exact location where herbs are harvested, ensuring authentic
                    provenance
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={cardHover.hover}>
              <Card className="border-border hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <Shield className="h-12 w-12 text-secondary mb-4" />
                  <CardTitle className="text-xl font-serif">Blockchain Security</CardTitle>
                  <CardDescription>
                    Immutable ledger technology prevents tampering and ensures every transaction is permanently recorded
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={cardHover.hover}>
              <Card className="border-border hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <QrCode className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl font-serif">Smart QR Codes</CardTitle>
                  <CardDescription>
                    Scan any product to instantly access its complete journey from farm to your hands
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={cardHover.hover}>
              <Card className="border-border hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <Users className="h-12 w-12 text-secondary mb-4" />
                  <CardTitle className="text-xl font-serif">Community Network</CardTitle>
                  <CardDescription>
                    Connect farmers, processors, and consumers in a transparent ecosystem of trust
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={cardHover.hover}>
              <Card className="border-border hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <CheckCircle className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl font-serif">Quality Assurance</CardTitle>
                  <CardDescription>
                    Automated validation of quality standards and sustainability practices at every step
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={cardHover.hover}>
              <Card className="border-border hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-secondary mb-4" />
                  <CardTitle className="text-xl font-serif">Analytics Dashboard</CardTitle>
                  <CardDescription>
                    Real-time insights into supply chain performance, sustainability metrics, and market trends
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">How AyurTrace Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple, transparent process that ensures authenticity from harvest to consumption
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </motion.div>
              <h3 className="text-xl font-serif font-semibold mb-4">Collection</h3>
              <p className="text-muted-foreground">
                Farmers and collectors use GPS-enabled devices to record harvest location, time, and initial quality
                metrics
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-2xl font-bold text-secondary-foreground">2</span>
              </motion.div>
              <h3 className="text-xl font-serif font-semibold mb-4">Processing</h3>
              <p className="text-muted-foreground">
                Each processing step is recorded on the blockchain, including drying, grinding, and quality testing
                results
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </motion.div>
              <h3 className="text-xl font-serif font-semibold mb-4">Packaging</h3>
              <p className="text-muted-foreground">
                Unique QR codes are generated and attached to each product, linking to its complete blockchain record
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-2xl font-bold text-secondary-foreground">4</span>
              </motion.div>
              <h3 className="text-xl font-serif font-semibold mb-4">Verification</h3>
              <p className="text-muted-foreground">
                Consumers scan QR codes to access complete provenance information and verify authenticity
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Comprehensive Dashboard</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Monitor your supply chain with real-time analytics and insights
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <motion.div variants={fadeInUp} whileHover={cardHover.hover}>
              <Card className="p-6 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="font-serif">Supply Chain Overview</CardTitle>
                  <CardDescription>Track herbs through every stage of processing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Ashwagandha</span>
                      <Badge variant="outline">In Transit</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Turmeric</span>
                      <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Brahmi</span>
                      <Badge variant="secondary">Processing</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={cardHover.hover}>
              <Card className="p-6 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="font-serif">Quality Metrics</CardTitle>
                  <CardDescription>Real-time quality and compliance tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Purity Score</span>
                      <span className="text-sm font-bold text-green-600">98.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Sustainability Rating</span>
                      <span className="text-sm font-bold text-primary">A+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Compliance Status</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-primary text-primary-foreground"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-serif font-bold mb-6"
          >
            Ready to Transform Your Supply Chain?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl mb-8 opacity-90"
          >
            Join the revolution in Ayurvedic herb traceability. Build trust, ensure quality, and promote sustainability.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Start Free Trial
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Schedule Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-card border-t border-border py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="font-serif text-xl font-bold">AyurTrace</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Revolutionizing Ayurvedic herb traceability with blockchain technology for a transparent and sustainable
                future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 AyurTrace. All rights reserved. Built with transparency and trust.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
