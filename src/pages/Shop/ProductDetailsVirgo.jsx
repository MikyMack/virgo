import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Header/Navigation";
import ProductDetails from "../../components/shop/ProductDetails";


export default function ProductDetailsVirgo() {
  return (
    <div>
    <Header />
    <ProductDetails />
    <Footer />
    <div className="block lg:hidden overflow-hidden">
        <Navigation />
    </div>
</div>
  )
}
