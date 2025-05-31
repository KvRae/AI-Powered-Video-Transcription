import { Label } from "@/components/ui/label"

interface FileUploadProps {
    file: File | null
    onFileChange: (file: File | null) => void
        errorMessage: string | null
    disabled?: boolean
}

export default function FileUpload({ file, onFileChange, errorMessage, disabled = false }: FileUploadProps) {
    return (
        <div className="space-y-3">
            <Label className="text-sm md:text-base font-medium">Upload .mp4 Video</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 hover:bg-accent/5 transition-colors">
                <input
                    type="file"
                    accept=".mp4"
                    onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                    className="w-full cursor-pointer"
                    disabled={disabled}
                />
            </div>
            {errorMessage && (
                <p className="text-sm text-destructive">{errorMessage}</p>
            )}
            {file && (
                <p className="text-sm text-muted-foreground">
                    Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
            )}
        </div>
    )
}