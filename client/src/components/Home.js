import React from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import { Header, Image, Card, Button, Icon, } from "semantic-ui-react";

class Home extends React.Component {
  state = { cats: [], };

  componentDidMount() {
    axios.get("/api/cats")
      .then( res => this.setState({ cats: res.data, }));
  }

  sample = () => {
    const { cats, } = this.state;

    if (cats.length) {
      const index = Math.floor(Math.random() * cats.length);
      return cats[index];
    } else {
      return null;
    }
  }

  downVote = (id) => {
    const { cats, } = this.state;
    this.setState({ cats: cats.filter( c => c.id !== id) });
  }

  upVote = (id) => {
    const { cats, } = this.state;
    axios.put(`/api/cats/${id}`)
      .then( res => this.setState({ cats: cats.filter( c => c.id !== id) }));
  }

  render() {
    const cat = this.sample();

    if (cat) {
      return (
        <div>
          <br />
          <Header as="h1">Cat MySpace</Header>
          <Image style={{ width: "220px", height: "100px" }} src={ "https://www.techdigest.tv/myspace_logo.jpg" } />
          <Header as="h2">Friend Requests</Header>
          <br />
          <Card>
          <Image src={cat.avatar} />
            {/* <Image style={{ width: "220px", height: "250px" }} src={cat.avatar} /> */}
            <Card.Content>
              <Card.Header>
                { cat.name }
              </Card.Header>
              <Card.Description>
                { cat.breed }
              </Card.Description>
              <Card.Meta>
                { cat.registry }
              </Card.Meta>
            </Card.Content>
            <Card.Content extra>
            <Button color="green" icon basic onClick={() => this.upVote(cat.id)}>
                <Icon name="add user" />
              </Button>
              <Button color="red" icon basic onClick={() => this.downVote(cat.id)}>
                <Icon name="user times" />
              </Button>
            </Card.Content>
          </Card>
          <Link to="/my_cats">
            <Button color="blue">
              My Friends
            </Button>
          </Link>
        </div>
      )
    } else {
      return <Header textAlign="center">No More Friend Requests</Header>
    }
  }
}

export default Home;
