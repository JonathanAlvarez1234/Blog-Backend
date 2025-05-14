import { Schema, model } from "mongoose";

const PostSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    content: {
        type: String,
        required: [true, "The content is required"]
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
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

PostSchema.methods.toJSON = function () {
    const { _id, ...post } = this.toObject();
    post.uid = _id;
    return post;
};

export default model("Post", PostSchema);