import { setErrors } from "./error"

async function validateData(schema, formData) {
    try {
       await schema.validate(formData, { abortEarly: false })
    } catch (error) {
       throw setErrors(error)
    }
}

export default validateData
