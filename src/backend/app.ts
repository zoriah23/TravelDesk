import { ProvisionalCreateCanisterWithCyclesArgs } from "azle/canisters/management";
import {
  query,
  update,
  text,
  Vec,
  Result,
  Canister,
  nat,
} from "azle/experimental";

import { Activity, ActivityPayload, BookActivityPayload, BookHotelPayload, Flight, FlightPayload, Hotels, HotelsPayload, Message, Ticket, TicketPayload } from "./dataType/dataType";
import ActivityController from "./controllers/ActivityController";
import { ActivityStorage } from "./storage/storage";
import HotelController from "./controllers/HotelController";
import FlightController from "./controllers/FlightController";
import BookController from "./controllers/BookController";
import TicketController from "./controllers/TicketController";






export default Canister({
  //add activity
  addActivity: update(
    [ActivityPayload],
    Result(Activity, Message),
    (payload) => {
      return ActivityController.addActivity(payload)
    }
  ),

  //get activities
  getActivities: query([], Result(Vec(Activity),Message), () => {
    return ActivityController.getActivities()
  }),

  //get activity
  getActivity: query([text], Result(Activity, Message), (id) => {
    return ActivityController.getActivity(id)
  }),

  getActivityParticipants: query([text],Result(Vec(text),Message), (id) => {
    return ActivityController.getActivityParticipants(id)
  }),

  //add hotel
  addHotel: update([HotelsPayload], Result(Vec(Hotels), Message), (payload) => {
    return HotelController.addHotel(payload)
  }),

  //get hotels
  getHotels: query([], Result(Vec(Hotels),Message), () => {
    return HotelController.getHotels()
  }),

  //get hotel
  getHotel: query([text], Result(Hotels, Message), (id) => {
   return HotelController.getHotel(id)
  }),

  //add flight
  addFlight: update([FlightPayload], Result(Flight, Message), (payload) => {
    return FlightController.addFlight(payload)
  }),

  //get flights
  getFlights: query([], Result(Vec(Flight),Message), () => {
    return FlightController.getFlights()
  }),

  //get flight
  getFlight: query([text], Result(Flight, Message), (id) => {
    return FlightController.getFlight(id)
  }),

  //get available flights
  getAvailableFlights: query([], Result(Vec(Flight),Message), () => {
    return FlightController.getAvailableFlights()
  }),

  //book activity
  bookActivity: update(
    [BookActivityPayload],
    Result(Activity, Message),
    (payload) => {
      return BookController.bookActivity(payload)
    }
  ),

  //book hotel
  bookHotel: update(
    [BookHotelPayload],
    Result(Hotels, Message),
    (payload) => {
     return BookController.bookHotel(payload)
    }
  ),
  

  //book flight
  bookFlight: update(
    [TicketPayload, text],
    Result(text, Message),
    (payload, id) => {
     return BookController.bookFlight(payload, id)
    }
  ),

  //get ticket
  getTicket: query([text], Result(Ticket, Message), (id) => {
    return TicketController.getTicket(id)
  }),

  //get tickets
  getTickets: query([], Result(Vec(Ticket),Message), () => {
    return TicketController.getTickets()
  }),

  //get ticket by flightid
  getTicketByFlightId: query([text], Result(Vec(Ticket),Message), (flightId) => {
    return TicketController.getTicketByFlightId(flightId)
  }),

  //search for flights based on destination
  searchFlights: query([text], Result(Vec(Flight),Message), (destination) => {
    return FlightController.searchFlights(destination)
  }),

  //search for hotels based on location
  searchHotels: query([text], Result(Vec(Hotels),Message), (location) => {
    return HotelController.searchHotels(location)
  }),

  //search for activities based on location
  searchActivities: query([text], Result(Vec(Activity),Message), (location) => {
    return ActivityController.searchActivities(location)
  }),

  //search for activities based on price
  searchActivitiesByPrice: query([nat], Vec(Activity), (price) => {
    const activities = ActivityStorage.values();
    return activities.filter((activity) => activity.price <= price);
  }),

  //search for hotels based on price
  searchHotelsByPrice: query([nat], Result(Vec(Hotels),Message), (price) => {
    return ActivityController.searchActivitiesByPrice(price)
  }),

  //search for flights based on price
  searchFlightsByPrice: query([nat], Result(Vec(Flight),Message), (price) => {
   return FlightController.searchFlightsByPrice(price)
  }),
});
