import { models, model, Schema, Model } from 'mongoose';

type IMovieModel = Model<IMovie>

const MovieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  }
}, {
  collection: "movies"
});

const MovieModel: IMovieModel = models?.Movie || model<IMovie>('Movie', MovieSchema);

export default MovieModel
