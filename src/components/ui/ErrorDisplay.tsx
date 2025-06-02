interface ErrorDisplayProps {
    error: Error;
    onRetry?: () => void;
  }
  
  export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
        <h3 className="text-red-400 font-medium mb-2">Erreur</h3>
        <p className="text-red-300 text-sm mb-3">{error.message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-white bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
          >
            Réessayer
          </button>
        )}
      </div>
    );
  }