import { useEffect, useRef } from "react"
import { FormikHelpers } from "formik"

export function usePersistedFormik<T>(
    key: string,
    values: T,
    setValues: FormikHelpers<T>["setValues"]
) {
    const hasRestored = useRef(false)

    useEffect(() => {
        if (!hasRestored.current) {
            const saved = localStorage.getItem(key)
            if (saved) {
                try {
                    const parsed = JSON.parse(saved)
                    setValues(parsed)
                } catch (err) {
                    console.warn("Erreur de parsing des données sauvegardées", err)
                }
            }
            hasRestored.current = true
        }
    }, [key, setValues])

    useEffect(() => {
        if (hasRestored.current) {
            localStorage.setItem(key, JSON.stringify(values))
        }
    }, [key, values])
}
