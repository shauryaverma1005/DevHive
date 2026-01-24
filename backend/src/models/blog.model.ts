import mongoose, {Schema, Document, Model} from "mongoose";

export interface IBlog extends Document {
    user: mongoose.Types.ObjectId;
    description: string;
    content: string;
    images?: string[];
    comments: mongoose.Types.ObjectId[];
}

const blogSchema = new Schema<IBlog>({
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    description: {
        type: String,
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true,      
    },
    images: [{
        type: String,
        default: []
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, {timestamps: true})

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export {Blog}