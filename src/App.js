import React, { useState,useRef } from "react";
import News  from "./components/News";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopLoadingBar from 'react-top-loading-bar'

function App () {
  const pageSize=15;
  // apiKey=process.env.REACT_APP_NEWS_API  || 'fallback_api_key';
  const apiKey='fb538ab1abaa4fb3a4501be3c44cf2f5'
  const [progress,setProgress]=useState(0);
  const loadingBar=useRef;
  const handleProgress=(progress)=>{
    setProgress(progress)
  }
  // componentDidMount() {
    //   // Example: Start the loading bar at 30% when the component mounts
    //   this.loadingBar.current.continuousStart(30);
    // }
    
      
    console.log("Api Key",apiKey)
    return (
      <div>
        <Router>
        <TopLoadingBar
        height={3}
            color="#f11946"
            progress={progress}
            // onLoaderFinished={() => handleProgress(0)}
            // ref={this.loadingBar}
          />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News setProgress={handleProgress} apiKey={apiKey} key="general " pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News setProgress={handleProgress} apiKey={apiKey} key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={handleProgress} apiKey={apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={handleProgress} apiKey={apiKey} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/health" element={<News setProgress={handleProgress} apiKey={apiKey} key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News setProgress={handleProgress} apiKey={apiKey} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={handleProgress} apiKey={apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={handleProgress} apiKey={apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  
}
export default App;
