import "./App.css"
import AdminJS from "./pages/Admin"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ResearchLab from "./pages/ResearchLab"
import Technologylicensing from "./pages/Technologylicensing"
import Productize from "./pages/Productize"
import Startups from "./pages/Startups"
import ResearchLabs from "./pages/ResearchLabs"
import ProductLab_Products from "./pages/ProductLab_Products"
import Catalogue from "./pages/Catalogue"
import Technology from "./pages/Technology"
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SearchBar from './components/Searchbar';
import Navbar1 from "./components/Navbar"
import Navbar2 from "./components/Navbar2"
import AdminPatent from "./pages/AdminPatents"
import Patent from "./pages/Patents"
import Publications from "./pages/Publications"
import Randomtry from "./pages/use"
import Footbar from "./Footer/Footbar"
import AdminCatalogue from "./pages/AdminCatalogue"
import JobSeekerRegistration from "./pages/JobSeekerRegistration"
import EntrepreneurRegistration from "./pages/EntrepreneurRegistration"
import IndustryRegistration from "./pages/IndustryRegistration"



function App() {
    return (

        <div className="App" style={{ minWidth: "800px" }}>
            <Router>

                <Navbar1/>
                <Navbar2/> 
                 {/* <Footer/> */}
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/catalogue/admin" exact component={AdminCatalogue} />
                    <Route path="/catalogue" exact component={Catalogue} />
                    <Route path="/technology/:id" exact component={Technology} />
                    {/* <Link path="/canvas" to="" /> */}
                    <Route path="/patents" exact component={Patent} />
                    <Route path="/publications" exact component={Publications} />
                    <Route path="/patents/admin" exact component={AdminPatent} />
                    <Route path="/try" exact component={Randomtry} />
                    <Route path="/Technologylicensing" component={Technologylicensing}/>
                    <Route path="/Productize" component={Productize} />
                    <Route path="/Startups" component={Startups} />
                    <Route path="/ProductLab_Products" component={ProductLab_Products} />
                    <Route path="/ResearchLabs" component={ResearchLabs} />
                    <Route path="/Products/:LabName/:ProductName" component={Products} />
                    <Route path="/ResearchLab/:LabName/:LabCode" component={ResearchLab} />
                    <Route path="/JobSeekerRegistration"component={JobSeekerRegistration} />
                    <Route path="/IndustryRegistration"component={IndustryRegistration} />
                    <Route path="/EntrepreneurRegistration"component={EntrepreneurRegistration} />
                    <Route path="/admin" component={AdminJS} />
                   
                    {/* <Route path="/chat" exact component={LoginPage} /> */}
                    {/* <Route path="/chathome" exact component={HomePage} /> */}

                    <h1>asDada</h1>
                </Switch>

                <Footbar/>

            </Router>

        </div>



    );
}
export default App;