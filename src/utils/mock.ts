const id = () => `V1StGXR8_Z5jdHi6B-myT__${Math.random()}`

export const movies = (): IMovie[] =>
  Array(10)
    .fill(null)
    .map((_, i) => ({
      id: id(),
      image: `https://placeimg.com/1080/1920/any?random=${i}`,
      title: `${i} Movie Title`,
    }))
