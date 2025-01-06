import Header from "../../components/Header/Header";
import DecorSection from "../../components/home/hero";
import Banner from "../../components/home/banner";
import ProductsHome from "../../components/home/productsHome";
import HomeDecorSection from "../../components/home/homeService";
import BestServiceSection from "../../components/home/bestServiceSection";
import Artlicle from "../../components/home/artlicle";
import Footer from "../../components/Footer/footer";
import Navigation from "../../components/Header/Navigation";
import Brandslogo from "../../components/home/brands";


export default function Home() {
  return (
    <div>
        <Header />   
        <Banner />
        <DecorSection /> 
        <Brandslogo />
        <ProductsHome />
        <HomeDecorSection />
        <BestServiceSection />
        <Artlicle />
        <Footer />
        <div className="block lg:hidden overflow-hidden">
            <Navigation />
        </div>
    </div>
  )
}
