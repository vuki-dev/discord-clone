import { z } from "zod";

const required_error = "This field cannot be blank";

const loginFormSchema = z.object({
    email: z.string().email('Please provide a valid email').min(1, {message: required_error}),
    password: z.string().min(6).max(20)
})

const registerFormSchema = z.object({
    username: z.string().min(1,{message: required_error}),
    email: z.string().email('Please provide a valid email').min(1, {message: required_error}),
    password: z.string().min(6).max(20),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export {
    loginFormSchema,
    registerFormSchema
}
