import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, CalendarDays, CreditCard, Bell, XCircle, CheckCircle, ArrowRight, Menu } from "lucide-react"
import { InfiniteSlider } from "@/components/ui/infinite-slider"

export default function FurSureLandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
        <div className="bg-white rounded-full shadow-xl border border-gray-100 px-6 py-3 flex items-center justify-between">
          <Link href="#" className="flex items-center justify-center" prefetch={false}>
            <Heart className="h-6 w-6 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">FurSure</span>
          </Link>
          <nav className="hidden lg:flex gap-6 items-center">
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary-600 transition-colors text-gray-600"
              prefetch={false}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-primary-600 transition-colors text-gray-600"
              prefetch={false}
            >
              FAQs
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary-600 transition-colors text-gray-600"
              prefetch={false}
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-sm bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-full px-4 py-2 font-medium border border-primary-200"
            >
              Sign In
            </Button>
            <Button className="text-sm bg-primary-600 text-white hover:bg-primary-700 rounded-full px-4 py-2 font-medium shadow-lg">
              Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>

      {/* Add padding to main content to account for fixed header */}
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-primary-50/30">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 mb-4">
                ✨ The Future of Pet Grooming Management
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-gray-900 font-serif md:text-7xl">
                Stop Juggling, Start Grooming.
              </h1>
              <p className="text-lg text-gray-600 md:text-xl max-w-2xl mx-auto">
                FurSure is the all-in-one platform for pet groomers. Simplify bookings, manage payments, and automate
                reminders, so you can focus on what you love – making pets look their best!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="text-white hover:bg-primary-700 bg-primary-600 shadow-xl px-8 py-3">
                  Get a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-200 text-primary-700 hover:bg-primary-50 px-8 py-3 bg-transparent"
                >
                  Watch Video
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">No credit card required. 14-day free trial.</p>
            </div>
            <div className="mt-12 md:mt-16">
              <Image
                src="/images/hero-dashboard.png"
                alt="FurSure Dashboard Mockup"
                width={1000}
                height={600}
                className="mx-auto rounded-xl shadow-2xl border border-gray-200"
              />
            </div>
          </div>
        </section>

        {/* Trusted by Pet Groomers Section */}
        <section className="w-full py-12 bg-white border-b border-gray-100">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Trusted by pet care professionals everywhere
              </p>
            </div>
            <InfiniteSlider gap={48} reverse className="w-full">
              <div className="flex items-center justify-center h-20 px-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <Image
                  src="/images/logo1.png"
                  alt="Pet Care Service"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center h-20 px-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <Image
                  src="/images/logo2.png"
                  alt="Certified Pet Care"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center h-20 px-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <Image
                  src="/images/logo3.png"
                  alt="Pet Boarding Service"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center h-20 px-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <Image
                  src="/images/logo4.png"
                  alt="Veterinary Services"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center h-20 px-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <Image
                  src="/images/logo5.png"
                  alt="Pet Health Services"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center h-20 px-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <Image
                  src="/images/logo6.png"
                  alt="Pet Medical Care"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center h-20 px-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <Image
                  src="/images/logo7.png"
                  alt="Pet Care Facility"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </InfiniteSlider>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                Tired of the Admin Hassle?
              </h2>
              <p className="mt-4 text-gray-600">
                Manual bookings, missed appointments, and payment chasing can be a nightmare. FurSure streamlines your
                operations.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <XCircle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Scattered Bookings</h3>
                <p className="text-gray-600">
                  Juggling calls, texts, and DMs for appointments? It's chaotic and error-prone.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <XCircle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Payment Chasing</h3>
                <p className="text-gray-600">Awkward conversations and delays in getting paid for your hard work.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <XCircle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">No-Shows & Reminders</h3>
                <p className="text-gray-600">
                  Losing income due to no-shows? Manually sending reminders takes too much time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                Meet FurSure: Your Grooming Business, Simplified.
              </h2>
              <p className="mt-4 text-gray-600">
                We provide intuitive tools to manage every aspect of your pet grooming business, effortlessly.
              </p>
            </div>
            <div className="grid gap-12 md:gap-16">
              {/* Feature 1 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <Image
                  src="/images/online-booking-system.png"
                  alt="Online Booking System"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg mx-auto border border-gray-200"
                />
                <div>
                  <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 mb-2">
                    <CalendarDays className="inline-block h-4 w-4 mr-1" /> Easy Online Bookings
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Fill Your Calendar, Stress-Free</h3>
                  <p className="text-gray-600 mb-4">
                    Allow clients to book appointments 24/7 through your personalized booking page. Set your
                    availability, services, and prices with ease. Say goodbye to phone tag!
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Customizable service list & pricing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Real-time availability updates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Client self-scheduling
                    </li>
                  </ul>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:order-last">
                  <Image
                    src="/images/secure-payments.png"
                    alt="Secure Payments"
                    width={500}
                    height={400}
                    className="rounded-xl shadow-lg mx-auto border border-gray-200"
                  />
                </div>
                <div>
                  <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 mb-2">
                    <CreditCard className="inline-block h-4 w-4 mr-1" /> Seamless Payments
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Get Paid Faster, Easier</h3>
                  <p className="text-gray-600 mb-4">
                    Integrate secure online payments. Accept deposits or full payments at the time of booking. Reduce
                    no-shows and simplify your accounting.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Secure online payment processing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Option for deposits or full payments
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Automated invoicing
                    </li>
                  </ul>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <Image
                  src="/images/automated-reminders.png"
                  alt="Automated Reminders"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg mx-auto border border-gray-200"
                />
                <div>
                  <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 mb-2">
                    <Bell className="inline-block h-4 w-4 mr-1" /> Automated Reminders
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Reduce No-Shows Effortlessly</h3>
                  <p className="text-gray-600 mb-4">
                    Send automated SMS and email reminders to your clients before their appointments. Keep your schedule
                    full and your clients happy.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Customizable reminder messages
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> SMS and Email notifications
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Reduce forgotten appointments
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-gray-600">
                Choose the plan that's right for your grooming business. No hidden fees, ever.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <Card className="shadow-lg border border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900">Starter Paw</CardTitle>
                  <CardDescription className="text-gray-600">
                    Perfect for solo groomers getting started.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-extrabold text-gray-900">
                    $29 <span className="text-xl font-normal text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Up to 50 appointments/month
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Online Booking Page
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Automated Email Reminders
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Basic Client Management
                    </li>
                  </ul>
                  <Button className="w-full bg-primary-600 text-white hover:bg-primary-700 shadow-lg">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-2 border-primary-300 relative bg-gradient-to-br from-primary-50 to-white">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg">
                  Most Popular
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900">Pro Groomer</CardTitle>
                  <CardDescription className="text-gray-600">For growing businesses and teams.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-extrabold text-gray-900">
                    $59 <span className="text-xl font-normal text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Unlimited appointments
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Online Booking Page & Payments
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Automated SMS & Email Reminders
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Advanced Client Management
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Staff Accounts
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" /> Priority Support
                    </li>
                  </ul>
                  <Button className="w-full bg-primary-600 text-white hover:bg-primary-700 shadow-lg">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-xl"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-primary-300 rounded-full blur-lg"></div>
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-12 h-12 bg-primary-200 rounded-full blur-lg"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary-400 rounded-full blur-3xl"></div>
          </div>

          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="container px-4 md:px-6 text-center relative z-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Simplify Your Grooming Business?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-primary-100">
              Join hundreds of groomers who trust FurSure to manage their day-to-day. Get started in minutes.
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 shadow-xl">
                Sign Up for Your Free Trial Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-gray-900">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-primary-600">
                  What is FurSure?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  FurSure is a subscription management platform designed specifically for pet groomers. It helps you
                  manage online bookings, accept payments, send automated reminders, and organize client information,
                  all in one place.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-primary-600">
                  Is there a free trial?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes! We offer a 14-day free trial on all our plans. No credit card is required to get started. You can
                  explore all the features and see if FurSure is the right fit for your business.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-primary-600">
                  Can I accept payments through FurSure?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Our Pro Groomer plan allows you to integrate with popular payment gateways to securely accept online
                  payments for bookings, either as deposits or full payments.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-primary-600">
                  What kind of reminders can I send?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  FurSure allows you to send automated appointment reminders via SMS and email. You can customize the
                  message content and timing to best suit your clients.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-primary-600">
                  Can I use FurSure if I have multiple staff members?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes, our Pro Groomer plan supports multiple staff accounts. Each staff member can have their own login
                  and manage their schedule within the platform.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="footerGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#footerGrid)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-16 h-16 bg-primary-400 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-10 w-12 h-12 bg-primary-300 rounded-full blur-lg"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-2xl font-bold">FurSure</span>
              </div>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                The all-in-one platform for pet groomers. Simplify your business operations and focus on what you love
                most.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Mobile App
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-gray-300 hover:text-primary-400 transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-gray-700 pt-8 mb-8">
            <div className="max-w-md">
              <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300 text-sm mb-4">Get the latest tips and updates for your grooming business.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 text-sm"
                />
                <Button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 text-sm">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} FurSure Inc. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
