import { Message } from "@/model/User";
export interface ApiResponse{
    Success:boolean;
    message:string;
    isAcccesptingMessage?:boolean;
    messages?:Array<Message>;
}