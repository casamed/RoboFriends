import React, { Component } from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import './App.css';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }
    
    //Grabbing Robots from another source (API will learn more)
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users}));
    }

    //Setting the searchfield to what the user types in
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })

    }

    render() { 
        //De-constructing the object
        const { robots, searchfield } = this.state;
        // Return the robots that the user typed in
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })

        return !robots.length ?
            <h1> className='tc'>Loading...</h1> :
        (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            );
    }
}

export default App;