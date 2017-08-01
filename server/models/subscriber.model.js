import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const subscriberSchema = new Schema({
    email: String,
    name: String
})

export default mongoose.model('Subscriber', subscriberSchema)