import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {createPublishAction} from './plugins/productSlugAction'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'MacVault Catalog',
  projectId: '9oh8856r',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  document: {
    actions: (previousActions) =>
      previousActions.map((action) =>
        action.action === 'publish' ? createPublishAction(action) : action,
      ),
  },
  schema: {
    types: schemaTypes,
  },
})
