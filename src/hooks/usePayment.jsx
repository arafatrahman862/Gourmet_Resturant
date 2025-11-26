import { useQuery } from "@tanstack/react-query";


const usePayment = () => {
  const { data: payment = [], refetch } = useQuery({
    queryKey: ['payment'],
    queryFn: async () => {
      const res = await fetch('https://gourmet-resturant-server-side.vercel.app/payments');
      return res.json();
    }
  })

  return [payment, refetch]
}


export default usePayment;