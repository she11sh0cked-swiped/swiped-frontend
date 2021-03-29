const id = (i: number) => `V1StGXR${i}_Z5jdHi6B-myT`

interface IMovie {
  id: string
  image: string
  title: string
}

export const movies = (): IMovie[] =>
  Array(10)
    .fill(null)
    .map((_, i) => ({
      id: id(i),
      image: `https://placeimg.com/1080/1920/any?random=${i}`,
      title: `${i} Movie Title`,
    }))
