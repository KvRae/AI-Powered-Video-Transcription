interface ProcessingStatusProps {
    processingStage: string
}

export default function ProcessingStatus({ processingStage }: ProcessingStatusProps) {
    return (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg">
            <div className="flex flex-col items-center space-y-2">
                <p className="text-center text-blue-700 dark:text-blue-400 font-semibold">
                    Current stage: {processingStage}
                </p>
                <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2.5">
                    <div
                        className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full animate-pulse"
                        style={{ width: '100%' }}
                    />
                </div>
                <p className="text-center text-blue-700 dark:text-blue-400 text-sm">
                    Please wait - Your video is being processed. This may take several minutes depending on the video length.
                </p>
            </div>
        </div>
    )
}