import { z } from 'zod';

// Contact form schema
export const contactSchema = z.object({
  nombre: z.string().min(3, "Por favor ingrese su nombre completo"),
  email: z.string().email("Por favor ingrese un correo electrónico válido"),
  telefono: z.string().min(6, "Por favor ingrese un número de teléfono válido"),
  mensaje: z.string().min(10, "Por favor ingrese un mensaje de al menos 10 caracteres"),
  privacidad: z.literal(true, {
    errorMap: () => ({ message: "Debe aceptar la política de privacidad" }),
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
