import mongoose,{Schema, Document, Model} from "mongoose";

export interface IComment extends Document{
    userID: mongoose.Types.ObjectId;
    blogID: mongoose.Types.ObjectId;
    comment: string;
}

const commentSchema = new Schema<IComment>({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blogID: {
        type: Schema.Types.ObjectId,
        ref:"Blog",
        required: true,
    },
    comment: {
        type: String,
        required: true
    }
});

const Comment: Model<IComment> = mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export { Comment }