import mongoose, {Schema, Document, Model} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;

    refreshToken?: string | null;
    avatar?: string | null;
    avatarPublicId?: string | null;

    comments?: mongoose.Types.ObjectId[];
    blogs?: mongoose.Types.ObjectId[];
    saved?: mongoose.Types.ObjectId[];

    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        select: false
    },
    refreshToken: {
        type:String,
        default: null
    },
    avatar: {
        type: String,
        default: null
    },
    avatarPublicId: {
        type: String,
        default: null
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    blogs: [{
        type: Schema.Types.ObjectId,
        ref:"Blog"
    }],
    saved: [{
        type: Schema.Types.ObjectId,
        ref:"Save"
    }]
},{timestamps: true})

userSchema.pre("save", async function(){
    if(!this.isModified("password")){ return}
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){
    const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
    const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
    
    if(!accessTokenKey || !accessTokenExpiry){
        throw new Error(`Access token enviroment variables are missing`);
    }
    
    return jwt.sign(
        {
            _id: this._id
        },
        accessTokenKey,
        {
            expiresIn: accessTokenExpiry,
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    const refreshTokenKey: string | undefined = process.env.REFRESH_TOKEN_KEY;
    const refreshTokenExpiry: string | undefined = process.env.REFRESH_TOKEN_EXPIRY;

    if(!refreshTokenExpiry || !refreshTokenKey){
        throw new Error(`Refresh Token enviroment variables are not present`);
    }
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
            refreshTokenKey,
        {
            expiresIn: refreshTokenExpiry
        }
    );
}

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export {User};