import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { MenuDay } from '@/components/menu/MenuDay'
import { DAY_LABELS } from '@/lib/utils'
import type { MenuOfTheDay } from '@/lib/types'

interface MenuPreviewProps {
  menu?: MenuOfTheDay | null
}

/** Aperçu du menu du jour */
export function MenuPreview({ menu }: MenuPreviewProps) {
  return (
    <Section className="bg-white" ariaLabelledby="menu-title">
      <Container>
        <SectionHeader
          id="menu-title"
          title="Menu du jour"
          subtitle="Découvrez ce que nos cuisinièr·es vous préparent aujourd'hui."
        />

        {menu ? (
          <div className="max-w-2xl mx-auto">
            <MenuDay
              dayLabel={`${DAY_LABELS[menu.dayOfWeek] || ''} — ${new Date(menu.date).toLocaleDateString('fr-FR')}`}
              starters={menu.starters}
              mainCourses={menu.mainCourses}
              desserts={menu.desserts}
              specialNote={menu.specialNote}
            />
          </div>
        ) : (
          <p className="text-center text-text-light">
            Le menu du jour sera bientôt disponible. Revenez nous voir !
          </p>
        )}

        <div className="text-center mt-8">
          <Button href="/blog?category=menus" variant="outline">
            Voir les menus de la semaine
          </Button>
        </div>
      </Container>
    </Section>
  )
}
