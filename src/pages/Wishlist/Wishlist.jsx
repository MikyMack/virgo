
import Footer from '../../components/Footer/footer'
import Navigation from '../../components/Header/Navigation'
import Header from '../../components/Header/Header'
import WishlistComp from '../../components/Wishlist/WishlistComp'

export default function Wishlist() {
  return (
    <div>
        <Header />
        <WishlistComp />
         <Footer />
        <div className="block lg:hidden overflow-hidden">
            <Navigation />
        </div>
    </div>
  )
}
