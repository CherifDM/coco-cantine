import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">Page introuvable</h1>
      <p className="text-text-light text-lg mb-8">
        Désolé, la page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Button href="/" variant="primary">
        Retour à l&apos;accueil
      </Button>
    </Container>
  )
}
