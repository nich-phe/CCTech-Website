import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  interest: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Please provide a bit more detail"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", data);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <Layout>
      <section className="pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Col: Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Let's discuss your operational challenges.
              </h1>
              <p className="text-lg text-muted-foreground mb-12 max-w-md">
                Whether you want to book a demo of our existing platforms or discuss a partnership for a custom implementation, our team is ready to talk.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Email</h4>
                    <p className="text-muted-foreground">hello@ctech.example.com</p>
                    <p className="text-muted-foreground">partnerships@ctech.example.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Office</h4>
                    <p className="text-muted-foreground">100 Innovation Drive, Suite 400<br/>San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Col: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-card border border-border rounded-3xl p-8 shadow-xl shadow-black/5">
                {isSuccess ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-4">Message Received</h3>
                    <p className="text-muted-foreground mb-8">
                      Thank you for reaching out. One of our solution architects will get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Full Name</label>
                        <input 
                          {...register("name")}
                          className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Jane Doe"
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Company</label>
                        <input 
                          {...register("company")}
                          className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Acme Corp"
                        />
                        {errors.company && <p className="text-sm text-destructive">{errors.company.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Work Email</label>
                      <input 
                        {...register("email")}
                        type="email"
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="jane@acmecorp.com"
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Area of Interest</label>
                      <select 
                        {...register("interest")}
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground"
                      >
                        <option value="">Select an option...</option>
                        <option value="admin">CareCliQ</option>
                        <option value="custom">Custom Platform Development</option>
                        <option value="partner">Partnership Inquiry</option>
                      </select>
                      {errors.interest && <p className="text-sm text-destructive">{errors.interest.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">How can we help?</label>
                      <textarea 
                        {...register("message")}
                        rows={4}
                        className="w-full p-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                        placeholder="Tell us a bit about your current workflows and challenges..."
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                    </div>

                    <Button type="submit" size="lg" className="w-full h-12 text-base" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Submit Request"}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
