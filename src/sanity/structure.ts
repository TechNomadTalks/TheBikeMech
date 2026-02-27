import type {StructureResolver} from 'sanity/structure'

const templateInitialValues: Record<string, Record<string, string>> = {
  sani2c: {
    _type: 'event',
    name: 'Sani2c',
    type: 'race',
    distance: '270km',
    entryFee: 'R2,200 - R2,800',
    location: 'Drakensberg to Coast',
    description: '3-day mountain bike race from the Drakensberg to the Coast.',
  },
  go2berg: {
    _type: 'event',
    name: 'Go2Berg',
    type: 'race',
    distance: '180km',
    entryFee: 'R1,800 - R2,200',
    location: 'Drakensberg',
    description: '3-day mountain bike race in the Drakensberg.',
  },
  bergbush: {
    _type: 'event',
    name: 'Berg n Bush',
    type: 'event',
    distance: '240km',
    entryFee: 'R2,400 - R3,000',
    location: 'Drakensberg',
    description: '4-day mountain bike adventure in the Drakensberg.',
  },
  coastalkrash: {
    _type: 'event',
    name: 'Coastal Krash',
    type: 'ride',
    distance: '35km/55km',
    entryFee: 'R200',
    location: 'South Coast',
    description: 'Single day ride on the South Coast.',
  },
  sanibrews: {
    _type: 'event',
    name: 'Sani Brews Ride',
    type: 'ride',
    distance: '25km',
    entryFee: 'R150',
    location: 'Sanihawk',
    description: 'Social ride ending at a brewery.',
  },
  winterride: {
    _type: 'event',
    name: 'Winter Ride Series',
    type: 'ride',
    distance: '20-40km',
    entryFee: 'Free',
    location: 'Various locations',
    description: 'Weekly group rides during winter.',
  },
  kznxcm: {
    _type: 'event',
    name: 'KZN XCM Championships',
    type: 'race',
    distance: '80km',
    entryFee: 'R400',
    location: 'South Coast',
    description: 'KZN XCM Championships - marathon race.',
  },
  summersolstice: {
    _type: 'event',
    name: 'Summer Solstice Ride',
    type: 'ride',
    distance: '15km',
    entryFee: 'R100',
    location: 'Umtentweni',
    description: 'Evening ride to celebrate the summer solstice.',
  },
}

export const structure: StructureResolver = (S) => {
  const createWithTemplate = (templateKey: string) => {
    const template = templateInitialValues[templateKey]
    return S.editor()
      .id(`new-${templateKey}`)
      .schemaType('event')
      .documentId(`new-${templateKey}`)
      .initialObjectTemplate(template)
      .views([S.view.form()])
  }

  return S.list()
    .title('Content')
    .items([
      S.divider(),
      S.listItem({
        id: 'quick-create-events',
        title: '⚡ Quick Create Event',
        child: () =>
          S.list()
            .title('Select Template')
            .items([
              S.listItem({
                id: 'sani2c',
                title: '+ Sani2c (3-day race, 270km)',
                schemaType: 'event',
                child: () => createWithTemplate('sani2c'),
              }),
              S.listItem({
                id: 'go2berg',
                title: '+ Go2Berg (3-day race, 180km)',
                schemaType: 'event',
                child: () => createWithTemplate('go2berg'),
              }),
              S.listItem({
                id: 'bergbush',
                title: '+ Berg n Bush (4-day adventure, 240km)',
                schemaType: 'event',
                child: () => createWithTemplate('bergbush'),
              }),
              S.listItem({
                id: 'coastalkrash',
                title: '+ Coastal Krash (Single day, 35-55km)',
                schemaType: 'event',
                child: () => createWithTemplate('coastalkrash'),
              }),
              S.listItem({
                id: 'sanibrews',
                title: '+ Sani Brews Ride (Social, 25km)',
                schemaType: 'event',
                child: () => createWithTemplate('sanibrews'),
              }),
              S.listItem({
                id: 'winterride',
                title: '+ Winter Ride Series (Weekly, 20-40km)',
                schemaType: 'event',
                child: () => createWithTemplate('winterride'),
              }),
              S.listItem({
                id: 'kznxcm',
                title: '+ KZN XCM Championships (Race, 80km)',
                schemaType: 'event',
                child: () => createWithTemplate('kznxcm'),
              }),
              S.listItem({
                id: 'summersolstice',
                title: '+ Summer Solstice Ride (Evening, 15km)',
                schemaType: 'event',
                child: () => createWithTemplate('summersolstice'),
              }),
            ]),
      }),
      S.divider(),
      S.documentTypeListItem('event').title('Events'),
      ...S.documentTypeListItems().filter((item: any) => item.getId() !== 'event'),
    ])
}
