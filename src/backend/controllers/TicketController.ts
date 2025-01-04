import { Err, Ok, text } from "azle/experimental"
import { TicketStorage } from "../storage/storage";


class TicketController {
  static getTicket=(id: text)=>{
    try{
        const ticket = TicketStorage.get(id);
    return ticket ? Ok(ticket) : Err({NotFound:"Ticket not found"});
    }catch(error: any) {
        return Err({Error: `Error occured ${error.message}`})
    }
  }

  static getTickets=()=>{
    try{
       const Tickets = TicketStorage.values();
       if(Tickets.length == 0) {
        return Err({NotFound: "Empty"})
       }
       return Ok(Tickets)
    }catch(error: any) {
        return Err({Error: `Error occured ${error.message}`})
    }
  }

  static getTicketByFlightId=(flightId: text)=> {
    try{
        const tickets = TicketStorage.values();
    return Ok(tickets.filter((ticket) => ticket.flightId === flightId));
    }catch(error: any) {
        return Err({Error: `Error occured ${error.message}`})
    }
  }
}

export default TicketController