import Home from "../../pages/Home";
import Leagues from "../../pages/Leagues";
import Fixtures from "../../pages/Fixtures";
import Players from "../../pages/Players";
import Teams from "../../pages/Teams";
import Profile from "../../pages/profile/Profile";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    exact: true,
  },
  {
    path: "/leagues",
    name: "Leagues",
    component: Leagues,
    exact: true,
  },
  {
    path: "/fixtures",
    name: "Fixtures",
    component: Fixtures,
    exact: true,
  },
  {
    path: "/players",
    name: "Players",
    component: Players,
    exact: true,
  },
  {
    path: "/teams",
    name: "Teams",
    component: Teams,
    exact: true,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    exact: true,
  },
];

export default routes;
