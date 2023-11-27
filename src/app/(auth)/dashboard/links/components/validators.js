import { z } from "zod";

export const createSchema = z.object({
    url: z.string().url(),
    slug: z
        .string()
        .min(3)
        .max(25)
        .refine((value) => /^[a-zA-Z0-9-]+$/.test(value), {
            message:
                "Invalid URL slug. It can only contain letters, numbers, and hyphens.",
        })
        .optional().or(z.literal('')),
    expiresOn: z
        .date()
        .refine((data) => data > new Date(), {
            message: "Expiration date must be in the future",
        })
        .optional().or(z.literal(null)),
});
