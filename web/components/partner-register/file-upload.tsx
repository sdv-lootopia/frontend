"use client"

import { Paperclip } from "lucide-react"
import { useFormikContext } from "formik"
import { FileList } from "@/components/partner-register/file-list"

interface FileUploadFieldProps {
    name: string
}

export function FileUpload({ name }: FileUploadFieldProps) {
    const { values, setFieldValue } = useFormikContext<any>()
    const files: File[] = values[name] || []

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            const validFiles = newFiles.filter((file) => file.size <= 10 * 1024 * 1024)

            if (files.length + validFiles.length > 5) {
                alert("Vous ne pouvez pas télécharger plus de 5 fichiers.")
                return
            }

            setFieldValue(name, [...files, ...validFiles])
        }
    }

    const removeFile = (index: number) => {
        const updatedFiles = [...files]
        updatedFiles.splice(index, 1)
        setFieldValue(name, updatedFiles)
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Documents joints (max 5 fichiers, 10 Mo par fichier)
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-400 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                        <Paperclip className="mx-auto h-12 w-12 text-neutral-500" />
                        <div className="flex text-sm text-neutral-500">
                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-200 hover:text-gray-700 focus-within:outline-none">
                                <span>Télécharger des fichiers</span>
                                <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" onChange={handleFileChange} />
                            </label>
                            <p className="pl-1">ou glisser-déposer</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, PDF jusqu'à 10MB</p>
                    </div>
                </div>
            </div>
            <FileList files={files} removeFile={removeFile} />
        </div>
    )
}
