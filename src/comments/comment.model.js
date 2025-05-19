import { Schema, model } from "mongoose";

const CommentSchema = Schema({
    visitorName: {
        type: String,
        default: "Anonymous"
    },
    content: {
        type: String,
        required: [true, "The content is required"]
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Comment", CommentSchema);