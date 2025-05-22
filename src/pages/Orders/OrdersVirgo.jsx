
import Footer from '../../components/Footer/footer'
import Header from '../../components/Header/Header'
import Navigation from '../../components/Header/Navigation'
import Orders from '../../components/Orders/Orders'

export default function OrdersVirgo() {
    return (
        <div>
            <Header />
            <Orders />
            <Footer />
            <div className="block lg:hidden overflow-hidden">
                <Navigation />
            </div>
        </div>
    )
}
