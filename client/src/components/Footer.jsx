import footerimg from "../assets/footerimg.jpg"

const Footer = () => {
  return (
    <div className="flex flex-col items-center max-w-screen
    dark:bg-gray-900 dark:text-white">
       
       {/* card  */}
       <div className="flex flex-col items-center
        md:flex md:flex-row md:justify-between m-5 border md:w-5xl
        border-gray-100 rounded-xl p-4 shadow
        dark:border-gray-700 dark:shadow-sm dark:bg-gray-800
         ">

            {/* left content */}
        <div className="flex text-center w-full md:flex flex-col justify-center items-center md:w-1/2">
        <span className="text-xs text-gray-600 font-semibold p-2
        dark:text-gray-400 ">
            Host Your Events with EventFlow
        </span>

        <h1 className=" text-xl md:text-3xl font-bold text-gray-800 p-2
        dark:text-gray-300">
            Join as an Organizer Today
        </h1>

        <p className=" text-sm md:text-md whitespace-pre-wrap p-2 ">
        {`Turn your ideas into unforgettable experiences. 
          With EventFlow, you can easily create, manage,
        and promote your events — all in one place.`}
        </p>

        <button className="text-md bg-red-600 p-2 m-2 rounded-2xl
         text-white w-45 border shadow">
            Become an host
        </button>
        </div>

        {/* right image */}
        
        <div className=" w-xs m-3">
            <img className="rounded-xl"
            src={footerimg} alt="image" />
        </div>
       </div>

       {/* footer lists */}
       <div className="flex flex-col md:flex md:flex-row w-full justify-around bg-gray-50 border-gray-300 shadow
       dark:bg-gray-900 dark:border dark:border-gray-700 dark:shadow-xl">

        {/* left side */}
        <div className="w-1/3  m-4">
            <img src="/logo.png" alt="EventFlow" width={190} />
            
            <p className="font-light m-2">
                The Most Popular Event Organizing Platform
            </p>
        </div>

        {/* right side */}
        <div className="flex m-2 space-x-15">
            <div>
                <ul>
                    <li className="text-lg font-semibold p-2">Company</li>
                    <li>Pricing</li>
                    <li>Contact Us</li>
                    <li>Become an Host</li>
                    <li>Project</li>
                </ul>
            </div>

            <div>
                <ul>
                    <li className="text-lg font-semibold p-2">Socials</li>
                    <li>Instagram</li>
                    <li>FaceBook</li>
                    <li>WhatsApp</li>
                    <li>Twitter</li>
                </ul>
            </div>

            <div>
                <h1 className="text-xl font-bold p-2">
                    Newsletter
                </h1>

                <p className="text-sm font-light p-2">
                    Host and paricipate in events and get exciting offers.
                </p>

                <input 
                className="w-40 md:w-xs border border-gray-100 rounded p-2 shadow
                dark:bg-gray-800  dark:shadow-xl"
                type="email" 
                placeholder="Enter you email..."/>
            </div>
        </div>

       </div>
       {/* copy right*/}
            <div className="border border-gray-200 shadow
            dark:bg-gray-700 dark:shadow-xl"></div>
            <p className="text-center text-md font-light">
                © 2026 . All rights reserved. made with EventFlow.
            </p>
    </div>
  )
}

export default Footer
