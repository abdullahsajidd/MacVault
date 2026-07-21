import {type DocumentActionComponent, type DocumentActionDescription, type DocumentActionProps, useClient} from 'sanity'
import {buildProductSlug, withDuplicateSuffix} from '../lib/productSlug'

type ProductDocument = DocumentActionProps['draft'] & {
  categoryKey?: string
  model?: {_ref?: string}
  unitDetails?: Record<string, unknown>
}

export function createPublishAction(previousAction: DocumentActionComponent): DocumentActionComponent {
  const generateSlugBeforePublish: DocumentActionComponent = (props): DocumentActionDescription | null => {
    const client = useClient({apiVersion: '2026-07-15'})
    const draft = props.draft as ProductDocument
    const original = previousAction(props)

    if (props.type !== 'product' || !draft || !original) return original

    return {
      ...original,
      label: original.label || 'Publish',
      onHandle: async () => {
        const modelName = draft.model?._ref
          ? await client.fetch<string | null>(
              '*[_type == "catalogModel" && _id == $id][0].name',
              {id: draft.model._ref},
            )
          : null
        const baseSlug = buildProductSlug(
          modelName ?? undefined,
          draft.categoryKey,
          draft.unitDetails,
        )
        const publishedId = props.id.replace(/^drafts\./, '')
        const existing = await client.fetch<string[]>(
          `*[_type == "product" && !(_id in path("drafts.**")) && _id != $id && defined(slug.current)].slug.current`,
          {id: publishedId},
        )
        const used = new Set(existing)
        let duplicateNumber = 1

        while (used.has(withDuplicateSuffix(baseSlug, duplicateNumber))) duplicateNumber += 1

        await client
          .patch(draft._id)
          .set({slug: {_type: 'slug', current: withDuplicateSuffix(baseSlug, duplicateNumber)}})
          .commit()
        original.onHandle?.()
      },
    }
  }

  return generateSlugBeforePublish
}
