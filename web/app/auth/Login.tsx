"use client"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import toast from "react-hot-toast"
import { LootopiaLogo } from "@/components/lootopia-logo"
import { useUser } from "@/lib/useUser"
import { useRouter } from "next/navigation"

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Adresse email invalide").required("L'email est obligatoire"),
    password: Yup.string()
        .required("Le mot de passe est obligatoire")
        .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    rememberMe: Yup.boolean(),
})

type LoginFormProps = {
    onSwitchToRegister: () => void
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
    const [isSubmitting, setSubmitting] = useState(false);
    const { loginUser } = useUser();
    const router = useRouter();
    const handleLoginSubmit = (values: { email: string, password: string, rememberMe: boolean }) => {
        toast.success(values.email);

        loginUser(values.email);

        setTimeout(() => {
            router.push("/");
            setSubmitting(false)
        }, 4000)
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 text-teal-600">
                    <LootopiaLogo />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Connexion</h1>
                    <p className="text-gray-600">(Re)Bienvenue sur Lootopia !</p>
                </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <Formik
                initialValues={{ email: "", password: "", rememberMe: false }}
                validationSchema={LoginSchema}
                onSubmit={handleLoginSubmit}
            >
                {({ touched, errors }) => (
                    <Form className="space-y-4">
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
                            {isSubmitting ? "Connexion en cours..." : "Se connecter"}
                        </button>

                        <div className="text-center space-y-2">
                            <button
                                type="button"
                                onClick={onSwitchToRegister}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Pas encore de compte ?
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
