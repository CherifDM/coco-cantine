/** Indicateur de chargement accessible */
export function LoadingSpinner({ label = 'Chargement en cours…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4" role="status" aria-live="polite">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
        aria-hidden="true"
      />
      <p className="text-text-light">{label}</p>
    </div>
  )
}
