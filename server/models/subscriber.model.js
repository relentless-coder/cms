import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const subscriberSchema = new Schema({
    email: String,
    name: String,
    interests: Array
})

export default mongoose.model('Subscriber', subscriberSchema)