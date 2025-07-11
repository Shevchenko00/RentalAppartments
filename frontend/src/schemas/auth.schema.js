import { z } from "zod";

export const registerSchema = z
    .object({
        email: z
            .string({ required_error: "Email is required" })
            .email("Invalid email"),

        password: z
            .string({ required_error: "Password is required" })
            .min(8, "Minimum 8 characters")
            .refine(
                (val) => /[A-Z]/.test(val),
                { message: "Password must contain at least one uppercase letter" }
            )
            .refine(
                (val) => /\d/.test(val),
                { message: "Password must contain at least one number" }
            ),

        repeat_password: z
            .string({ required_error: "Confirm password is required" })
            .nonempty("Confirm password is required"),

        country: z
            .string({ required_error: "Country is required" })
            .nonempty("Country is required"),

        phone_country_code: z
            .string({ required_error: "Phone country code is required" })
            .min(1, "Phone country code is required")
            .max(3, "The country code must not exceed 3 digits.")
            .regex(/^\d+$/, "Country code must contain only numbers"),

        phone_number: z
            .string({ required_error: "Phone number is required" })
            .min(5, "Phone number is too short")
            .max(11, "Phone number is too long")
            .regex(/^\d+$/, "Phone number must contain only digits"),

        city: z
            .string({ required_error: "City is required" })
            .nonempty("City is required")
            .max(40, "The city name is too long"),

        first_name: z
            .string({ required_error: "First name is required" })
            .nonempty("First name is required"),

        last_name: z
            .string({ required_error: "Last name is required" })
            .nonempty("Last name is required"),

        date_birth: z
            .string({ required_error: "Date of birth is required" })
            .nonempty("Date of birth is required")
            .refine((val) => !isNaN(Date.parse(val)), {
                message: "Invalid date format",
            }),

        is_landlord: z.boolean(),
    })
    .refine((data) => data.password === data.repeat_password, {
        path: ["repeat_password"],
        message: "The passwords do not match",
    });


export const loginSchema = () => z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email"),

    password: z
        .string({ required_error: "Password is required" })
        .min(8, "Minimum 8 characters")
});




export default registerSchema;