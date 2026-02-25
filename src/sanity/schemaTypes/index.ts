import { type SchemaTypeDefinition } from 'sanity'
import service from './service'
import blogPost from './blogPost'
import galleryImage from './galleryImage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service, blogPost, galleryImage],
}
