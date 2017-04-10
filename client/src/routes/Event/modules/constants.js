export const EVENT_STATUS_PUBLISHED = 'published'
export const EVENT_STATUS_CLOASED = 'closed'
export const EVENT_STATUS_DRAFT = 'draft'
export const EVENT_STATUS_CANCELED = 'canceled'
export const EVENT_STATUS_UNDER_REVIEW = 'under-review'

export const EVENT_TYPE_PUBLIC = 'Public'
export const EVENT_TYPE_PRIVATE = 'Private'
export const EVENT_TYPE_SPECIAL = 'Special'

export const EVENT_LEVEL_FELLOWSHIP = 'Fellowship'
export const EVENT_LEVEL_CHURCH = 'Church'
export const EVENT_LEVEL_EXTERNAL = 'External'

export const EVENT_ACTION_ADD = "EVENT_ADD"

export const initialEventState = {
  selectedTabId: 'eventsGrid',
  grid: {
    results: [],
    filter: [],
  },
  details: {
    title: 'My Event',
    description: 'Hello World',
    hostingChurch: {
      id: -1,
      title: ''
    },
    location: {
      id: -1,
      street: '',
      city: '',
      state: '',
      postal: '',
      country: {
        code: -1,
        title: ''
      }
    },
    numberOfSeats: 0,
    titlePrice: 0.00,
    guestSpeakers: [],
    suppliers: [],
    contacts: [],
    status: EVENT_STATUS_DRAFT,
    type: EVENT_TYPE_PUBLIC,
    level: EVENT_LEVEL_CHURCH,
    images: [],
    notes: ''
  },
  lookupData: {
    hostingChurches: []
  }
}
