import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { MenuDay } from '@/components/menu/MenuDay'
import { formatMenuDayLabel } from '@/lib/utils'
import type { MenuOfTheDay } from '@/lib/types'

interface MenuPreviewProps {
  menu?: MenuOfTheDay | null
}

export function MenuPreview({ menu }: MenuPreviewProps) {
  return (
    <Section className="bg-light" ariaLabelledby="menu-title">
      <Container>
        <SectionHeader
          id="menu-title"
          title="Menu du jour"
          subtitle="Découvrez ce que nos cuisinièr·es vous préparent aujourd'hui."
        />

        {menu ? (
          <div className="max-w-2xl mx-auto">
            <MenuDay
              dayLabel={formatMenuDayLabel(menu.date)}
              starters={menu.starters}
              mainCourses={menu.mainCourses}
              desserts={menu.desserts}
              specialNote={menu.specialNote}
              isClosed={menu.isClosed}
            />
          </div>
        ) : (
          <p className="text-center text-muted text-lg">
            Le menu du jour sera bientôt disponible. Revenez nous voir !
          </p>
        )}

        <div className="text-center mt-10">
          <Button href="/blog?filter=menus" variant="accent">
            Voir les menus de la semaine
          </Button>
        </div>
      </Container>
    </Section>
  )
}
