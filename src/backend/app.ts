import { ProvisionalCreateCanisterWithCyclesArgs } from "azle/canisters/management";
import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Variant,
  Vec,
  Ok,
  Err,
  ic,
  Principal,
  Opt,
  nat64,
  Result,
  blob,
  bool,
  Canister,
  init,
  Void,
  nat,
  Some,
  None,
  // Duration
} from "azle/experimental";
import { v4 as uuidv4 } from "uuid";

const Activity = Record({
  activityId: text,
  activityName: text,
  price: nat,
  location: text,
  duration: text,
  participants: Vec(text),
  reviews: Vec(text),
});

type Activity = typeof Activity.tsType;

const ActivityPayload = Record({
  activityName: text,
  price: nat,
  location: text,
  duration: text,
});
type ActivityPayload = typeof ActivityPayload.tsType;

const Hotels = Record({
  hotelId: text,
  name: text,
  location: text,
  typeOfRoom: text, //
  availableRooms: nat, //
  amenities: text, //
  price: nat,
  numberofRooms: nat,
  rating: nat,
  guests: Vec(text),
  reviews: Vec(text),
});

type Hotels = typeof Hotels.tsType;

const HotelsPayload = Record({
  name: text,
  location: text,
  typeOfRoom: text,
  availableRooms: nat,
  amenities: text,
  price: nat,
  numberofRooms: nat,
  rating: nat,
});

type HotelsPayload = typeof HotelsPayload.tsType;

const FlightClass = Variant({
  Economy: Record({
    price: nat, // price multiplier
    availableSeats: nat, // number of available seats
  }),
  Business: Record({
    price: nat,
    availableSeats: nat,
  }),
  First: Record({
    price: nat,
    availableSeats: nat,
  }),
});

type FlightClass = typeof FlightClass.tsType;

const Flight = Record({
  flightId: text,
  airline: text,
  flightType: text, // one way or round trip OR iNTERnational or domestic
  typeOfPlane: text, // type of plane
  departure: text, // departure city
  destination: text, // destination city
  departureTime: text,
  arrivalTime: text,
  rating: nat,
  totalSeats: nat, // total number of seats
  basePrice: nat, // base price for economy class
  flightClass: Vec(FlightClass),
  tickets: Vec(text),
});

type Flight = typeof Flight.tsType;

const FlightPayload = Record({
  airline: text,
  flightType: text,
  typeOfPlane: text,
  departure: text,
  destination: text,
  departureTime: text,
  arrivalTime: text,
  rating: nat,
  totalSeats: nat,
  basePrice: nat, // base price for economy class
  flightClass: Vec(FlightClass),
});

type FlightPayload = typeof FlightPayload.tsType;

const BookActivity = Record({
  activityId: text,
  userName: text,
  userPhoneNumber: text,
  numberOfPeople: nat,
});

type BookActivity = typeof BookActivity.tsType;

const BookActivityPayload = Record({
  activityId: text,
  userName: text,
  userPhoneNumber: text,
  numberOfPeople: nat,
});

type BookActivityPayload = typeof BookActivityPayload.tsType;

const BookHotel = Record({
  hotelId: text,
  userName: text,
  numberOfRooms: nat,
  duration: nat,
  typeOfRoom: text,
});

type BookHotel = typeof BookHotel.tsType;

const BookHotelPayload = Record({
  hotelId: text,
  userName: text,
  numberOfRooms: nat,
  duration: nat,
  typeOfRoom: text,
});

type BookHotelPayload = typeof BookHotelPayload.tsType;

const Ticket = Record({
  ticketId: text,
  userName: text,
  flightId: text,
  flightClass: text,
  numberOfSeats: nat,
});

type Ticket = typeof Ticket.tsType;

const TicketPayload = Record({
  userName: text,
  flightClass: text,
  numberOfSeats: nat,
});

type TicketPayload = typeof TicketPayload.tsType;

