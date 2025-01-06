
import ContactPage from "../../components/Contact/ContactComp";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Header/Navigation";


export default function Contact() { 
  return (
    <div>
        <Header />
        <ContactPage />
        <Footer />
        <div className="block lg:hidden overflow-hidden">
            <Navigation />
        </div>
    </div>
  )
}
