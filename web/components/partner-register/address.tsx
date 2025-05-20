import { useState } from 'react'
import { FormField } from './form-field'
import { useFormikContext } from 'formik'

type Suggestion = {
    properties: {
        address_line1: string
        street?: string
        city?: string
        country?: string
        postcode?: string
    }
}

export function Address() {
    const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])

    const { values, setFieldValue } = useFormikContext<any>()

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFieldValue('street', value)

        if (value.length > 3) {
            const response = await fetch(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&lang=fr&apiKey=${apiKey}`
            )
            const data = await response.json()
            setSuggestions(data.features)
        } else {
            setSuggestions([])
        }
    }

    const handleSelect = (item: Suggestion) => {
        const fullStreet = item.properties.address_line1 || ''
        setFieldValue('street', fullStreet)
        setFieldValue('city', item.properties.city || '')
        setFieldValue('postalCode', item.properties.postcode || '')
        setFieldValue('country', item.properties.country || '')
        setSuggestions([])
    }

    return (
        <div className="space-y-4">
            <div className="relative space-y-2">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                    Adresse <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="street"
                    placeholder="Numéro et nom de rue"
                    value={values.street || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-400 rounded px-4 py-2 text-neutral-600"
                    required
                />
                {suggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow max-h-48 overflow-auto">
                        {suggestions.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(item)}
                                className="px-4 py-2 hover:bg-gray-100 text-neutral-600 cursor-pointer"
                            >
                                {item.properties.address_line1}, {item.properties.city}, {item.properties.country}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <FormField
                id="addressLine2"
                label="Complément d'adresse"
                placeholder="Appartement, bâtiment..."
                value={values.addressLine2}
                onChange={(e) => setFieldValue('addressLine2', e.target.value)}
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                    id="postcode"
                    label="Code postal"
                    required
                    value={values.postcode}
                    onChange={(e) => setFieldValue('postcode', e.target.value)}
                />
                <FormField
                    id="city"
                    label="Ville"
                    required
                    value={values.city}
                    onChange={(e) => setFieldValue('city', e.target.value)}
                />
            </div>

            <FormField
                id="country"
                label="Pays"
                required
                value={values.country}
                onChange={(e) => setFieldValue('country', e.target.value)}
            />
        </div>
    )
}