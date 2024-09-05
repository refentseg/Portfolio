import * as yup from 'yup'

export const validationSchema = yup.object({
    file: yup.mixed().when('pictureUrl',{
        is:(value:string) => !value,
        then:schema => schema.required('Please provide image'),
        otherwise: (schema) => schema.notRequired()
    }),
    name: yup.string().min(1, "Name is required"),
    description: yup.string().min(1, "Description is required"),
    link: yup.string().url("Invalid URL"),
    technologies: yup.array().of(yup.string()),
})