import mongoose, {Schema, Document, Model} from "mongoose";

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
        trim: true
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

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export {User};