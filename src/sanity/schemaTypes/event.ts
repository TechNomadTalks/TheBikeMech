export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Event Name',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Race', value: 'race' },
          { title: 'Ride', value: 'ride' },
          { title: 'Event', value: 'event' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url',
    },
    {
      name: 'entryFee',
      title: 'Entry Fee',
      type: 'string',
    },
    {
      name: 'distance',
      title: 'Distance',
      type: 'string',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'active',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'date',
    },
  },
}
