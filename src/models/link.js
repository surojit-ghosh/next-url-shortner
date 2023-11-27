import { Schema, model, models } from "mongoose";

const linkSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    clicks: [{
        country: String,
        city: String,
        timestamp: {
            type: Date,
            default: Date.now,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresOn: {
        type: Date,
    },
    isDeactivated: {
        type: Boolean,
        default: false,
    },
});

const linkModel = models?.Link || model("Link", linkSchema);

export default linkModel;