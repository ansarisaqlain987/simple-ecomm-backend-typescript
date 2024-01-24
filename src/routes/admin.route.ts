import { AdminLogin } from "../controllers/auth.controller";
import {Router} from "../types";

export const getAdminRoutes = (router: Router) => {
    router.get("/", AdminLogin);
    return router;
}