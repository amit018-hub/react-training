import { useNavigate } from "react-router-dom";
import { authService } from "../Api/auth.service";

const requireLogin = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    if (authService.getItem('token')) {
        return true
    } else {
        return navigate(`/login`)
    }
};