export interface DogProfile {
  id:string;
  name:string;
  breed:string;
  age:number;
  sports:string[];
  training:string[];
  location:string;
  images:string[];
  bio:string;
  owner:{id:string;name:string;image:string};
}

export interface Message { id:string; senderId:string; content:string; timestamp:string; read:boolean }
export interface Chat { id:string; participants:string[]; lastMessage?:Message; unreadCount:number; isGroup:boolean }
export interface Community { id:string; name:string; description:string; image?:string }
