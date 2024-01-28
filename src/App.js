import React, { Component } from "react";
import News  from "./components/News";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopLoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize=15;
  state={
    progress:0
  }
  loadingBar=React.createRef();
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  // componentDidMount() {
  //   // Example: Start the loading bar at 30% when the component mounts
  //   this.loadingBar.current.continuousStart(30);
  // }

  render() {
    return (
      <div>
        <Router>
        <TopLoadingBar
        height={3}
            color="#f11946"
            progress={this.state.progress}
            // onLoaderFinished={() => this.setProgress(0)}
            // ref={this.loadingBar}
          />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general " pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
