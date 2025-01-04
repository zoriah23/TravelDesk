import { nat, Record, text, Variant, Vec } from "azle/experimental";




export const Activity = Record({
    activityId: text,
    activityName: text,
    price: nat,
    location: text,
    duration: text,
    participants: Vec(text),
    reviews: Vec(text),
  });
  
  export type Activity = typeof Activity.tsType;
  
  export const ActivityPayload = Record({
    activityName: text,
    price: nat,
    location: text,
    duration: text,
  });
 export type ActivityPayload = typeof ActivityPayload.tsType;
  
  export const Hotels = Record({
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
  
  export type Hotels = typeof Hotels.tsType;
  
  export const HotelsPayload = Record({
    name: text,
    location: text,
    typeOfRoom: text,
    availableRooms: nat,
    amenities: text,
    price: nat,
    numberofRooms: nat,
    rating: nat,
  });
  
 export type HotelsPayload = typeof HotelsPayload.tsType;
  
 export const FlightClass = Variant({
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
  
  export type FlightClass = typeof FlightClass.tsType;
  
 export const Flight = Record({
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
  
 export type Flight = typeof Flight.tsType;
  
  export const FlightPayload = Record({
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
  
  export type FlightPayload = typeof FlightPayload.tsType;
  
  export const BookActivity = Record({
    activityId: text,
    userName: text,
    userPhoneNumber: text,
    numberOfPeople: nat,
  });
  
  export type BookActivity = typeof BookActivity.tsType;
  
 export const BookActivityPayload = Record({
    activityId: text,
    userName: text,
    userPhoneNumber: text,
    numberOfPeople: nat,
  });
  
  export type BookActivityPayload = typeof BookActivityPayload.tsType;
  
  const BookHotel = Record({
    hotelId: text,
    userName: text,
    numberOfRooms: nat,
    duration: nat,
    typeOfRoom: text,
  });
  
  export type BookHotel = typeof BookHotel.tsType;
  
  export const BookHotelPayload = Record({
    hotelId: text,
    userName: text,
    numberOfRooms: nat,
    duration: nat,
    typeOfRoom: text,
  });
  
  export type BookHotelPayload = typeof BookHotelPayload.tsType;
  
 export const Ticket = Record({
    ticketId: text,
    userName: text,
    flightId: text,
    flightClass: text,
    numberOfSeats: nat,
  });
  
 export type Ticket = typeof Ticket.tsType;
  
  export const TicketPayload = Record({
    userName: text,
    flightClass: text,
    numberOfSeats: nat,
  });
  
  export type TicketPayload = typeof TicketPayload.tsType;
  
  export const Reviews = Record({
    reviewId: text,
    userId: text,
    hotelId: text,
    flightId: text,
    activityId: text,
    review: text,
    rating: nat,
  });
  
   export type Reviews = typeof Reviews.tsType;
  
  export const ReviewsPayload = Record({
    userId: text,
    hotelId: text,
    flightId: text,
    activityId: text,
    review: text,
    rating: nat,
  });
  
  export type ReviewsPayload = typeof ReviewsPayload.tsType;
  
 export const Message = Variant({
    NotFound: text,
    Success: text,
    Error: text,
    NotAllowed: text,
  });
  
  export type Message = typeof Message.tsType;