import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, MapPin, Clock, Send, AlertTriangle, HelpCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone Support",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri, 9AM-6PM EST",
  },
  {
    icon: Mail,
    title: "Email Support",
    value: "support@neuromediai.demo",
    description: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Office Address",
    value: "123 AI Healthcare Blvd",
    description: "Demo City, DC 12345",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon-Fri: 9AM-6PM",
    description: "Weekend: Closed",
  },
];

const faqItems = [
  {
    question: "How do I upload medical images for analysis?",
    answer: "Navigate to the Disease Detection page, select the relevant disease category, and use the upload area to drag and drop or browse for your medical images. Supported formats include PNG, JPG, and JPEG.",
  },
  {
    question: "Why is my image upload failing?",
    answer: "Ensure your image is in a supported format (PNG, JPG, JPEG) and under 10MB. If issues persist, try using a different browser or clearing your cache.",
  },
  {
    question: "Are the analysis results medically accurate?",
    answer: "NeuroMediAI provides AI-generated insights for educational and research purposes only. Results should not be used for medical diagnosis. Always consult a qualified healthcare professional.",
  },
  {
    question: "How do I book an appointment?",
    answer: "Visit the Book Appointment page, select your appointment type, fill in your information, choose a date and time, select a doctor and location, then click Book Appointment.",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "This is a demo form. Your message was not actually sent.",
      });
    }, 1500);
  };

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Get In Touch</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact <span className="text-gradient">Us</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about NeuroMediAI? Our support team is here to help you.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card 
                key={info.title}
                className="card-hover glass text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <info.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{info.title}</h3>
                  <p className="text-sm text-primary font-medium mb-1">{info.value}</p>
                  <p className="text-xs text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="glass">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="John Doe" className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="bg-background" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" className="bg-background" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us more about your inquiry..."
                      className="bg-background min-h-[150px]"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full btn-glow bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Technical Support & FAQ */}
            <div className="space-y-8">
              <Card className="glass">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <HelpCircle className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Technical Support</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left hover:text-primary">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Emergency Disclaimer */}
              <Card className={cn(
                "border-2 border-destructive/50 bg-destructive/5 relative overflow-hidden"
              )}>
                <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 to-transparent animate-pulse" />
                <CardContent className="p-6 relative">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-bold text-destructive mb-2">Medical Emergency</h3>
                      <p className="text-sm text-muted-foreground">
                        If you are experiencing a medical emergency, <strong>do not use this platform</strong>. 
                        Contact your local emergency services immediately by calling <strong>911</strong> (US) or your local emergency number.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
