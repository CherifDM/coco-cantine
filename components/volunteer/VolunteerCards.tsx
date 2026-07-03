import { Card, CardContent } from '@/components/ui/Card'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import type { VolunteerRole, VolunteerTestimonial } from '@/lib/types'

interface VolunteerRoleCardProps {
  role: VolunteerRole
}

export function VolunteerRoleCard({ role }: VolunteerRoleCardProps) {
  const anchorId = role.slug?.current || role._id

  return (
    <Card as="article" id={anchorId} hover className="scroll-mt-24">
      <CardContent>
        <div className="flex items-start gap-4 mb-4">
          {role.icon && (
            <span className="text-4xl shrink-0" aria-hidden="true">{role.icon}</span>
          )}
          <div>
            <h3 className="text-xl font-bold text-primary">{role.title}</h3>
            {role.schedule && (
              <p className="text-sm text-muted mt-1">{role.schedule}</p>
            )}
          </div>
        </div>

        {role.description && (
          <p className="text-muted mb-4 leading-relaxed">{role.description}</p>
        )}

        {role.content && role.content.length > 0 && (
          <PortableTextRenderer value={role.content} />
        )}

        {role.requirements && role.requirements.length > 0 && (
          <div className="mt-5">
            <h4 className="font-bold text-sm mb-2 text-secondary">Prérequis :</h4>
            <ul className="flex flex-wrap gap-2">
              {role.requirements.map((req, i) => (
                <li
                  key={i}
                  className="rounded-full bg-highlight/40 px-3 py-1 text-sm text-dark font-medium"
                >
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface TestimonialCardProps {
  testimonial: VolunteerTestimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card as="blockquote" hover variant="light" className="h-full">
      <CardContent className="flex flex-col h-full">
        <div className="flex items-center gap-4 mb-5">
          {testimonial.photo?.asset ? (
            <div className="relative h-14 w-14 rounded-full overflow-hidden shrink-0 ring-2 ring-accent/30">
              <SanityImageComponent
                image={testimonial.photo}
                alt={testimonial.photo.alt || `Photo de ${testimonial.name}`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className="h-14 w-14 rounded-full bg-accent/30 flex items-center justify-center text-xl shrink-0"
              aria-hidden="true"
            >
              🙂
            </div>
          )}
          <div>
            <cite className="font-bold not-italic text-primary">{testimonial.name}</cite>
            {testimonial.role && (
              <p className="text-sm text-muted">{testimonial.role}</p>
            )}
          </div>
        </div>
        <p className="text-dark italic flex-1 leading-relaxed">&ldquo;{testimonial.testimonial}&rdquo;</p>
      </CardContent>
    </Card>
  )
}
