import mongoose from "mongoose";
import { compareValue, hashValue } from "../../utils/bcrypt";

export enum UserRole {
    USER="USER",
    ADMIN="ADMIN",
    MODERATOR="MODERATOR",
}

export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    Verified: boolean;
    Role:UserRole;
    createdAt: Date;
    updatedAt: Date;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    comparePassword(val: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        Verified: { type: Boolean, default: false,required:true },
        Role:{type:String,default:UserRole.USER,enum:Object.values(UserRole),required:true},
        resetPasswordToken: { type: String, select: false },
        resetPasswordExpires: { type: Date, select: false },
    },
    { timestamps: true }
);

userSchema.pre("save", async function () {
    if(!this.isModified("password")){
        return;
    }
    this.password=await hashValue(this.password);
});

userSchema.methods.comparePassword = async function (val: string) {
    return compareValue(val, this.password);
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;