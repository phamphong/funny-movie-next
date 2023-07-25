import _mongoose, { connect } from 'mongoose';
import mongoose from 'mongoose';

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect(uri?: string) {

  const { MONGODB_URI } = process.env;

  let uriConnection = uri ?? MONGODB_URI;

  if (!uriConnection) throw new Error('MONGODB_URI not defined');

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${uriConnection}`).then(mongoose => mongoose)
  }

  cached.conn = await cached.promise;
  return cached.conn
}

export default dbConnect;
