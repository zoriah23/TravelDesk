import { Err, Ok, text } from "azle/experimental";
import { v4 as uuidv4 } from "uuid";
import { BookActivityPayload, BookHotelPayload, TicketPayload } from "../dataType/dataType";
import { ActivityStorage, FlightStorage, HotelsStorage, TicketStorage } from "../storage/storage";




class BookController  {
  
    static bookActivity=(payload:BookActivityPayload)=>{
        try{
            const activityOpt = ActivityStorage.get(payload.activityId);
            if (!activityOpt) {
              return Err("Activity not found");
            }
            const { activityId, numberOfPeople } = payload;
      
            const activity = activityOpt;
            activity.participants.push(payload.userName);
            ActivityStorage.insert(activityId, activity);
            return Ok([activity]);

        }catch(error: any) {
            return Err({Error:`Error occured ${error.message}`})
        }
    }

    static bookHotel=(payload:BookHotelPayload)=>{
        try{
            const hotelOpt = HotelsStorage.get(payload.hotelId);
            if (!hotelOpt) {
              return Err("Hotel not found");
            }
            const { hotelId, numberOfRooms } = payload;
            const hotel = hotelOpt;
            hotel.guests.push(payload.userName);
            HotelsStorage.insert(hotelId, hotel);
            return Ok(hotel);

        }catch(error: any) {
            return Err({Error:`Error occured ${error.message}`})
        }
    }
    
    static bookFlight=(payload:TicketPayload,id: text)=>{
        try{
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

        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }


}

export default BookController