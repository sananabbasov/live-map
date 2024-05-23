import { useEffect, useState } from "react";
import MapComponent from "./components/FireMap";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { BrowserRouter } from "react-router-dom";
import MyRouter from "./router/MyRouter";

function App() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)




  useEffect(() => {
  }, [])


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />


        {/* <MapComponent coordinates={data.events} /> */}

        {/* <Quiz /> */}

        {/* <Register /> */}

        <MyRouter />

      </BrowserRouter>
    </div>
  );
}

export default App;
