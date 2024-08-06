export default function CTA() {
    return <section className="bg-gray-800 h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
                    Ready to get started?
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-300">
                    Sign up today and start enjoying the benefits.
                </p>
            </div>
            <div className="mt-10 sm:flex justify-center">
                <div className="rounded-md shadow">
                    <a href="#"
                       className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                        Getting Started
                    </a>
                </div>
            </div>
        </div>
    </section>
}