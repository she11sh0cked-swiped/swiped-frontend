const id = (i: number) => `V1StGXR${i}_Z5jdHi6B-myT`

export const movies = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: id(i),
    image: `https://source.unsplash.com/random?random=${i}`,
    title: 'Movie Title',
  }))
