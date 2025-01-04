import { Err, Ok, text } from "azle/experimental"
import { HotelsPayload } from "../dataType/dataType";
import { v4 as uuidv4 } from "uuid";
import { HotelsStorage } from "../storage/storage";


class HotelController {
    static addHotel=(payload:HotelsPayload)=>{
        try{
            const hotelId = uuidv4();
            const hotel = { hotelId, guests: [], reviews: [], ...payload };
            HotelsStorage.insert(hotelId, hotel);
            return Ok([hotel]);
        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }

    static  getHotels=()=>{
        try{

            const Hotels = HotelsStorage.values();
            if(Hotels.length == 0) {
                return Err({NotFound: "Empty"})
            }
            return Ok(Hotels)
        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }

    static getHotel=(id:text)=>{
        try{
            const hotel = HotelsStorage.get(id);
            return hotel ? Ok(hotel) : Err({NotFound:"Hotel not found"});
        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }

    static searchHotels=(location: text)=>{
        try{
            const hotels = HotelsStorage.values();
            return Ok(hotels.filter((hotel) => hotel.location === location));

        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }

}

export default HotelController