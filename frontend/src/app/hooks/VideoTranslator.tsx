import { useState } from 'react'

export type Status = 'idle' | 'loading' | 'done' | 'error'

export interface UseVideoTranslatorReturn {
    file: File | null
    setFile: (file: File | null) => void
    language: string
    setLanguage: (language: string) => void
    status: Status
    result: string | null
    taskId: string | null
    errorMessage: string | null
    processingStage: string
    handleSubmit: () => Promise<void>
}

export function useVideoTranslator(): UseVideoTranslatorReturn {
    const [file, setFile] = useState<File | null>(null)
    const [language, setLanguage] = useState('French')
    const [status, setStatus] = useState<Status>('idle')
    const [result, setResult] = useState<string | null>(null)
    const [taskId, setTaskId] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [processingStage, setProcessingStage] = useState<string>('Uploading')

    const handleSubmit = async () => {
        if (!file) {
            setErrorMessage("Please select a video file first")
            return
        }

        setErrorMessage(null)
        setStatus('loading')
        setProcessingStage('Uploading video')

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('target_language', language)

            const res = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) {
                throw new Error(`Server responded with status: ${res.status}`)
            }

            const data = await res.json()
            setTaskId(data.id)
            setProcessingStage('Transcribing and translating')

            // Poll status
            let pollCount = 0
            const interval = setInterval(async () => {
                try {
                    pollCount++
                    if (pollCount > 1) {
                        setProcessingStage(`Processing (check ${pollCount})...`)
                    }

                    const response = await fetch(`http://localhost:8000/${data.id}`)

                    if (!response.ok) {
                        throw new Error(`Status check failed with status: ${response.status}`)
                    }

                    const statusData = await response.json()

                    if (statusData.status === 'success') {
                        clearInterval(interval)
                        setProcessingStage('Completed')
                        setResult(statusData.result)
                        setStatus('done')
                    } else if (statusData.status === 'error') {
                        clearInterval(interval)
                        setStatus('error')
                        setResult(statusData.result || 'Something went wrong!')
                    } else if (statusData.progress) {
                        setProcessingStage(statusData.progress)
                    }
                } catch (error) {
                    clearInterval(interval)
                    setStatus('error')
                    setResult(error instanceof Error ? error.message : 'Failed to check processing status')
                }
            }, 4000)
        } catch (error) {
            setStatus('error')
            setResult(error instanceof Error ? error.message : 'Failed to upload video')
        }
    }

    return {
        file,
        setFile,
        language,
        setLanguage,
        status,
        result,
        taskId,
        errorMessage,
        processingStage,
        handleSubmit
    }
}