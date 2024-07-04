import './App.css';
import AppProvider from "./componet/providers/appProviders";
import Homepage from './componet/homepage';
import Sidebar from './componet/sidebar/sidebar';
import AddItem from './componet/sidebar/addItem/addItem';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


    function App() {
      const AppBoard = ({ children }) => {
        return (
            <div className="App">
              <div className="container">
                  <div className="boxleft">
                    <Sidebar />
                  </div>
                  <div className="boxrigth">
                    {children}
                  </div>
              </div>
            </div>
        );
      };
    
      return (
        <Router>
          <AppProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <AppBoard>
                    <Homepage />
                  </AppBoard>
                }
              />
              <Route
                path="/addItem"
                element={
                  <AppBoard>
                    <AddItem/>
                  </AppBoard>
                }
              />
            </Routes>
            </AppProvider>
        </Router>
      );
    }

export default App;
