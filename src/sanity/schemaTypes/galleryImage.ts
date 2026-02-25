export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Repairs', value: 'Repairs' },
          { title: 'Custom Builds', value: 'Custom Builds' },
          { title: 'Before & After', value: 'Before & After' },
          { title: 'Shop', value: 'Shop' },
          { title: 'Events', value: 'Events' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
