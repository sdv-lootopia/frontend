"use client"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { LootopiaLogo } from "@/components/lootopia-logo"
import Link from "next/link"
import { useUser } from "@/lib/useUser"
import { useRouter } from "next/navigation"

const RegisterSchema = Yup.object().shape({
    nickname: Yup.string()
        .required("Le nickname est obligatoire")
        .min(3, "Le nickname doit contenir au moins 3 caractères"),
    email: Yup.string().email("Adresse email invalide").required("L'email est obligatoire"),
    password: Yup.string()
        .required("Le mot de passe est obligatoire")
        .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

type RegisterFormProps = {
    onSwitchToLogin: () => void
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
    const [isSubmitting, setSubmitting] = useState(false);
    const { registerUser } = useUser();
    const router = useRouter();

    const handleRegisterSubmit = (values: { nickname: string, email: string }) => {
        console.log("Register values:", values)
        registerUser(values.nickname, values.email, "/bbyoda.jpg", "");
        setTimeout(() => {
            router.push("/");
            setSubmitting(false)
        }, 1000)
    }

    return (
        <div className="w-full">

            <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex flex-row items-center gap-3">
                    <div className="w-12 h-12 text-teal-600">
                        <LootopiaLogo />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Inscription</h1>
                        <p className="text-gray-600">Bienvenue sur Lootopia !</p>
                    </div>
                </div>


                <Link
                    href="/partner-register"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-indigo-300 text-indigo-700 rounded-md text-sm hover:bg-indigo-50 transition-colors"
                >
                    <span>S’inscrire en tant que partenaire</span>
                </Link>

            </div>

            <div className="border-t border-gray-200 my-4"></div>
            <Formik
                initialValues={{ nickname: "", email: "", password: "" }}
                validationSchema={RegisterSchema}
                onSubmit={handleRegisterSubmit}
            >
                {({ touched, errors }) => (
                    <Form className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="nickname" className="block font-medium">
                                Nickname
                            </label>
                            <Field
                                id="nickname"
                                name="nickname"
                                type="text"
                                placeholder="Entrez votre nickname"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${touched.nickname && errors.nickname ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            <ErrorMessage name="nickname" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block font-medium">
                                Email
                            </label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Entrez votre adresse mail"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${touched.email && errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block font-medium">
                                Mot de passe
                            </label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Entrez votre mot de passe"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${touched.password && errors.password ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition-colors disabled:opacity-70"
                        >
                            {isSubmitting ? "Création en cours..." : "Créer un compte"}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={onSwitchToLogin}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Déjà un compte ?
                            </button>

                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
