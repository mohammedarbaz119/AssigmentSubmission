import { z } from 'zod';

// this file is for the schemas for valdating User inputs

// schema for validating the registration for User/Admin
export const UserAdminRegistrationSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(30, { message: "Name must be at most 30 characters long" }),
    email: z.string()
        .email({ message: "Must be a valid email" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(30, { message: "Password must be at most 30 characters long" }),
}).strict(); 

// Assignment Schema
export const AssignmentZodSchema = z.object({
    task:z.string(),
    admin:z.string()
}).strict()