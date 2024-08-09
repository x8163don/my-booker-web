import Navbar from "../../components/home/navbar";
import Hero from "../../components/home/hero";
import Demo from "../../components/home/demo";
import Feature from "../../components/home/feature";
import Price from "../../components/home/price";
import FAQ from "../../components/home/faq";

export default function Home() {
    return <main>
        <Navbar/>
        <Hero/>
        <Demo/>
        <Feature/>
        <Price/>
        <FAQ/>
    </main>
}