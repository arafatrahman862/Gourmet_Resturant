import { useQuery } from "@tanstack/react-query";


const useMenu = () => {
  const { data: menu = [], refetch } = useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      const res = await fetch('https://gourmet-resturant-server-side.vercel.app/menu');
      return res.json();
    }
  })

  return [menu, refetch]
}


export default useMenu;