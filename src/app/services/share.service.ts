import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface User{
  userName:string,
  phone:string,
  email:string,
  password:string,
}
@Injectable({
  providedIn: 'root'
})
export class ShareService {
users:User[]=[];

team:any[]=[
  {
    id:1,
    name:'ahmed yasser',
    des:'front-end developer using angular and ionic for mobile app',
    img:'assets/imgs/team1.jpg',
    phone:'01014567381'
  },
  {
    id:2,
    name:'ali mohamed',
    des:'front-end developer using react and react native for mobile app',
    img:'assets/imgs/team3.jpg',
    phone:'01014567381'
  },
  {
    id:3,
    name:'yasser saad',
    des:'full stack developer using angular and ionic for mobile app',
    img:'assets/imgs/team4.jpg',
    phone:'01014567381'
  },
  {
    id:4,
    name:'kareem mohamed',
    des:'full stack developer using angular and ionic for mobile app',
    img:'assets/imgs/team2.jpg',
    phone:'01014567381'
  },
]
  constructor(private http:HttpClient) { }

  

  ourTeam(){
    return this.team
  }
  addUser(user:User){
    this.users.push(user)
      }
    
      validateUser(email:string,password:string):boolean{
        return this.users.some(u =>u.email===email && u.password===password);
      }
    
      getallusers(){
        return this.users;
      }

      // products

      getpro(){
        return this.http.get('https://fakestoreapi.com/products');
      }

      getOneProduct(id:any){
        return this.http.get(`https://fakestoreapi.com/products/${id}`);
      }
}
