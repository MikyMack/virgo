import img1 from "../../assets/breadcrumps/cartbread.jpg"
export default function WishlistComp() {
    return (
        <section className="font-abc">
            <div className="relative h-1/2 font-abc">
                <img className="w-full h-[300px] md:h-[350px] lg:h-[350px] object-cover" src={img1} alt="shop" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-[30px] lg:text-[60px] md:text-[50px] pb-2">Wishlist</h1>
                    <h2 className="flex items-center gap-2 cursor-pointer">Home <span>/</span> <span>Wishlist</span></h2>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-6 my-10 text-center lg:container">
                    <h1 className="text-4xl font-semibold">Your Wishlist</h1>
                    <p className="text-xl text-gray-700">You currently have no items in your wishlist.</p>
                    
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Add your wishlist items here */}
                </div>
            </div>
        </section>
    )
}
