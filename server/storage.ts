import { users, type User, type InsertUser, type ContactForm, type InsertContactForm } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveContactForm(contactForm: InsertContactForm): Promise<ContactForm>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactForms: Map<number, ContactForm>;
  currentId: number;
  contactFormId: number;

  constructor() {
    this.users = new Map();
    this.contactForms = new Map();
    this.currentId = 1;
    this.contactFormId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async saveContactForm(contactForm: InsertContactForm): Promise<ContactForm> {
    const id = this.contactFormId++;
    const now = new Date();
    const fullContactForm: ContactForm = { 
      ...contactForm, 
      id, 
      createdAt: now,
      processed: false
    };
    this.contactForms.set(id, fullContactForm);
    return fullContactForm;
  }
}

export const storage = new MemStorage();
