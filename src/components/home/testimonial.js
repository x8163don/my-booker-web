export default function Testimonial() {
    return <section id="testimonial" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                    What Our Customers Say
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-600">
                    Hear from our satisfied customers who have experienced our product.
                </p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="mb-4">
                        <img
                            className="w-16 h-16 rounded-full mx-auto"
                            src="https://via.placeholder.com/150"
                            alt="Customer photo"
                        />
                    </div>
                    <blockquote className="text-center">
                        <p className="text-lg leading-6 text-gray-900">
                            "This product has changed my life! The quality is amazing and the support team is always
                            there to help."
                        </p>
                        <footer className="mt-4">
                            <p className="text-base font-medium text-gray-900">John Doe</p>
                            <p className="text-base font-medium text-gray-600">CEO, Company</p>
                        </footer>
                    </blockquote>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="mb-4">
                        <img
                            className="w-16 h-16 rounded-full mx-auto"
                            src="https://via.placeholder.com/150"
                            alt="Customer photo"
                        />
                    </div>
                    <blockquote className="text-center">
                        <p className="text-lg leading-6 text-gray-900">
                            "I've never been happier with a purchase. The features are exactly what I needed and more."
                        </p>
                        <footer className="mt-4">
                            <p className="text-base font-medium text-gray-900">Jane Smith</p>
                            <p className="text-base font-medium text-gray-600">CTO, Another Company</p>
                        </footer>
                    </blockquote>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="mb-4">
                        <img
                            className="w-16 h-16 rounded-full mx-auto"
                            src="https://via.placeholder.com/150"
                            alt="Customer photo"
                        />
                    </div>
                    <blockquote className="text-center">
                        <p className="text-lg leading-6 text-gray-900">
                            "Exceptional quality and outstanding customer service. I highly recommend this product."
                        </p>
                        <footer className="mt-4">
                            <p className="text-base font-medium text-gray-900">Alex Johnson</p>
                            <p className="text-base font-medium text-gray-600">Manager, Some Company</p>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    </section>
}