import { Form, Formik, FormikProps } from "formik"
import * as Yup from "yup"

interface RegisterFormProps {
    formikRef: React.RefObject<FormikProps<any> | null>
}

export function RegisterForm({ formikRef }: RegisterFormProps) {

    const validationSchema = Yup.object({
        lastName: Yup.string().required("Requis"),
        firstName: Yup.string().required("Requis"),
        street: Yup.string().required("Requis"),
        city: Yup.string().required("Requis"),
        postcode: Yup.string().required("Requis"),
        country: Yup.string().required("Requis"),
    })


    return (
        <div className="w-full">
            <Formik
                innerRef={formikRef}
                initialValues={{
                    lastName: "",
                    firstName: "",
                    companyName: "",
                    siret: "",
                    phone: "",
                    email: "",
                    street: "",
                    addressLine2: "",
                    city: "",
                    postcode: "",
                    country: "",
                    description: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log("Submitted values:", values)
                    alert("Formulaire soumis avec succès !")
                }}
            >
                <Form className="space-y-6">

                    
                </Form>
            </Formik>
        </div>
    )
}