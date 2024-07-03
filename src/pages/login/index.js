export default function Login() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="bg-gray-700 max-w-md p-8 shadow-lg rounded-lg">
                <div className="avatar mb-8 flex justify-center">
                    <div className="w-24 rounded">
                        {/*TODO*/}
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <form className="">
                    <div className="mb-4">
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                            </svg>
                            <input type="text" className="grow" placeholder="Email"/>
                        </label></div>
                    <button className="w-full btn btn-primary text-white text-lg">
                        以電子郵件繼續
                    </button>
                </form>
            </div>
        </main>
    );
}