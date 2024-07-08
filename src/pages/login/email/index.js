
export default function Email() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="bg-gray-700 w-full max-w-md p-8 shadow-lg rounded-lg">
                <div className="flex flex-col items-center">
                    {/*<Image src={Logo} alt="Website Logo" width={100} height={100}/>*/}
                    <h1 className="text-3xl font-semibold mt-4 text-center">Login Link Sent</h1>
                    <p className="text-lg mt-2 text-center">We have sent a login link to your email. Please check
                        your email.</p>
                </div>
            </div>
        </main>
    );
}
