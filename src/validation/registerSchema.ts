import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email("Введите корректный email"),
    name: z.string().min(3, "Имя пользователя должно содержать минимум 3 символа").nonempty("Имя обязательно для заполнения"),
    surname: z.string().min(3, "фамилия пользователя должно содержать минимум 3 символа").nonempty("фамилия обязательно для заполнения"),
    password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
    password2: z.string().min(6, "Подтвердите пароль"),
    }).refine((data) => data.password === data.password2, {
    message: "Пароли не совпадают",
    path: ["password2"],
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;