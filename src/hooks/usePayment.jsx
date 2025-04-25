import { useQuery } from "@tanstack/react-query";


const usePayment = () => {
  const { data: payment = [], refetch } = useQuery({
    queryKey: ['payment'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/payments');
      return res.json();
    }
  })

  return [payment, refetch]
}


export default usePayment;