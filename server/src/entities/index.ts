import {Entity, ElementType, Embeddable, DiscriminatorValue, Field, Enumerated, Parent, Type} from "hydrate-mongodb";
import {ObjectID} from 'mongodb'

export abstract class Dimension {
    _id: ObjectID

    id: string

    title: string

    active: boolean

    constructor(id: string, title: string) {
        this.id = id
        this.title = title
        this.active = true
    }
}

@Embeddable()
@DiscriminatorValue("AddressState")
export class AddressState extends Dimension {

}
const addressStates = [
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

@Embeddable()
export class Address {

    _id: ObjectID

    id: string

    @Field()
    label: string

    @Field()
    street: string

    @Field()
    city: string

    @Field()
    state: AddressState

    @Field()
    postal: string

    @Field()
    country: string

    static getStates(): AddressState[] {
        return addressStates.map(val => new AddressState(val.id, val.title))
    }
}

@Entity()
export class Church {
    _id: ObjectID

    id: string

    @Field()
    title: string

    @Field()
    location: Address

    // @ElementType(Person)
    // contacts: Person[]
}

@Embeddable()
export class Role extends Dimension {

}

const roles = [
    {id: 'admin', title: 'Administrator'},
    {id: 'event-coordinator', title: 'Event Coordinator'},
    {id: 'attendee', title: 'Attendee'},
    {id: 'guest-speaker', title: 'Guest Speaker'},
    {id: 'supplier', title: 'Supplier'},
]

@Entity()
export class Person {

    _id: ObjectID

    id: string

    @Field()
    email: string

    @Field()
    title: string

    @Field()
    firstName: string

    @Field()
    middleInitial: string

    @Field()
    lastName: string

    @Field()
    suffix: string

    @Field()
    datOfBirth: Date

    @Type('Church')
    homeChurch: Church

    @Field()
    companyName: string

    @Field()
    homeAddess: Address

    @Field()
    contactMobile: string

    @Field()
    contactHomePhone: string

    @Field()
    disabilities: boolean

    @Field()
    bioImageUri: string

    @Enumerated(PeopleStatus)
    status: PeopleStatus

    @Field()
    role: Role;

    static getRoles = (): Role[] => roles.map(val => new Role(val.id, val.title))
}

@Embeddable()
@DiscriminatorValue("EventType")
export class EventType extends Dimension {

}

@Embeddable()
@DiscriminatorValue("EventStatus")
export class EventStatus extends Dimension {

}

@Embeddable()
@DiscriminatorValue("EventLevel")
export class EventLevel extends Dimension {

}

@Embeddable()
@DiscriminatorValue("GuestSpeakers")
export class GuestSpeakers extends Dimension {

}

@Embeddable()
@DiscriminatorValue("Suppliers")
export class Suppliers extends Dimension {

}




@Entity()
export class Event {

    _id: ObjectID

    id: string

    @Field()
    title: string

    @Field()
    hostingChurch: Church

    @Field()
    location: Address

    @Field()
    startDateTime: Date = new Date()

    @Field()
    endDateTime: Date = new Date()

    @Field()
    numberOfSeats: number = 0

    @Field()
    titlePrice: number = 0.0

    @ElementType(GuestSpeakers)
    guestSpeakers: GuestSpeakers[] = []

    @ElementType(Suppliers)
    suppliers: Suppliers[] = []

    @ElementType(Person)
    contacts: Person[] = []

    @ElementType(Person)
    attendees: Person[]

    @Field()
    notes: string

    @Field()
    eventType: EventType

    @Field()
    eventLevel: EventLevel

    @Field()
    eventStatus: EventStatus

    static getEventLevels(): EventLevel[] {
        return eventLevels.map(val => new EventLevel(val.id, val.title))
    }

    static getEventStatuses(): EventStatus[] {
        return status.map(val => new EventStatus(val.id, val.title))
    }

    static getEventTypes(): EventType[] {
        return eventTypes.map(val => new EventType(val.id, val.title))
    }
}

const eventTypes = [
    {id: 'public', title: "Public"},
    {id: 'private', title: "Private"},
    {id: 'special', title: "Special"},
]

const status = [
    {id: 'published', title: "Published"},
    {id: 'closed', title: "Closed"},
    {id: 'draft', title: "Draft"},
    {id: 'cancelled', title: "Cancelled"},
    {id: 'under-review', title: "Under Review"},
]

const eventLevels = [
    {id: "Fellowship", title: "Fellowship"},
    {id: "Church", title: "Church"},
    {id: "External", title: "External"}
]

export enum PeopleStatus {
    Active,
    Inactive,
    Barred,
    OptedOut,
}


@Embeddable()
export class EventPayment {
    _id: ObjectID

    id: string

    bookedEvent: BookedEvent

    amount: number = 0.0

    txDate: Date = new Date()

    method: string

    receivedBy: Person
}

@Entity()
export class BookedEvent {

    _id: ObjectID

    id: string

    @Field()
    attendee: Person

    @Field()
    event: Event

    @Field()
    creationData: Date = new Date()

    @Field()
    numberOfSeatsReserved: number = 0

    @ElementType(EventPayment)
    payments: EventPayment[]
}

