import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock, MapPin, User, Stethoscope, Building2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const appointmentTypes = [
  { id: "consultation", label: "Medical Consultation", icon: Stethoscope },
  { id: "diagnostic", label: "Diagnostic Testing", icon: Building2 },
];

const doctors = [
  { id: "1", name: "Dr. Sarah Chen", specialty: "Neurologist", avatar: "👩‍⚕️" },
  { id: "2", name: "Dr. Michael Roberts", specialty: "Oncologist", avatar: "👨‍⚕️" },
  { id: "3", name: "Dr. Emily Watson", specialty: "Radiologist", avatar: "👩‍⚕️" },
  { id: "4", name: "Dr. James Miller", specialty: "Pulmonologist", avatar: "👨‍⚕️" },
];

const locations = [
  { id: "1", name: "City Medical Center", address: "123 Healthcare Blvd (Demo)" },
  { id: "2", name: "Regional Hospital", address: "456 Wellness Ave (Demo)" },
  { id: "3", name: "Advanced Diagnostics Center", address: "789 Medical Park (Demo)" },
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

export default function BookAppointment() {
  const { toast } = useToast();
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Appointment Booked Successfully!",
        description: "This is a demo booking. No actual appointment was created.",
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
              <CalendarIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Schedule a Visit</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Book an <span className="text-gradient">Appointment</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule a consultation with our demo medical professionals or book a diagnostic test.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Appointment Type Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Appointment Type</Label>
                <div className="grid sm:grid-cols-2 gap-4">
                  {appointmentTypes.map((type) => (
                    <Card
                      key={type.id}
                      className={cn(
                        "cursor-pointer transition-all duration-300 card-hover",
                        appointmentType === type.id
                          ? "border-primary bg-primary/10 glow"
                          : "hover:border-primary/50"
                      )}
                      onClick={() => setAppointmentType(type.id)}
                    >
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                          appointmentType === type.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/20 text-primary"
                        )}>
                          <type.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{type.label}</h3>
                          <p className="text-sm text-muted-foreground">Select for {type.label.toLowerCase()}</p>
                        </div>
                        {appointmentType === type.id && (
                          <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Patient Information */}
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Patient Information</h2>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" type="number" placeholder="30" className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Textarea 
                        id="reason" 
                        placeholder="Please describe the reason for your visit..."
                        className="bg-background min-h-[100px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time Selection */}
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Select Date & Time</h2>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <Label className="mb-3 block">Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-xl border bg-background p-3"
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-3 block">Available Time Slots</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            className={cn(
                              "text-sm",
                              selectedTime === time && "bg-primary text-primary-foreground"
                            )}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Doctor Selection */}
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Stethoscope className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Select a Doctor</h2>
                    <span className="text-xs text-muted-foreground ml-2">(Demo profiles)</span>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {doctors.map((doctor) => (
                      <Card
                        key={doctor.id}
                        className={cn(
                          "cursor-pointer transition-all duration-300",
                          selectedDoctor === doctor.id
                            ? "border-primary bg-primary/10"
                            : "hover:border-primary/50"
                        )}
                        onClick={() => setSelectedDoctor(doctor.id)}
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                            {doctor.avatar}
                          </div>
                          <div>
                            <h3 className="font-semibold">{doctor.name}</h3>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                          </div>
                          {selectedDoctor === doctor.id && (
                            <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Location Selection */}
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Select Location</h2>
                    <span className="text-xs text-muted-foreground ml-2">(Demo locations)</span>
                  </div>
                  
                  <div className="grid sm:grid-cols-3 gap-4">
                    {locations.map((location) => (
                      <Card
                        key={location.id}
                        className={cn(
                          "cursor-pointer transition-all duration-300",
                          selectedLocation === location.id
                            ? "border-primary bg-primary/10"
                            : "hover:border-primary/50"
                        )}
                        onClick={() => setSelectedLocation(location.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/20 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-semibold text-sm mb-1">{location.name}</h3>
                          <p className="text-xs text-muted-foreground">{location.address}</p>
                          {selectedLocation === location.id && (
                            <CheckCircle className="w-4 h-4 text-primary mx-auto mt-2" />
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-center space-y-4">
                <Button
                  type="submit"
                  size="lg"
                  className="btn-glow bg-gradient-to-r from-primary to-accent text-primary-foreground px-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Book Appointment"}
                </Button>
                
                <p className="text-xs text-muted-foreground">
                  Doctor profiles and locations are for demonstration purposes only.
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
