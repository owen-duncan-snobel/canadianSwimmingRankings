// import  useSWR, { Fetcher } from 'swr'

// const fetcher: Fetcher<User> = (key: string) => fetch(key, {
//   // headers, etc can go here
// })
//   .then((res) => res.json())

// export function useUser (id: string) {
//   const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher)
//   return {
//     user: data,
//     isLoading,
//     isError: error
//   }
// }