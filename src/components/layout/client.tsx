import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import Header from "./header/header";

const LayoutClient = () => {
  return (
    <div className="flex">
            <Header />
            <Sidebar />
            <main className="pt-10 md:pl-20 h-screen w-screen flex justify-center">
                <Outlet/>
            </main>
        </div>
  );
};

export default LayoutClient;
