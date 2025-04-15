import { Link } from "react-router-dom";
import { FaBuilding, FaSearch, FaBriefcase, FaFileAlt, FaUserSecret, FaHistory } from "react-icons/fa";

const Missinghome = () => {
    return (
      <div className="min-h-screen flex bg-black text-white h-[20px]">
        {/* Sidebar Navigation */}
        <aside className="w-1/4 bg-gray-900 pt-[80px]  flex flex-col items-center border-r border-gray-700 " >
          <h2 className="text-3xl font-bold text-red-500 mb-6">MENU</h2>
         <Link  className="w-full" to='/missing/missingofficerreg'> <NavItem  icon={<FaBuilding />} label="Add Officer" /></Link>
         <Link to='/viewcriminal'  className="w-full"> <NavItem icon={<FaSearch />} label="Search Criminal" /> </Link>
         <Link to='/missing/takecase' className="w-full"><NavItem icon={<FaBriefcase />} label="Take the Case" /></Link>
         <Link to='/CrimeReportingForm'  className="w-full"> <NavItem icon={<FaFileAlt />} label="Register Crime " /></Link>
         <Link to='/addcriminal'  className="w-full"> <NavItem icon={<FaUserSecret />} label="Enter Criminal Report" /></Link>
          <Link to='/dept/opencase' className="w-full">
                   <NavItem icon={<FaBriefcase />} label="Open Case" />
                 </Link>
         <Link  className="w-full"> <NavItem icon={<FaHistory />} label="History" /></Link>
         
        </aside>
  
        {/* Main Content */}s
        <main className="flex-1 p-10 flex flex-col justify-center items-center">
          <div className="bg-gray-800 bg-opacity-30 backdrop-blur-lg p-8 rounded-lg shadow-2xl border border-gray-600 max-w-3xl w-full text-center">
            <h1 className="text-4xl font-bold text-red-500 mb-6">Welcome to the Department Of Missing</h1>
            <p className="text-lg text-gray-300">"Justice begins with dedication and ends with truth."</p>
          </div>
        </main>
      </div>
    );
  };
  
  const NavItem = ({ icon, label }) => {
    return (
      <button className=" flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white text-lg font-semibold px-6 py-3 rounded-lg transition duration-300 w-full my-2">
        {icon} {label}
      </button>
    );
  };

export default Missinghome;
