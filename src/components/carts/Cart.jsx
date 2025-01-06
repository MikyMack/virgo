import bgimg from "../../assets/breadcrumps/cartbread.jpg"
import { FaArrowRightLong, FaPlus, FaMinus } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { LiaRupeeSignSolid } from "react-icons/lia";
import img1 from "../../assets/products/b1.png"
import img2 from "../../assets/products/asin1.png"
import img3 from "../../assets/products/c1.png"
import { useMediaQuery } from 'react-responsive';

function MobileCart() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center border-b border-gray-200 py-4">
        <img src={img1} alt="Product 1" className="w-40 h-40 sm:w-40 sm:h-40 object-contain mr-4" />
        <div className="flex flex-col items-center gap-2">  
          <p className="text-sm sm:text-base">Name : <span className="text-gray-700">Product 1</span> </p>
          <p className="flex items-center text-sm sm:text-base text-gray-700"><span className="text-black">Price :</span><span><LiaRupeeSignSolid /></span>10.00</p>
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="text-gray-600 border-2 p-1 border-gray-600"><FaMinus /></button>
            <span className="text-gray-700">1</span>
            <button className="text-gray-600 border-2 p-1 border-gray-600"><FaPlus /></button>
          </div>
          <p className="flex items-center text-xl sm:text-base text-[#72a596]"><span className="text-black">Subtotal :</span> <span><LiaRupeeSignSolid /></span>10.00</p>
          <button className="text-red-500 text-2xl sm:text-3xl p-1 sm:p-2 relative group">
            <MdDeleteForever />
            <span className="absolute top-full mb-2 w-max px-2 sm:px-3 py-1 sm:py-2 text-xs text-white bg-secondary rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Delete Product</span>
          </button>
        </div>
      </div>
      <div className="flex items-center border-b border-gray-200 py-4">
        <img src={img2} alt="Product 2" className="w-40 h-40 sm:w-40 sm:h-40 object-contain mr-4" />
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm sm:text-base">Name : <span className="text-gray-700"> Product 2</span></p>
          <p className="flex items-center text-sm sm:text-base text-gray-700"><span className="text-black">Price :</span> <span><LiaRupeeSignSolid /></span>20.00</p>
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="text-gray-600 border-2 p-1 border-gray-600"><FaMinus /></button>
            <span className="text-gray-700">2</span>
            <button className="text-gray-600 border-2 p-1 border-gray-600"><FaPlus /></button>
          </div>
          <p className="flex items-center text-xl sm:text-base text-[#72a596]"><span className="text-black">Subtotal :</span> <span><LiaRupeeSignSolid /></span>40.00</p>
          <button className="text-red-500 text-2xl sm:text-3xl p-1 sm:p-2 relative group">
            <MdDeleteForever />
            <span className="absolute top-full mb-2 w-max px-2 sm:px-3 py-1 sm:py-2 text-xs text-white bg-secondary rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Delete Product</span>
          </button>
        </div>
      </div>
      <div className="flex items-center border-b border-gray-200 py-4">
        <img src={img3} alt="Product 3" className="w-40 h-40 sm:w-40 sm:h-40 object-contain mr-4" />
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm sm:text-base">Name : <span className="text-gray-700">Product 3</span> </p>
          <p className="flex items-center text-sm sm:text-base text-gray-700"><span className="text-black">Price :</span> <span><LiaRupeeSignSolid /></span>15.00</p>
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="text-gray-600 border-2 p-1 border-gray-600"><FaMinus /></button>
            <span className="text-gray-700">1</span>
            <button className="text-gray-600 border-2 p-1 border-gray-600"><FaPlus /></button>
          </div>
          <p className="flex items-center text-xl sm:text-base text-[#72a596]"><span className="text-black">Subtotal :</span> <span><LiaRupeeSignSolid /></span>15.00</p>
          <button className="text-red-500 text-2xl sm:text-3xl p-1 sm:p-2 relative group">
            <MdDeleteForever />
            <span className="absolute top-full mb-2 w-max px-2 sm:px-3 py-1 sm:py-2 text-xs text-white bg-secondary rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Delete Product</span>
          </button>
        </div>
      </div>
      <div className="w-full border-4 border-gray-300 p-5 sm:p-10 font-abc mt-5">
        <div className="py-3 sm:py-6">
          <h1 className="text-xl sm:text-3xl"> CART TOTALS</h1>
        </div>
        <div className="flex justify-between py-3 sm:py-5">
          <h2 className="text-sm sm:text-base">Sub Total</h2>
          <p className="flex items-center text-gray-700 text-sm sm:text-xl"><span><LiaRupeeSignSolid /></span>165.00</p>
        </div>
        <hr />
        <div className="flex justify-between py-3 sm:py-5">
          <h2 className="text-sm sm:text-base">Shipping</h2>
          <p className="flex items-center text-gray-700 text-sm sm:text-xl"><span><LiaRupeeSignSolid /></span>35.00</p>
        </div>
        <hr />
        <div className="flex justify-between py-3 sm:py-5">
          <h2 className="text-sm sm:text-base">Total</h2>
          <p className="flex items-center font-bold text-secondary text-xl sm:text-3xl"><span><LiaRupeeSignSolid /></span>200.00</p>
        </div>
        <div className="flex justify-center mt-3 sm:mt-5">
          <button className="w-full py-2 sm:py-3 bg-secondary text-white font-bold hover:bg-[#a4cfc2]">PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <section>
      <div className="relative font-abc">
        <img className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] object-cover" src={bgimg} alt="bread-bg" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="flex items-center p-2 gap-3">
            <h1 className="text-sm sm:text-2xl md:text-3xl underline">SHOPPING CART</h1>
            {!isMobile && (
              <>
                <span className="text-sm sm:text-xl md:text-2xl"><FaArrowRightLong /></span>
                <h1 className="text-sm sm:text-2xl md:text-3xl">CHECKOUT</h1>
                <span className="text-sm sm:text-xl md:text-2xl"><FaArrowRightLong /></span>
                <h1 className="text-sm sm:text-2xl md:text-3xl">ORDER COMPLETE</h1>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="xl:container mx-auto font-abc py-5 p-3 sm:py-10">
        <div className="flex flex-col lg:w-2/3 border border-gray-500 border-dashed px-3 py-5 sm:px-5 sm:py-7 space-y-3 sm:space-y-5">
          <div className="flex items-center">
            <p className="flex items-center gap-1 text-sm sm:text-base">
              Add <span className="text-secondary"><LiaRupeeSignSolid /></span> <span className="text-secondary">900 </span> to cart and get <span className="font-bold">free shipping!</span>
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-secondary h-2.5 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
        {isMobile ? (
          <MobileCart />
        ) : (
          <div className="flex flex-col lg:flex-row items-start">
            <div className="w-full lg:w-2/3">
              <div className="mt-5 sm:mt-10">
                <div className="min-w-full bg-white">
                  <div className="flex py-2 px-2 sm:px-4 border-b border-gray-200 justify-center">
                    <div className="w-1/5 text-center text-sm sm:text-lg font-semibold text-gray-600">PRODUCT</div>
                    <div className="w-1/5 text-center text-sm sm:text-lg font-semibold text-gray-600">PRODUCT NAME</div>
                    <div className="w-1/5 text-center text-sm sm:text-lg font-semibold text-gray-600">PRICE</div>
                    <div className="w-1/5 text-center text-sm sm:text-lg font-semibold text-gray-600">QUANTITY</div>
                    <div className="w-1/5 text-center text-sm sm:text-lg font-semibold text-gray-600">SUBTOTAL</div>
                  </div>
                  <div className="flex py-2 px-2 sm:px-4 border-b border-gray-200 items-center justify-center">
                    <div className="w-1/5 flex items-center justify-center">
                      <button className="text-red-500 text-2xl sm:text-3xl p-1 sm:p-2 relative group"> 
                        <MdDeleteForever />
                        <span className="absolute top-full mb-2 w-max px-2 sm:px-3 py-1 sm:py-2 text-xs text-white bg-secondary rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Delete Product</span>
                      </button>
                      <img src={img1} alt="Product 1" className="w-20 h-20 sm:w-40 sm:h-40 object-contain" />
                    </div>
                    <div className="w-1/5 text-center text-sm sm:text-base">Product 1</div>
                    <div className="w-1/5 flex items-center justify-center text-center text-sm sm:text-xl text-gray-600"><span><LiaRupeeSignSolid /></span>10.00</div>
                    <div className="w-1/5 text-center flex items-center justify-center gap-1 sm:gap-2">
                      <button className="text-gray-600 border-2 p-1 border-gray-600"><FaMinus /></button>
                      <span className="text-gray-700">1</span>
                      <button className="text-gray-600 border-2 p-1 border-gray-600"><FaPlus /></button>
                    </div>
                    <div className="w-1/5 flex items-center justify-center text-center text-sm sm:text-xl text-[#9ed4c4]"><span><LiaRupeeSignSolid /></span>10.00</div>
                  </div>
                  <div className="flex py-2 px-2 sm:px-4 border-b border-gray-200 items-center justify-center">
                    <div className="w-1/5 flex items-center justify-center">
                      <button className="text-red-500 text-2xl sm:text-3xl p-1 sm:p-2 relative group">
                        <MdDeleteForever />
                        <span className="absolute top-full mb-2 w-max px-2 sm:px-3 py-1 sm:py-2 text-xs text-white bg-secondary rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Delete Product</span>
                      </button>
                      <img src={img2} alt="Product 2" className="w-20 h-20 sm:w-40 sm:h-40 object-contain" />
                    </div>
                    <div className="w-1/5 text-center text-sm sm:text-base">Product 2</div>
                    <div className="w-1/5 flex items-center justify-center text-center text-sm sm:text-xl text-gray-600"><span><LiaRupeeSignSolid /></span>20.00</div>
                    <div className="w-1/5 text-center flex items-center justify-center gap-1 sm:gap-2">
                      <button className="text-gray-600 border-2 p-1 border-gray-600"><FaMinus /></button>
                      <span className="text-gray-700">2</span>
                      <button className="text-gray-600 border-2 p-1 border-gray-600"><FaPlus /></button>
                    </div>
                    <div className="w-1/5 flex items-center justify-center text-center text-sm sm:text-xl text-[#9ed4c4]"><span><LiaRupeeSignSolid /></span>40.00</div>
                  </div>
                  <div className="flex py-2 px-2 sm:px-4 border-b border-gray-200 items-center justify-center">
                    <div className="w-1/5 flex items-center justify-center">
                      <button className="text-red-500 text-2xl sm:text-3xl p-1 sm:p-2 relative group">
                        <MdDeleteForever />
                        <span className="absolute top-full mb-2 w-max px-2 sm:px-3 py-1 sm:py-2 text-xs text-white bg-secondary rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Delete Product</span>
                      </button>
                      <img src={img3} alt="Product 3" className="w-20 h-20 sm:w-40 sm:h-40 object-contain" />
                    </div>
                    <div className="w-1/5 text-center text-sm sm:text-base">Product 3</div>
                    <div className="w-1/5 flex items-center justify-center text-center text-sm sm:text-xl text-gray-600"><span><LiaRupeeSignSolid /></span>15.00</div>
                    <div className="w-1/5 text-center flex items-center justify-center gap-1 sm:gap-2">
                      <button className="text-gray-600 border-2 p-1 border-gray-600"><FaMinus /></button>
                      <span className="text-gray-700">1</span>
                      <button className="text-gray-600 border-2 p-1 border-gray-600"><FaPlus /></button>
                    </div>
                    <div className="w-1/5 flex items-center justify-center text-center text-sm sm:text-xl text-[#9ed4c4]"><span><LiaRupeeSignSolid /></span>15.00</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 border-4 border-gray-300 p-5 sm:p-10 lg:ml-10 font-abc mt-5 lg:mt-0">
              <div className="py-3 sm:py-6">
                <h1 className="text-xl sm:text-3xl"> CART TOTALS</h1>
              </div>
              <div className="flex justify-between py-3 sm:py-5">
                <h2 className="text-sm sm:text-base">Sub Total</h2>
                <p className="flex items-center text-gray-700 text-sm sm:text-xl"><span><LiaRupeeSignSolid /></span>165.00</p>
              </div>
              <hr />
              <div className="flex justify-between py-3 sm:py-5">
                <h2 className="text-sm sm:text-base">Shipping</h2>
                <p className="flex items-center text-gray-700 text-sm sm:text-xl"><span><LiaRupeeSignSolid /></span>35.00</p>
              </div>
              <hr />
              <div className="flex justify-between py-3 sm:py-5">
                <h2 className="text-sm sm:text-base">Total</h2>
                <p className="flex items-center font-bold text-secondary text-xl sm:text-3xl"><span><LiaRupeeSignSolid /></span>200.00</p>
              </div>
              <div className="flex justify-center mt-3 sm:mt-5">
                <button className="w-full py-2 sm:py-3 bg-secondary text-white font-bold hover:bg-[#a4cfc2]">PROCEED TO CHECKOUT</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
