import AllClasses from "../../Classes/AllClassses";
import Banner from "../Banner";
import PopularMenu from "../PopularMenu/PopularMenu";
import FAQ from "./FAQ";
import Instroctor from "./Instroctor";
import NewsLetter from "./NewsLetter";
import Partners from "./Partners";
import Review from "./Review";
import State from "./State";



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <State></State>
            <PopularMenu></PopularMenu>
            <Instroctor></Instroctor>
           <Review></Review>
           <NewsLetter></NewsLetter>
           <FAQ></FAQ>
           
            
        </div>
    );
};

export default Home;