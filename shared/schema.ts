import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Contact form submissions table
export const contactForms = pgTable("contact_forms", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  email: text("email").notNull(),
  telefono: text("telefono").notNull(),
  mensaje: text("mensaje").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  processed: boolean("processed").default(false).notNull(),
});

// Contact form schema for validation
export const contactFormSchema = z.object({
  nombre: z.string().min(3, "Por favor ingrese su nombre completo"),
  email: z.string().email("Por favor ingrese un correo electrónico válido"),
  telefono: z.string().min(6, "Por favor ingrese un número de teléfono válido"),
  mensaje: z.string().min(10, "Por favor ingrese un mensaje de al menos 10 caracteres"),
});

export const insertContactFormSchema = createInsertSchema(contactForms).pick({
  nombre: true,
  email: true,
  telefono: true,
  mensaje: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ContactForm = typeof contactForms.$inferSelect;
export type InsertContactForm = z.infer<typeof insertContactFormSchema>;