const Reviews = Record({
  reviewId: text,
  userId: text,
  hotelId: text,
  flightId: text,
  activityId: text,
  review: text,
  rating: nat,
});

type Reviews = typeof Reviews.tsType;

const ReviewsPayload = Record({
  userId: text,
  hotelId: text,
  flightId: text,
  activityId: text,
  review: text,
  rating: nat,
});

type ReviewsPayload = typeof ReviewsPayload.tsType;

const Message = Variant({
  NotFound: text,
  Success: text,
  Error: text,
  NotAllowed: text,
});

type Message = typeof Message.tsType;

const ActivityStorage = StableBTreeMap<text, Activity>(0);
const HotelsStorage = StableBTreeMap<text, Hotels>(1);
const FlightStorage = StableBTreeMap<text, Flight>(2);
const TicketStorage = StableBTreeMap<text, Ticket>(3);

export default Canister({
  //add activity
  addActivity: update(
    [ActivityPayload],
    Result(Activity, Message),
    (payload) => {
      const activityId = uuidv4();
      const timestamp = ic.time();
      const activity = {
        activityId,
        timestamp,
        participants: [],
        reviews: [],
        ...payload,
      };
      ActivityStorage.insert(activityId, activity);
      return Ok(activity);
    }
  ),

  //get activities
  getActivities: query([], Vec(Activity), () => {
    return ActivityStorage.values();
  }),

  //get activity
  getActivity: query([text], Result(Activity, Message), (id) => {
    const activity = ActivityStorage.get(id);
    return activity ? Ok(activity) : Err("Activity not found");
  }),

  getActivityParticipants: query([text], Vec(text), (id) => {
    const activity = ActivityStorage.get(id);
    return activity ? activity.participants : [];
  }),

  //add hotel
  addHotel: update([HotelsPayload], Result(Vec(Hotels), Message), (payload) => {
    const hotelId = uuidv4();
    const hotel = { hotelId, guests: [], reviews: [], ...payload };
    HotelsStorage.insert(hotelId, hotel);
    return Ok([hotel]);
  }),

  //get hotels
  getHotels: query([], Vec(Hotels), () => {
    return HotelsStorage.values();
  }),

  //get hotel
  getHotel: query([text], Result(Hotels, Message), (id) => {
    const hotel = HotelsStorage.get(id);
    return hotel ? Ok(hotel) : Err("Hotel not found");
  }),

  //add flight
  addFlight: update([FlightPayload], Result(Flight, Message), (payload) => {
    const totalSeats = payload.totalSeats;
    payload.flightClass.map((flight) => {
      if (flight.Economy) {
        flight.Economy.availableSeats = totalSeats / BigInt(2);
      }
      if (flight.Business) {
        flight.Business.availableSeats = totalSeats / BigInt(4);
      }
      if (flight.First) {
        flight.First.availableSeats = totalSeats / BigInt(5);
      }
    });

    payload.flightClass.map((flight) => {
      if (flight.Economy) {
        flight.Economy.price = payload.basePrice * flight.Economy.price;
      }
      if (flight.Business) {
        flight.Business.price = payload.basePrice * flight.Business.price;
      }
      if (flight.First) {
        flight.First.price = payload.basePrice * flight.First.price;
      }
    });
    const flightId = uuidv4();
    const flight = { flightId, tickets: [], ...payload };
    FlightStorage.insert(flightId, flight);
    return Ok(flight);
  }),

  //get flights
  getFlights: query([], Vec(Flight), () => {
    return FlightStorage.values();
  }),

  //get flight
  getFlight: query([text], Result(Flight, Message), (id) => {
    const flight = FlightStorage.get(id);
    return flight ? Ok(flight) : Err("Flight not found");
  }),

  //get available flights
  getAvailableFlights: query([], Vec(Flight), () => {
    const flights = FlightStorage.values();
    return flights.filter((flight) => flight.totalSeats > 0);
  }),

  //book activity
  bookActivity: update(
    [BookActivityPayload],
    Result(Activity, Message),
    (payload) => {
      const activityOpt = ActivityStorage.get(payload.activityId);
      if (!activityOpt) {
        return Err("Activity not found");
      }
      const { activityId, numberOfPeople } = payload;

      const activity = activityOpt;
      activity.participants.push(payload.userName);
      ActivityStorage.insert(activityId, activity);
      return Ok([activity]);
    }
  ),

  //book hotel
  bookHotel: update(
    [BookHotelPayload],
    Result(Hotels, Message),
    (payload) => {
      const hotelOpt = HotelsStorage.get(payload.hotelId);
      if (!hotelOpt) {
        return Err("Hotel not found");
      }
      const { hotelId, numberOfRooms } = payload;
      const hotel = hotelOpt;
      hotel.guests.push(payload.userName);
      HotelsStorage.insert(hotelId, hotel);
      return Ok(hotel);
    }
  ),
  

  //book flight
  bookFlight: update(
    [TicketPayload, text],
    Result(text, Message),
    (payload, id) => {
      const flight = FlightStorage.get(id);
      if (!flight) {
        return Err("Flight not found");
      }
      const { flightClass, numberOfSeats } = payload;
      if (flightClass === "Economy") {
        flight.flightClass.map((flight) => {
          if (flight.Economy) {
            flight.Economy.availableSeats -= numberOfSeats;
          }
        });
      }
      if (flightClass === "Business") {
        flight.flightClass.map((flight) => {
          if (flight.Business) {
            flight.Business.availableSeats -= numberOfSeats;
          }
        });
      }
      if (flightClass === "First") {
        flight.flightClass.map((flight) => {
          if (flight.First) {
            flight.First.availableSeats -= numberOfSeats;
          }
        });
      }
      if (flight.totalSeats < numberOfSeats) {
        return Err("Not enough seats available");
      }

      flight.totalSeats -= numberOfSeats;

      const ticketId = uuidv4();
      const ticket = { ticketId, ...payload, flightId: id };
      TicketStorage.insert(ticketId, ticket);
      flight.tickets.push(ticket.ticketId);
      FlightStorage.insert(id, flight);
      return Ok(ticketId);
    }
  ),

  //get ticket
  getTicket: query([text], Result(Ticket, Message), (id) => {
    const ticket = TicketStorage.get(id);
    return ticket ? Ok(ticket) : Err("Ticket not found");
  }),

  //get tickets
  getTickets: query([], Vec(Ticket), () => {
    return TicketStorage.values();
  }),

  //get ticket by flightid
  getTicketByFlightId: query([text], Vec(Ticket), (flightId) => {
    const tickets = TicketStorage.values();
    return tickets.filter((ticket) => ticket.flightId === flightId);
  }),

  //search for flights based on destination
  searchFlights: query([text], Vec(Flight), (destination) => {
    const flights = FlightStorage.values();
    return flights.filter((flight) => flight.destination === destination.toLowerCase());
  }),

  //search for hotels based on location
  searchHotels: query([text], Vec(Hotels), (location) => {
    const hotels = HotelsStorage.values();
    return hotels.filter((hotel) => hotel.location === location);
  }),

  //search for activities based on location
  searchActivities: query([text], Vec(Activity), (location) => {
    const activities = ActivityStorage.values();
    return activities.filter((activity) => activity.location === location.toLowerCase());
  }),

  //search for activities based on price
  searchActivitiesByPrice: query([nat], Vec(Activity), (price) => {
    const activities = ActivityStorage.values();
    return activities.filter((activity) => activity.price <= price);
  }),

  //search for hotels based on price
  searchHotelsByPrice: query([nat], Vec(Hotels), (price) => {
    const hotels = HotelsStorage.values();
    return hotels.filter((hotel) => hotel.price <= price);
  }),

  //search for flights based on price
  searchFlightsByPrice: query([nat], Vec(Flight), (price) => {
    const flights = FlightStorage.values();
    return flights.filter((flight) => flight.basePrice <= price);
  }),
});
