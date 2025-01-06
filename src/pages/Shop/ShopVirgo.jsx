
import Footer from '../../components/Footer/footer'
import Header from '../../components/Header/Header'
import Navigation from '../../components/Header/Navigation'
import Shop from '../../components/shop/Shop'

export default function ShopVirgo() {
    return (
        <div>
            <Header />
            <Shop />
            <Footer />
            <div className="block lg:hidden overflow-hidden">
                <Navigation />
            </div>
        </div>
    )
}
