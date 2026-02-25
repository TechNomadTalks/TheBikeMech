export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Maintenance Tips', value: 'Maintenance Tips' },
          { title: 'Safety', value: 'Safety' },
          { title: 'Tips & Tricks', value: 'Tips & Tricks' },
          { title: 'Buying Guides', value: 'Buying Guides' },
        ],
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'The Bike Mech',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
  ],
}
