
import Register from "../../components/Auth/register";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Header/Navigation";


export default function Account() {
  return (
    <div>
      <Header />
        <Register />
        <Footer />
        <div className="block lg:hidden overflow-hidden">
            <Navigation />
        </div>
    </div>
  )
}
