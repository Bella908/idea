import AllClasses from "../../Classes/AllClassses";
import Banner from "../Banner";
import PopularMenu from "../PopularMenu/PopularMenu";
import Instroctor from "./Instroctor";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularMenu></PopularMenu>
            <Instroctor></Instroctor>
            
        </div>
    );
};

export default Home;