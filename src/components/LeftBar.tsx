import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Error from "next/error";
import Loading from "./Loading";
import { env } from "~/env.mjs";


const LeftBar = () => {
  const randomNumberGen = () =>{
    return Math.floor((Math.random() * 10))
  }
  
  const getData = async () => {
    try {
      const res = await axios.get(
        'https://newsapi.org/v2/top-headlines?' +
        'sources=bbc-news&' +
        `apiKey=${env.NEXT_PUBLIC_API_KEY}`
      )
      return res.data

    } catch (error) {
      console.log(error)
    }
  }

  const {
    status,data:data
  } = useQuery({
    queryKey:["data"],
    queryFn:getData
  })

  if(status==='error') return <Error statusCode={404}/>
  if(status==='loading') return <Loading big={true}/>
  
  const randomNum = randomNumberGen()
  
  return (
    <div className="px-20">
      <p>
        {data.articles[randomNum].title}
      </p>
    </div>
  )
}

export default LeftBar