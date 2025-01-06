import Candleholders from "../../components/CandleHolders/Candleholders";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Header/Navigation";


export default function Candleholderspage() {
  return (
    <div>
        <Header />
        <Candleholders />
        <Footer />
        <div className="block lg:hidden overflow-hidden">
            <Navigation />
        </div>
    </div>
  )
}
