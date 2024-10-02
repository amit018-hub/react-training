export interface IUser{
    sno:number,
    name:string,
    age:number,
    gender:string,
    address:{
        street:string,
        city:string,
        localarea:string,
        zip:string,
    }
}