
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import imag1 from "../../assets/breadcrumps/loginbread.jpg";
export default function ContactPage() {
  return (
    <section className='font-abc'>
      <div className="relative h-1/2 font-abc">
        <img className="w-full h-[300px] md:h-[300px] lg:h-[300px] object-cover" src={imag1} alt="breadcrump" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-[30px] lg:text-[60px] md:text-[50px] pb-2">Contact Us</h1>
          <p className="text-xl">HOME<span> / CONTACT</span></p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center xl:container mt-8">
        <div className="flex flex-col items-center justify-start w-full lg:w-1/2 p-10 lg:p-28 md:p-28">
          <h1 className="text-3xl mb-5 text-center">Get in Touch</h1>
          <p className="my-6 text-gray-700">Feel free to reach out to us through any of the following methods:</p>
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center mb-5">
              <FaPhone className="mr-2 text-2xl" />
              <span>+123 456 7890</span>
            </div>
            <div className="flex items-center mb-5">
              <FaEnvelope className="mr-2 text-2xl" />
              <span>contact@example.com</span>
            </div>
            <div className="flex items-center mb-5">
              <FaMapMarkerAlt className="mr-2 text-2xl" />
              <span>123 Main Street, Anytown, USA</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-10 lg:p-28 md:p-28">
          <h1 className="text-3xl mb-5 text-center">Contact Form</h1>
          <form className="flex flex-col items-center w-full">
            <input id="name" name="name" className="mb-5 p-2 w-full border-b focus:outline-none" type="text" placeholder="Name" />
            <input id="email" name="email" className="mb-5 p-2 w-full border-b focus:outline-none" type="email" placeholder="Email" />
            <textarea id="message" name="message" className="mb-5 p-2 w-full border-b focus:outline-none" placeholder="Message" rows="5"></textarea>
            <button className="p-4 text-2xl w-full bg-[#acc7bf] hover:bg-[#8dafa5] text-white">Send Message</button>
          </form>
        </div>
      </div>
      <div className="w-full p-10 lg:p-28 md:p-28">
        <iframe
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=191,%20GM%20Palya%20Main%20Rd,%20opp.%20Saptagiri%20Medicals,%20Cauveri%20Colony,%20GM%20Palya,%20C%20V%20Raman%20Nagar,%20Bengaluru,%20Karnataka%20560075+(virgo%20creations)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>
      <div className='lg:container'>
        <hr />
      </div>
    </section>
  );
}
