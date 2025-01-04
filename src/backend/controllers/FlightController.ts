import { Err, nat, Ok, text } from "azle/experimental";
import { FlightPayload } from "../dataType/dataType"
import { FlightStorage } from "../storage/storage";
import { v4 as uuidv4 } from "uuid";


class FlightController {
   
    static  addFlight=(payload:FlightPayload)=>{
        try{
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
        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }

    static getFlights=()=>{
        try{
            const Flights = FlightStorage.values();
            if(Flights.length == 0) {
                return Err({NotFound: "Empty"})
            }
            return Ok(Flights)
        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }

    static getFlight=(id:text)=>{
        try{
            const flight = FlightStorage.get(id);
    return flight ? Ok(flight) : Err({NotFound:"Flight not found"});

        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }
    
    static getAvailableFlights=()=> {
        try{
            const flights = FlightStorage.values();
    return Ok(flights.filter((flight) => flight.totalSeats > 0));
        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }

    static searchFlights=(destination: text)=>{
        try{
            const flights = FlightStorage.values();
    return Ok(flights.filter((flight) => flight.destination === destination.toLowerCase()));

        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }

    static searchFlightsByPrice=(price: nat)=>{
        try{
            const flights = FlightStorage.values();
            return Ok(flights.filter((flight) => flight.basePrice <= price));

        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }
}

export default FlightController