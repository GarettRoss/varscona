import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './schemas'

export default defineConfig({
  name: 'varscona',
  title: 'Varscona Theatre',
  projectId: 'tt49pmnb',
  dataset: 'production',
  plugins: [
    structureTool(),
  ],
  schema,
})
