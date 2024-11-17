import { Outlet } from "react-router-dom";
import Header from "./Header";

const Root = () => {
    return (
        <div>
            <Header />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Root;