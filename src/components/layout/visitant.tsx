import { Outlet } from "react-router-dom";
const LayoutVisitant = () => {
  return (
    <div className="flex">
            <main className="h-screen w-screen flex justify-center">
                <Outlet/>
            </main>
        </div>
  );
};

export default LayoutVisitant;
