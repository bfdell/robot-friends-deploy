import "./App.css";
import CardList from "./components/CardList";
import { robots } from "./robots";
import Scroll from "./components/Scroll";
import SearchBox from "./components/SearchBox";
import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";

class App extends React.Component {
  constructor() {
    super();
    this.state = { robots: robots, searchfield: "" };
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
    console.log(this.state.searchfield);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      }).then((users) => {
        console.log({ users });
        this.setState({ robots: users });
      });
  }

  render() {
    const filteredRobots = this.state.robots.filter((robot) => {
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    });
    console.log(filteredRobots);
    return (
      <div className="tc">
        <h1 className="f1">Robot Friends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <ErrorBoundary>
          <Scroll>
            <CardList robots={robots} />
          </Scroll>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
