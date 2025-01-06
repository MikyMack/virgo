import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";
import Navigation from "../../components/Header/Navigation";
import Cart from "../../components/carts/Cart";

export default function CartVirgo() {
  return (
    <div>
        <Header />
        <Cart />
        <Footer />
        <div className="block lg:hidden overflow-hidden">
          <Navigation />
        </div>
      </div>
  )
}
