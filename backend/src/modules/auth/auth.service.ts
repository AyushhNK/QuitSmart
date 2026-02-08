
type CreateAccountParams={
    username:string,
    email:string,
    password:string,
}
export const createAccount=async(data:CreateAccountParams)=>{