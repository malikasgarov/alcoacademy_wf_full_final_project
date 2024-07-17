import Begin from "./begin";
import Header from "./header";
import Counters from "./Counters";
import Howtoplay from "./HowtoPlay";
import Categories from "./Categories";

function index() {
    return ( 
        <>
            <Header />
            <Begin />
            <Counters />
            <Howtoplay />
            <Categories />
        </>
     );
}

export default index;