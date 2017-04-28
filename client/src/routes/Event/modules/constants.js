export const EVENT_STATUS_PUBLISHED = 'published'
export const EVENT_STATUS_CLOSED = 'closed'
export const EVENT_STATUS_DRAFT = 'draft'
export const EVENT_STATUS_CANCELLED = 'cancelled'
export const EVENT_STATUS_UNDER_REVIEW = 'under-review'

export const EVENT_TYPE_PUBLIC = 'public'
export const EVENT_TYPE_PRIVATE = 'private'
export const EVENT_TYPE_SPECIAL = 'special'

export const EVENT_LEVEL_FELLOWSHIP = 'Fellowship'
export const EVENT_LEVEL_CHURCH = 'Church'
export const EVENT_LEVEL_EXTERNAL = 'External'

export const EVENT_ACTION_ADD = "EVENT_ADD"
export const EVENT_SET_LOOKUP_DATA = "EVENT_SET_LOOKUP_DATA"
export const EVENT_VALIDATE_AND_SAVE = "@cltf/event_validate_and_save"
export const EVENT_SHOW_LANDING_PAGE = '@cltf/LANDING_PAGE';
export const EVENT_DETAIL_SHOW = '@cltf/EVENT_DETAIL_SHOW'
export const EVENT_SHOW_EVENT_ATTENDEES = '@cltf/EVENT_SHOW_EVENT_ATTENDEES'
export const EVENT_INITIAL_DETAILS_STATE = '@cltf/EVENT_INITIAL_DETAILS_STATE'

export const attendeeBooking = {
  eventId: '',
  attendeeId: '',
  ticketPurchased: 0,
  bookingDate: new Date(),
  status: {},
  payments: [],
}

export const initialEventState = {
  selectedTabId: 'eventsGrid',
  grid: {
    results: [],
    filter: [],
  },
  details: {
    _id: -1,
    title: '',
    slug: '',
    description: '',
    hostingChurch: {},
    location: [{
      id: -1,
      label: '',
      street: '',
      city: '',
      state: null,
      postal: '',
      country: "US"
    }],
    startDateTime: new Date(),
    endDateTime: new Date(),
    numberOfSeats: 0,
    ticketPrice: 0.00,
    guestSpeakers: [],
    suppliers: [],
    contacts: [],
    eventStatus: {
      "_id": "58f3ca21eec769c87745d162",
      "id": "draft",
      "title": "Draft"
    },
    eventType: {
      "_id": "58f264fdcda9e68fc6e82fd4",
      "id": "public",
      "title": "Public"
    },
    eventLevel: {
      "_id": "58f264fdcda9e68fc6e82fd2",
      "id": "Church",
      "title": "Church"
    },
    images: [],
    notes: '',
  },
  attendees: {data: []},
  lookupData: {
    hostingChurches: [],
    guestSpeakers: [],
    statuses: [],
    types: [],
    levels: [],
    states: [
      {
        title: "Alabama",
        id: "AL"
      },
      {
        title: "Alaska",
        id: "AK"
      },
      {
        title: "American Samoa",
        id: "AS"
      },
      {
        title: "Arizona",
        id: "AZ"
      },
      {
        title: "Arkansas",
        id: "AR"
      },
      {
        title: "California",
        id: "CA"
      },
      {
        title: "Colorado",
        id: "CO"
      },
      {
        title: "Connecticut",
        id: "CT"
      },
      {
        title: "Delaware",
        id: "DE"
      },
      {
        title: "District Of Columbia",
        id: "DC"
      },
      {
        title: "Federated States Of Micronesia",
        id: "FM"
      },
      {
        title: "Florida",
        id: "FL"
      },
      {
        title: "Georgia",
        id: "GA"
      },
      {
        title: "Guam",
        id: "GU"
      },
      {
        title: "Hawaii",
        id: "HI"
      },
      {
        title: "Idaho",
        id: "ID"
      },
      {
        title: "Illinois",
        id: "IL"
      },
      {
        title: "Indiana",
        id: "IN"
      },
      {
        title: "Iowa",
        id: "IA"
      },
      {
        title: "Kansas",
        id: "KS"
      },
      {
        title: "Kentucky",
        id: "KY"
      },
      {
        title: "Louisiana",
        id: "LA"
      },
      {
        title: "Maine",
        id: "ME"
      },
      {
        title: "Marshall Islands",
        id: "MH"
      },
      {
        title: "Maryland",
        id: "MD"
      },
      {
        title: "Massachusetts",
        id: "MA"
      },
      {
        title: "Michigan",
        id: "MI"
      },
      {
        title: "Minnesota",
        id: "MN"
      },
      {
        title: "Mississippi",
        id: "MS"
      },
      {
        title: "Missouri",
        id: "MO"
      },
      {
        title: "Montana",
        id: "MT"
      },
      {
        title: "Nebraska",
        id: "NE"
      },
      {
        title: "Nevada",
        id: "NV"
      },
      {
        title: "New Hampshire",
        id: "NH"
      },
      {
        title: "New Jersey",
        id: "NJ"
      },
      {
        title: "New Mexico",
        id: "NM"
      },
      {
        title: "New York",
        id: "NY"
      },
      {
        title: "North Carolina",
        id: "NC"
      },
      {
        title: "North Dakota",
        id: "ND"
      },
      {
        title: "Northern Mariana Islands",
        id: "MP"
      },
      {
        title: "Ohio",
        id: "OH"
      },
      {
        title: "Oklahoma",
        id: "OK"
      },
      {
        title: "Oregon",
        id: "OR"
      },
      {
        title: "Palau",
        id: "PW"
      },
      {
        title: "Pennsylvania",
        id: "PA"
      },
      {
        title: "Puerto Rico",
        id: "PR"
      },
      {
        title: "Rhode Island",
        id: "RI"
      },
      {
        title: "South Carolina",
        id: "SC"
      },
      {
        title: "South Dakota",
        id: "SD"
      },
      {
        title: "Tennessee",
        id: "TN"
      },
      {
        title: "Texas",
        id: "TX"
      },
      {
        title: "Utah",
        id: "UT"
      },
      {
        title: "Vermont",
        id: "VT"
      },
      {
        title: "Virgin Islands",
        id: "VI"
      },
      {
        title: "Virginia",
        id: "VA"
      },
      {
        title: "Washington",
        id: "WA"
      },
      {
        title: "West Virginia",
        id: "WV"
      },
      {
        title: "Wisconsin",
        id: "WI"
      },
      {
        title: "Wyoming",
        id: "WY"
      }
    ]
  }
}

