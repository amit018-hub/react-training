import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import classes from "./MainLayout.module.scss";
import SidebarContext from "../Stores/sidebarContext";
import Sidebar from "../components/navbar/sidebar/Sidebar";
import Topbar from "../components/navbar/topbar/Topbar";

const MainLayout = () => {
    const sidebarCtx = useContext(SidebarContext);

    useEffect(() => {
        if (document.body.classList.contains("sidebar__open"))
            document.body.classList.remove("sidebar__open");
    }, []);

    return (
        <div className={classes.container}>
            <Sidebar />
            <div className={classes.main}>
                <div
                    className={`${classes.main__content} ${!sidebarCtx.isOpen ? classes.close_sidebar : ""
                        } main_wrapper`}
                >
                    <Topbar />
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
