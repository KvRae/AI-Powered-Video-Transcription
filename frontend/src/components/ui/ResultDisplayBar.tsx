interface ResultDisplayProps {
    status: 'idle' | 'loading' | 'done' | 'error'
    result: string | null
}

export default function ResultDisplay({ status, result }: ResultDisplayProps) {
    if (status === 'done' && result) {
        return (
            <div className="mt-8 p-4 sm:p-6 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg">
                <h2 className="font-semibold text-lg mb-3 text-green-800 dark:text-green-400">
                    Translated Transcript:
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-md p-4 border">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                        {result}
                    </p>
                </div>
            </div>
        )
    }

    if (status === 'error' && result) {
        return (
            <div className="mt-8 p-4 sm:p-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
                <h2 className="font-semibold text-lg mb-3 text-red-800 dark:text-red-400">
                    Error:
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-red-200 dark:border-red-800">
                    <p className="text-gray-700 dark:text-gray-300">{result}</p>
                </div>
            </div>
        )
    }

    return null
}