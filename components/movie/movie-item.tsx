

type IProps = {
  movie: IMovie
}

export const MovieItem = ({ movie }: IProps) => {

  return (
    <section className="flex flex-wrap sm:flex-nowrap justify-between mb-1 sm:mb-3 md:mb-6 lg:mb-8 gap-1 sm:gap-3 md:gap-6 lg:gap-12">
      <div className="aspect-video w-full sm:w-80 sm:grow-0 sm:shrink-0 sm:basis-80 bg-black">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${movie.code}`}
          frameBorder="0"
          allow="accelerometer; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={movie.title}
        />
      </div>
      <article className="flex-1 min-w-0">
        <h2 className="text-red-600 font-bold text-lg">{movie.title}</h2>
        <p>Shared by: {movie.user_email}</p>
        <p className="font-bold">Description:</p>
        <p className="line-clamp-5 break-words text-sm whitespace-pre-wrap">{movie.description}</p>
      </article>
    </section>
  )
}
