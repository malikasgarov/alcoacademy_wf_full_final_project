import Begin from "./Begin";
import Header from "./Header";
import Counters from "./Counters";
import Howtoplay from "./HowtoPlay";
import Categories from "./Categories";
import Contact from "./Contact";
import Contactform from "./Contactform";


function index() {
    return ( 
        <>
            <Header />
            <Begin />
            <Counters />
            <Howtoplay />
            <Categories />
            <Contact />
            <Contactform />
        </>
     );
}

export default index;