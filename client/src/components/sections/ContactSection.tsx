import { useState } from 'react';
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import ContactInfo from "@/components/molecules/ContactInfo";
import SocialIcon from "@/components/atoms/SocialIcon";
import { z } from 'zod';
import { trackEvent } from "@/lib/analytics";

// Form validation schema
const contactSchema = z.object({
  nombre: z.string().min(3, "Por favor ingrese su nombre completo"),
  email: z.string().email("Por favor ingrese un correo electrónico válido"),
  telefono: z.string().min(6, "Por favor ingrese un número de teléfono válido"),
  mensaje: z.string().min(10, "Por favor ingrese un mensaje de al menos 10 caracteres"),
  privacidad: z.literal(true, {
    errorMap: () => ({ message: "Debe aceptar la política de privacidad" }),
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const [formState, setFormState] = useState<ContactFormValues>({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    privacidad: false
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { ref: headingRef, inView: headingInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { ref: formRef, inView: formInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { ref: infoRef, inView: infoInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const handleSocialClick = (platform: string) => {
    trackEvent("User Interaction", "trackSocialClick", platform);
  };
  
  const validateField = (name: keyof ContactFormValues, value: any) => {
    try {
      // Create a partial schema just for this field
      const fieldSchema = z.object({ [name]: contactSchema.shape[name] });
      fieldSchema.parse({ [name]: value });
      setErrors(prev => ({ ...prev, [name]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(e => e.path[0] === name);
        if (fieldError) {
          setErrors(prev => ({ ...prev, [name]: fieldError.message }));
        }
      }
      return false;
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    if (e.target.type !== 'checkbox') {
      validateField(name as keyof ContactFormValues, value);
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState(prev => ({ ...prev, [name]: checked }));
    validateField(name as keyof ContactFormValues, checked);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof ContactFormValues, value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission attempt
    trackEvent("User Interaction", "trackFormSubmission", "Contact Form");
    
    try {
      // Validate all fields
      contactSchema.parse(formState);
      
      // If validation passes, submit the form
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSubmitSuccess(true);
      setFormState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
        privacidad: false
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
      
      // Track successful submission
      trackEvent("User Interaction", "formSubmissionSuccess", "Contact Form");
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
        error.errors.forEach(err => {
          const fieldName = err.path[0] as keyof ContactFormValues;
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
        
        // Track validation failure
        trackEvent("User Interaction", "formValidationError", "Contact Form");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contacto" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className={`text-center mb-12 md:mb-16 fade-in ${headingInView ? 'visible' : ''}`}>
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">Contáctenos</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto text-lg">Estamos aquí para responder sus consultas y proporcionar la información que necesita.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div ref={formRef} className={`fade-in ${formInView ? 'visible' : ''}`}>
            <form id="contactForm" className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="nombre" className="block text-neutral-700 font-medium mb-2">Nombre completo</label>
                <input 
                  type="text" 
                  id="nombre" 
                  name="nombre" 
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.nombre ? 'border-destructive' : 'border-neutral-300'
                  }`}
                  placeholder="Ej. Juan Pérez"
                  required
                  minLength={3}
                  value={formState.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.nombre}
                  aria-describedby={errors.nombre ? "nombre-error" : undefined}
                />
                {errors.nombre && (
                  <p id="nombre-error" className="text-destructive text-xs mt-1">{errors.nombre}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-neutral-700 font-medium mb-2">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.email ? 'border-destructive' : 'border-neutral-300'
                  }`}
                  placeholder="Ej. juan@ejemplo.com"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-destructive text-xs mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="telefono" className="block text-neutral-700 font-medium mb-2">Teléfono</label>
                <input 
                  type="tel" 
                  id="telefono" 
                  name="telefono" 
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.telefono ? 'border-destructive' : 'border-neutral-300'
                  }`}
                  placeholder="Ej. +54 9 XXX XX-XXXX"
                  required
                  value={formState.telefono}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.telefono}
                  aria-describedby={errors.telefono ? "telefono-error" : undefined}
                />
                {errors.telefono && (
                  <p id="telefono-error" className="text-destructive text-xs mt-1">{errors.telefono}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="mensaje" className="block text-neutral-700 font-medium mb-2">Mensaje</label>
                <textarea 
                  id="mensaje" 
                  name="mensaje" 
                  rows={4} 
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.mensaje ? 'border-destructive' : 'border-neutral-300'
                  }`}
                  placeholder="Escriba su consulta aquí..."
                  required
                  minLength={10}
                  value={formState.mensaje}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.mensaje}
                  aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
                ></textarea>
                {errors.mensaje && (
                  <p id="mensaje-error" className="text-destructive text-xs mt-1">{errors.mensaje}</p>
                )}
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="privacidad" 
                  name="privacidad" 
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded" 
                  required
                  checked={formState.privacidad}
                  onChange={handleCheckboxChange}
                  aria-invalid={!!errors.privacidad}
                  aria-describedby={errors.privacidad ? "privacidad-error" : undefined}
                />
                <label htmlFor="privacidad" className="ml-2 block text-sm text-neutral-600">
                  Acepto la <a href="#" className="text-primary hover:underline">política de privacidad</a> y el tratamiento de mis datos personales.
                </label>
              </div>
              {errors.privacidad && (
                <p id="privacidad-error" className="text-destructive text-xs mt-1">{errors.privacidad}</p>
              )}
              
              <div>
                <button 
                  type="submit" 
                  className="w-full bg-accent text-white py-3 px-6 rounded-lg font-heading font-semibold text-lg hover:bg-accent-dark transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </div>
              
              {submitSuccess && (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mt-4">
                  Su mensaje ha sido enviado con éxito. Nos pondremos en contacto a la brevedad.
                </div>
              )}
            </form>
          </div>
          
          <div ref={infoRef} className={`fade-in ${infoInView ? 'visible' : ''}`}>
            <div className="bg-neutral-50 rounded-xl p-8 h-full">
              <h3 className="font-heading font-semibold text-xl text-neutral-900 mb-6">Información de contacto</h3>
              
              <div className="space-y-6">
                <ContactInfo 
                  icon="location_on"
                  title="Dirección"
                  content="Necochea 8961, Santa Fe, Argentina"
                />
                
                <ContactInfo 
                  icon="email"
                  title="Correo electrónico"
                  content={<a href="mailto:cotizaciones@vascularmed.com.ar" className="text-primary hover:underline">cotizaciones@vascularmed.com.ar</a>}
                />
                
                <ContactInfo 
                  icon="phone"
                  title="Teléfono"
                  content={
                    <>
                      <a href="https://wa.me/5493425661897" className="text-primary hover:underline">+54 9 3425 66-1897</a>
                      <p className="text-neutral-600 text-sm">(También disponible en WhatsApp)</p>
                    </>
                  }
                />
                
                <ContactInfo 
                  icon="schedule"
                  title="Horario de atención"
                  content="Lunes a Viernes: 8:00 - 17:00"
                />
              </div>
              
              <div className="mt-8">
                <h4 className="font-heading font-medium text-neutral-800 mb-4">Conéctese con nosotros</h4>
                <div className="flex space-x-4">
                  <SocialIcon 
                    type="language" 
                    bgColor="bg-neutral-200" 
                    ariaLabel="Website" 
                    onClick={() => handleSocialClick("Website")} 
                  />
                  <SocialIcon 
                    type="business" 
                    bgColor="bg-neutral-200" 
                    ariaLabel="LinkedIn" 
                    onClick={() => handleSocialClick("LinkedIn")} 
                  />
                  <SocialIcon 
                    type="chat" 
                    bgColor="bg-neutral-200" 
                    ariaLabel="WhatsApp" 
                    onClick={() => handleSocialClick("WhatsApp")} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
