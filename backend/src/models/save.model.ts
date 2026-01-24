import mongoose, { Schema, Model, Document} from "mongoose";

export interface ISave extends Document {
    blogID: mongoose.Types.ObjectId;
    userID: mongoose.Types.ObjectId;
}

const saveSchema = new Schema<ISave>({
    blogID :{
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true 
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

const Save: Model<ISave> = mongoose.models.Save || mongoose.model<ISave>("Save", saveSchema);

export {Save}