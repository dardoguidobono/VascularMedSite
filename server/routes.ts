import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "../shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate form data
      const result = contactFormSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: 'Validation error', 
          errors: validationError.details 
        });
      }
      
      // Store the contact form submission
      const contact = await storage.saveContactForm(result.data);
      
      // Return success response
      return res.status(201).json({ 
        success: true, 
        message: 'Mensaje enviado correctamente. Nos pondremos en contacto a la brevedad.',
        id: contact.id
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error interno del servidor al procesar la solicitud' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
