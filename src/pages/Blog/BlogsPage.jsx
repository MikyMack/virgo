import Blogs from "../../components/blogs/Blogs"
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Header/Navigation";

export default function BlogsPage() {
  return (
    <div>
        <Header />
        <Blogs />
        <Footer />
        <div className="block lg:hidden overflow-hidden">
          <Navigation />
        </div>
      </div>
  )
}
