export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Service Name',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'popular',
      title: 'Popular',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'fromPrice',
      title: 'From Price',
      type: 'boolean',
      initialValue: false,
      description: 'Show "From" before price',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Settings', value: 'settings' },
          { title: 'Wrench', value: 'wrench' },
          { title: 'Cog', value: 'cog' },
          { title: 'Zap', value: 'zap' },
          { title: 'Bike', value: 'bike' },
        ],
      },
    },
  ],
}
