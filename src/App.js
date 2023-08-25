import axios from "axios"; // Importing Axios library for making HTTP requests
import { Component } from "react"; // Importing the Component class from the React library
import Loading from "./Loading";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], // An array to store user data
      loading: false // A boolean to track whether data is loading
    };
  }
  

  // Define a function 'getUsers' to fetch user data from an API
  getUsers() {
    this.setState({
      loading: true // Set loading to true to indicate data is being fetched
    });
    // Make an HTTP request to fetch user data from an API
    axios("https://api.randomuser.me/?nat=US&results=5").then((Response) =>
      this.setState({
        users: [...this.state.users, ...Response.data.results], // Update 'users' with fetched data
        loading: false // Set loading back to false when data is fetched
      })
    );
  }
  handleSubmit(e){
    e.preventDefault();
    this.getUsers() ;
    console.log('more users loaded')
  }

  // The 'componentWillMount' lifecycle method is deprecated. Instead, you should use 'componentDidMount'.
  // In this case, 'componentDidMount' would be more appropriate for fetching data.
  // For simplicity, we will keep 'componentWillMount' here for now.
  componentDidMount() {
    // When the component is about to mount (be inserted into the DOM), call the 'getUsers' function to fetch data.
    this.getUsers();
  }

  render() {
    const {loading, users} = this.state
    return (
      <div className="App">
           <form onSubmit={this.handleSubmit}>
              <input type="submit" value="load users"/>
            </form>
            <hr/>
        {/* Map through the 'users' array in state and render user data */}
        {!loading ? users.map((user) => (
          <div key={user.id.value}>
            <h3 style={{color:'red'}}>{user.name.first}</h3> {/* Display the user's first name */}
            <p>{user.email}</p> {/* Display the user's email */}
            <hr /> {/* Horizontal line to separate users */}
          </div>
        )):(<Loading message="HEY" />)}
      </div>
    );
  }
}

export default App; // Export the 'App' component as the default export
