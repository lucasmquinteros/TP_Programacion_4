import { z } from "zod";

// schema para el formulario SIGN IN:
export const signInSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, "Email o usuario es requerido")
    .refine(
      (value) => value.includes("@") || value.length >= 3,
      "Debe ser un email válido o username de al menos 3 caracteres"
    ),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

// schema para el formulario SIGN UP:
export const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(3, "username debe tener al menos 3 caracteres")
      .max(30, "username no puede tener más de 30 caracteres"),
    email: z.string().email("Email no válido"),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@%+-]).{8,}$/,
        "Caracteres necesarios 8: A-Z, a-z, @%+-"
      ),
    confirmPassword: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@%+-]).{8,}$/,
        "Caracteres necesarios 8: A-Z, a-z, @%+-"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// schema para el formulario CONTACTO:
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  email: z.string().email("Email no válido"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder 1000 caracteres"),
});
