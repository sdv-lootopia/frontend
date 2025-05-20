"use client"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { MapPin, Save } from "lucide-react"
import { Address } from "@/components/partner-register/address"
import { usePersistedFormik } from "@/hooks/persist-form"

export interface AddressData {
    firstName: string
    lastName: string
    street: string
    additionalInfo: string
    city: string
    postalCode: string
    country: string
    phone: string
}

interface AddressFormProps {
    onAddressSubmit: (address: AddressData) => void
    initialAddress?: AddressData
}

const defaultAddress: AddressData = {
    firstName: "",
    lastName: "",
    street: "",
    additionalInfo: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
}

const AddressSchema = Yup.object().shape({
    firstName: Yup.string().required("Le prénom est requis"),
    lastName: Yup.string().required("Le nom est requis"),
    street: Yup.string().required("L'adresse est requise"),
    additionalInfo: Yup.string(),
    city: Yup.string().required("La ville est requise"),
    postalCode: Yup.string()
        .required("Le code postal est requis")
        .matches(/^[0-9]{5}$/, "Le code postal doit contenir 5 chiffres"),
    country: Yup.string().required("Le pays est requis"),
    phone: Yup.string()
        .required("Le numéro de téléphone est requis")
        .matches(/^[0-9+\s]{10,15}$/, "Veuillez entrer un numéro de téléphone valide"),
})

export default function AddressForm({ onAddressSubmit, initialAddress }: AddressFormProps) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-blue-300" />
                <h2 className="text-xl font-semibold text-sand-500">Adresse de livraison</h2>
            </div>

            <Formik
                initialValues={initialAddress || defaultAddress}
                validationSchema={AddressSchema}
                onSubmit={(values, { setSubmitting }) => {
                    onAddressSubmit(values)
                    localStorage.removeItem("address-form")
                    setSubmitting(false)
                }}
            >
                {({ isSubmitting, values, setValues }) => {
                    usePersistedFormik("address-form", values, setValues)

                    return (
                        <Form className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-blue-400">
                                        Prénom <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        className="w-full rounded-md border border-neutral-300 px-4 py-2 text-sand-500 placeholder-neutral-400 focus:border-blue-300 focus:outline-none"
                                        placeholder="Prénom"
                                    />
                                    <ErrorMessage name="firstName" component="div" className="mt-1 text-xs text-red-500" />
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-blue-400">
                                        Nom <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        className="w-full rounded-md border border-neutral-300 px-4 py-2 text-sand-500 placeholder-neutral-400 focus:border-blue-300 focus:outline-none"
                                        placeholder="Nom"
                                    />
                                    <ErrorMessage name="lastName" component="div" className="mt-1 text-xs text-red-500" />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="mb-1 block text-sm font-medium text-blue-400">
                                        Téléphone <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        className="w-full rounded-md border border-neutral-300 px-4 py-2 text-sand-500 placeholder-neutral-400 focus:border-blue-300 focus:outline-none"
                                        placeholder="Numéro de téléphone"
                                    />
                                    <ErrorMessage name="phone" component="div" className="mt-1 text-xs text-red-500" />
                                </div>
                            </div>

                            <Address />

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`flex items-center rounded-full ${isSubmitting ? "bg-neutral-300" : "bg-blue-300 hover:bg-blue-400"
                                        } px-6 py-2 text-sm font-medium text-white transition-colors`}
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    {isSubmitting ? "Traitement..." : "Utiliser cette adresse"}
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
