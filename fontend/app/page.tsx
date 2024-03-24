import HomePage from "./Home/page"
import Marquee from "./Marquee/Marquee"
import Numbers from "./Number/Number"
import Environment from "./Environment/Environment"
import Accelerate from "./Accelerate/Accelerate"

import Extension from "@/app/Extension/Extension"
import Comments from "./Comments/Comments"
import Future from "./Future/Future"
import Footer from "./Footer/Footer"
import NavBar from "./NavBar"
import Banner from "./util/Banner"

export default function Home(){ 
  return (
    <>
      <NavBar/>
      <Banner/>
      <HomePage/>
      <Marquee/>
      <Numbers/>
      <Environment/>
      <Accelerate/>
      <Extension/>
      <Comments/>
      <Future/>
      <Footer/>

    </>
  )
}