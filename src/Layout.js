
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="container">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;