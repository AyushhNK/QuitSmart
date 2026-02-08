import bcrypt from 'bcrypt';
export const hashValue=(key:string,saltrounds?:number)=>
    bcrypt.hash(key,saltrounds || 10);

export const compareValue=(key:string,hash:string)=>    bcrypt.compare(key,hash).catch(()=>false);