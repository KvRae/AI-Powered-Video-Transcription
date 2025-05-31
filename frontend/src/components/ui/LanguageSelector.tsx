import { Label } from "@/components/ui/label"

interface LanguageSelectorProps {
    language: string
    onLanguageChange: (language: string) => void
    disabled?: boolean
}

const languages = [
    { value: 'French', label: 'French', flag: '🇫🇷' },
    { value: 'Arabic', label: 'Arabic', flag: '🇸🇦' },
    { value: 'Spanish', label: 'Spanish', flag: '🇪🇸' },
    { value: 'German', label: 'German', flag: '🇩🇪' }
]

export default function LanguageSelector({ language, onLanguageChange, disabled = false }: LanguageSelectorProps) {
    return (
        <div className="space-y-3">
            <Label className="text-sm md:text-base font-medium">Select Target Language</Label>
            <select
                className="w-full border border-border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                disabled={disabled}
            >
                {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                        {lang.flag} {lang.label}
                    </option>
                ))}
            </select>
        </div>
    )
}