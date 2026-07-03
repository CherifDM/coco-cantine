import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-6xl mb-6" aria-hidden="true">🥕</p>
      <h1 className="text-4xl font-bold text-primary mb-4">Page introuvable</h1>
      <p className="text-muted text-lg mb-8 max-w-md mx-auto">
        Désolé, la page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Button href="/" variant="primary">
        Retour à l&apos;accueil
      </Button>
    </Container>
  )
}
