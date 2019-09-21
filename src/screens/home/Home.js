import React, { Component } from 'react';
import './Home.css';
import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@material-ui/core';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurants: [],
            restaurant_name = '',
            categories = '',
            customer_rating = 0,
            average_price = 0
        }
        this.state.sortByCustomerRatingAsc = this.sortByCustomerRatingAsc.bind(this);
    }

    sortByCustomerRatingAsc() {
        this.setState(prevState => {
          this.state.restaurants.sort((a, b) => (a.customer_rating - b.customer_rating))
      });
      }

    // componentDidMount() {
    //     fetch('http://localhost:8080/api/swagger-ui.html#!/restaurant-controller/getAllRestaurantsUsingGET')
    //         .then(res => res.json())
    //         .then((data) => {
    //             this.setState({ restaurants: data })
    //             console.log(this.state.restaurants)
    //         })
    //         .catch(console.log)
    // }

    UNSAFE_componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                // console.log(JSON.parse(this.responseText));
                this.setState({ restaurants: JSON.parse(this.responseText) });
            }
        })

        xhr.open("GET", this.props.baseUrl);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    /* When clicked directs the user to the details page */
    cardClickHandler = (e) => {
        this.setState({ restaurants: <details /> }); /* direct to details page */
    }

    render() {
        const { classes } = this.props;
        sortByCustomerRatingAsc = this.sortByCustomerRatingAsc;
        return (

            <div>
                <div className='root'>
                    <GridList className='gridList' cols={4}>

                        {this.state.restaurants.map((restaurants => (
                            <Card className='card'>
                                <CardActionArea onClick={this.cardClickHandler}>
                                    <CardMedia
                                        className='media'
                                        image={this.state.restaurants.photo_url}
                                        title="Restaurant Name"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {this.state.restaurants.restaurant_name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {this.state.restaurants.categories}
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs className='rating'>
                                                <FontAwesomeIcon icon="star" />
                                                {this.state.restaurants.customer_rating}
                                            </Grid>
                                            <Grid item xs className='avgPrice'>
                                                <FontAwesomeIcon icon='inr' />
                                                {this.state.restaurants.average_price}
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )))}
                    </GridList>
                </div>
            </div>
        )
    }
}

export default Home;