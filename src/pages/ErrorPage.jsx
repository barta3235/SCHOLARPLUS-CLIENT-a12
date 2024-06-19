import { Link } from "react-router-dom";
import webLogo from '../../src/assets/Website Logo/pngtree-toga-cap-logo-design-scholarship-brand-vector-png-image_12528833.png'

const ErrorPage = () => {
    return (
        <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400 text-yellow-200">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <div className="justify-center items-center flex mb-5">
                        <img className="w-[80px] rounded-lg" src={webLogo} alt="" />
                    </div>
                    <p className="text-2xl font-semibold md:text-3xl mb-10">Sorry, we couldn't find this page.</p>
                    <div className="flex justify-center items-center">
                        <Link to='/' className="px-8 py-3 font-semibold dark:bg-violet-600 dark:text-gray-50 flex items-center justify-center gap-2 border w-[235px] rounded-lg hover:bg-gradient-to-r from-white to-yellow-200 border-yellow-300"> <span className="loading loading-spinner text-yellow-500"></span>Back to homepage</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;