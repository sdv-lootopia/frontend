import { Paperclip, X } from "lucide-react"

interface FileListProps {
    files: File[]
    removeFile: (index: number) => void
}

export function FileList({ files, removeFile }: FileListProps) {
    if (files.length === 0) return null

    return (
        <ul className="mt-3 divide-y divide-gray-200 rounded-md border border-gray-200">
            {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                        <Paperclip className="h-5 w-5 flex-shrink-0" />
                        <span className="ml-2 w-0 flex-1 truncate text-black opacity-100">{file.name}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="font-medium text-blue-200 hover:text-gray-700"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}