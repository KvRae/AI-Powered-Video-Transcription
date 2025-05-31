'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import FileUpload from '@/components/ui/FileUpload'
import LanguageSelector from '@/components/ui//LanguageSelector'
import ProcessingStatus from '@/components/ui//ProcessingStatus'
import ResultDisplay from '@/components/ui/ResultDisplayBar'
import { useVideoTranslator } from '@/app/hooks/VideoTranslator'

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const {
    file,
    setFile,
    language,
    setLanguage,
    status,
    result,
    errorMessage,
    processingStage,
    handleSubmit
  } = useVideoTranslator()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
        <main className="min-h-screen flex items-center justify-center w-full bg-gradient-to-b from-background to-accent/10 p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl bg-card rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
              AI Video Translator
            </h1>
            <div className="space-y-8">
              <FileUpload
                  file={null}
                  onFileChange={() => {}}
                  errorMessage={null}
                  disabled={true}
              />
              <LanguageSelector
                  language="French"
                  onLanguageChange={() => {}}
                  disabled={true}
              />
              <Button
                  disabled
                  variant="default"
                  size="lg"
                  className="w-full font-medium text-base py-6"
              >
                Translate Video
              </Button>
            </div>
          </div>
        </main>
    )
  }

  return (
      <main className="min-h-screen flex items-center justify-center w-full bg-gradient-to-b from-background to-accent/10 p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl bg-card rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            🎥 AI Video Translator
          </h1>

          <div className="space-y-8">
            <FileUpload
                file={file}
                onFileChange={setFile}
                errorMessage={errorMessage}
                disabled={status === 'loading'}
            />

            <LanguageSelector
                language={language}
                onLanguageChange={setLanguage}
                disabled={status === 'loading'}
            />

            <Button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                variant="default"
                size="lg"
                className="w-full font-medium text-base py-6"
            >
              {status === 'loading' ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
              ) : (
                  'Translate Video'
              )}
            </Button>

            {status === 'loading' && (
                <ProcessingStatus processingStage={processingStage} />
            )}

            <ResultDisplay status={status} result={result} />
          </div>
        </div>
      </main>
  )
}