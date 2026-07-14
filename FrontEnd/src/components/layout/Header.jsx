
import { useContext } from "react";
import AuthCont from "../../context/auth.context";

const Header = () => {
let {isLogedIn , email} = useContext(AuthCont)

  
  return (
    <header className="  p-3 ">
      <div className="px-4 bg-white sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Parking Management
        </h1>
        
        <div className="flex items-center gap-4">
          { isLogedIn && (
            <>
              <span className="text-sm text-gray-700">
                {email}
              </span>
              {/* <button
                // onClick={sigenOut}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Logout
              </button> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;