import { StableBTreeMap } from "azle";
import { text } from "azle/experimental";
import { Activity, Flight, Hotels, Ticket } from "../dataType/dataType";



const ActivityStorage = StableBTreeMap<text, Activity>(0);
const HotelsStorage = StableBTreeMap<text, Hotels>(1);
const FlightStorage = StableBTreeMap<text, Flight>(2);
const TicketStorage = StableBTreeMap<text, Ticket>(3);

export {
    ActivityStorage,
    HotelsStorage,
    FlightStorage,
    TicketStorage
}