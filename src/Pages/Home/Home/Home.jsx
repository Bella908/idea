import AllClasses from "../../Classes/AllClassses";
import Banner from "../Banner";
import PopularMenu from "../PopularMenu/PopularMenu";
import Instroctor from "./Instroctor";
import Partners from "./Partners";
import State from "./State";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <State></State>
            <PopularMenu></PopularMenu>
            <Instroctor></Instroctor>
            
        </div>
    );
};

export default Home;