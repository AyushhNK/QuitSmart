import mongoose from "mongoose";
import { compareValue, hashValue } from "../../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    Verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(val: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        Verified: { type: Boolean, default: false,required:true },
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