import { Message } from "@/model/User";
export interface ApiResponse{
    Success:boolean;
    message:string;
    isAcceptingMessage?:boolean;
    messages?:Array<Message>;
}