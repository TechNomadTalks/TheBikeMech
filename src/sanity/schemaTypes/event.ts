const eventTemplates = [
  { title: 'None', value: '' },
  { title: 'Sani2c', value: 'sani2c' },
  { title: 'Go2Berg', value: 'go2berg' },
  { title: 'Berg n Bush', value: 'bergbush' },
  { title: 'Coastal Krash', value: 'coastalkrash' },
  { title: 'Sani Brews Ride', value: 'sanibrews' },
  { title: 'Winter Ride Series', value: 'winterride' },
  { title: 'KZN XCM Championships', value: 'kznxcm' },
  { title: 'Summer Solstice Ride', value: 'summersolstice' },
]

const templateDefaults: Record<string, { type?: string; distance?: string; entryFee?: string; location?: string; description?: string }> = {
  sani2c: {
    type: 'race',
    distance: '270km',
    entryFee: 'R2,200 - R2,800',
    location: 'Drakensberg to Coast',
    description: '3-day mountain bike race from the Drakensberg to the Coast.',
  },
  go2berg: {
    type: 'race',
    distance: '180km',
    entryFee: 'R1,800 - R2,200',
    location: 'Drakensberg',
    description: '3-day mountain bike race in the Drakensberg.',
  },
  bergbush: {
    type: 'event',
    distance: '240km',
    entryFee: 'R2,400 - R3,000',
    location: 'Drakensberg',
    description: '4-day mountain bike adventure in the Drakensberg.',
  },
  coastalkrash: {
    type: 'ride',
    distance: '35km/55km',
    entryFee: 'R200',
    location: 'South Coast',
    description: 'Single day ride on the South Coast.',
  },
  sanibrews: {
    type: 'ride',
    distance: '25km',
    entryFee: 'R150',
    location: 'Sanihawk',
    description: 'Social ride ending at a brewery.',
  },
  winterride: {
    type: 'ride',
    distance: '20-40km',
    entryFee: 'Free',
    location: 'Various locations',
    description: 'Weekly group rides during winter.',
  },
  kznxcm: {
    type: 'race',
    distance: '80km',
    entryFee: 'R400',
    location: 'South Coast',
    description: 'KZN XCM Championships - marathon race.',
  },
  summersolstice: {
    type: 'ride',
    distance: '15km',
    entryFee: 'R100',
    location: 'Umtentweni',
    description: 'Evening ride to celebrate the summer solstice.',
  },
}

export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'template',
      title: 'Event Template',
      type: 'string',
      options: {
        list: eventTemplates,
      },
      description: 'Select a template to auto-fill common fields',
    },
    {
      name: 'name',
      title: 'Event Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Start Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
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
  initialValue: async (props: any) => {
    const template = props?.template || ''
    const defaults = templateDefaults[template]
    if (!defaults) return {}
    
    return {
      ...defaults,
      name: defaults.description?.split(' - ')[0] || '',
    }
  },
  preview: {
    select: {
      title: 'name',
      subtitle: 'date',
    },
  },
}
