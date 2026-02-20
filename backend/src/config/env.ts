
const getenv=(key:string,defaultValue?:string)=>{
    const value=process.env[key];
    if(value===undefined){
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
}

export const PORT=getenv('PORT','4004');
export const MONGO_URI=getenv('MONGO_URI');
export const JWT_SECRET=getenv('JWT_SECRET');
export const JWT_REFRESH_SECRET=getenv('JWT_REFRESH_SECRET');
export const GOOGLE_CLIENT_ID=getenv('GOOGLE_CLIENT_ID');
export const GOOGLE_CLIENT_SECRET=getenv('GOOGLE_CLIENT_SECRET');
export const NODE_ENV=getenv('NODE_ENV','development');