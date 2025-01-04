import { Err, ic, nat, Ok, text } from "azle/experimental";
import { v4 as uuidv4 } from "uuid";
import { ActivityPayload,  } from "../dataType/dataType";
import { ActivityStorage } from "../storage/storage";



class ActivityController {
    static addActivity=(payload:ActivityPayload)=>{
        try{
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

        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }
   
    static getActivities=()=>{
        try{
            const activities = ActivityStorage.values();
            if(activities.length == 0) {
                return Err({NotFound: 'Empty activity'})
            }
            return Ok(activities)
        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }

    static getActivity=(id: text)=>{

        try{
            const activity = ActivityStorage.get(id);
           return activity ? Ok(activity) : Err("Activity not found");
        }catch(error: any) {
            return Err({Error: `Error occure ${error.message}`})
        }
    }

    static getActivityParticipants=(id:text)=>{
        try{
            const activity = ActivityStorage.get(id);
            return Ok(activity ? activity.participants : []);
        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }

    static searchActivities=(location: text)=>{
        try{
            const activities = ActivityStorage.values();
            return Ok(activities.filter((activity) => activity.location === location.toLowerCase()));

        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }

    static searchActivitiesByPrice=(price: nat)=>{
        try{
            const activities = ActivityStorage.values();
            return Ok(activities.filter((activity) => activity.price <= price));

        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }


   
}

export default ActivityController