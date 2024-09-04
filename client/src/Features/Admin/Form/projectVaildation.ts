import { z } from "zod";

export const validationSchema = z.object({
    file: z.instanceof(File).optional(),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    link: z.string().url("Invalid URL"),
    technologies: z.array(z.string()).nonempty("At least one technology is required"),
}).refine((data:any) => {
    if (!data.pictureUrl && !data.file) {
        return false;
    }
    return true;
}, {
    message: "Please provide image",
    path: ["file"],  // The path to the field that will display the error
});