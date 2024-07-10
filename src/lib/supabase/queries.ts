'use server'

import db from "./db"
import { Subscription } from "./supabase.types"

export const getUserSubscriptionStatus=async(userId:string)=>{
    try{
        const data =db.query.subscriptions.findFirst({
            where:(sub,{eq})=>{return eq(sub.userId,userId)}
        })
        if(data){
            return {data:data,error:null}
        }
        else{
            return {data:null,error:null}
        }
    }catch(error){
        return {data:null,error:`error ${error}`}
    }
}