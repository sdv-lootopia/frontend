"use client"

import type React from "react"

import { Formik, Form, type FormikProps } from "formik"
import * as Yup from "yup"
import { FormField } from "./form-field"
import { TextAreaField } from "./textarea-field"
import { Address } from "./address"
import { FileUpload } from "./file-upload"

interface RegisterFormProps {
    currentTab: number
    formikRef: React.RefObject<FormikProps<any> | null>
}

export function RegisterForm({ currentTab, formikRef }: RegisterFormProps) {

    const validationSchema = Yup.object({
        lastName: Yup.string().required("Requis"),
        firstName: Yup.string().required("Requis"),
        companyName: Yup.string().required("Requis"),
        siret: Yup.string().required("Requis"),
        phone: Yup.string().required("Requis"),
        email: Yup.string().email("Email invalide").required("Requis"),
        street: Yup.string().required("Requis"),
        city: Yup.string().required("Requis"),
        postcode: Yup.string().required("Requis"),
        country: Yup.string().required("Requis"),
        description: Yup.string().required("Requis"),
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
                {({ handleChange, values, errors, touched, handleSubmit }) => (
                    <Form className="space-y-6" onSubmit={handleSubmit}>

                        {currentTab === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-neutral-600">Informations personnelles</h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className={errors.lastName && touched.lastName ? "error" : ""}>
                                        <FormField id="lastName" label="Nom" required value={values.lastName} onChange={handleChange} />
                                        {typeof errors.lastName === 'string' && touched.lastName && (
                                            <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>
                                        )}
                                    </div>

                                    <div className={errors.firstName && touched.firstName ? "error" : ""}>
                                        <FormField
                                            id="firstName"
                                            label="Prénom"
                                            required
                                            value={values.firstName}
                                            onChange={handleChange}
                                        />
                                        {typeof errors.firstName === 'string' && touched.firstName && (
                                            <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className={errors.companyName && touched.companyName ? "error" : ""}>
                                        <FormField
                                            id="companyName"
                                            label="Raison sociale"
                                            required
                                            value={values.companyName}
                                            onChange={handleChange}
                                        />
                                        {typeof errors.companyName === 'string' && touched.companyName && (
                                            <div className="text-red-500 text-sm mt-1">{errors.companyName}</div>
                                        )}
                                    </div>

                                    <div className={errors.siret && touched.siret ? "error" : ""}>
                                        <FormField id="siret" label="Numéro SIRET" required value={values.siret} onChange={handleChange} />
                                        {typeof errors.siret === 'string' && touched.siret && (
                                            <div className="text-red-500 text-sm mt-1">{errors.siret}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className={errors.phone && touched.phone ? "error" : ""}>
                                        <FormField id="phone" label="Téléphone" required value={values.phone} onChange={handleChange} />
                                        {typeof errors.phone === 'string' && touched.phone && (
                                            <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
                                        )}
                                    </div>

                                    <div className={errors.email && touched.email ? "error" : ""}>
                                        <FormField
                                            id="email"
                                            label="E-mail de contact"
                                            type="email"
                                            required
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                        {typeof errors.email === 'string' && touched.email && (
                                            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                                        )}
                                    </div>
                                </div>

                                <div
                                    className={`${(errors.street && touched.street) ||
                                        (errors.city && touched.city) ||
                                        (errors.postcode && touched.postcode) ||
                                        (errors.country && touched.country)
                                        ? "border border-red-500 p-4 rounded-md"
                                        : ""
                                        }`}
                                >
                                    <Address />
                                    {((errors.street && touched.street) ||
                                        (errors.city && touched.city) ||
                                        (errors.postcode && touched.postcode) ||
                                        (errors.country && touched.country)) && (
                                            <div className="text-red-500 text-sm mt-1">
                                                Veuillez compléter tous les champs d'adresse requis
                                            </div>
                                        )}
                                </div>
                            </div>
                        )}

                        {currentTab === 3 && (
                            <>
                                <h2 className="text-xl font-semibold text-neutral-600">Détails du projet</h2>
                                <TextAreaField
                                    id="description"
                                    className="space-y-2"
                                    label="Description du projet et des objectifs du partenariat"
                                    required
                                    value={values.description}
                                    onChange={handleChange}
                                    rows={6}
                                />

                                <FileUpload name="files" />
                            </>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    )
}