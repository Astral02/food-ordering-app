import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/Header';
import GridList from '@material-ui/core/GridList';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import GridListTile from '@material-ui/core/GridListTile';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Icon } from '@iconify/react';
import inrIcon from '@iconify/icons-fa/inr';
import starO from '@iconify/icons-fa/star-o';
import { isWidthUp } from '@material-ui/core/withWidth';


class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurants: [],
            cards: 1,
        }
    }

    UNSAFE_componentWillMount() {
        sessionStorage.removeItem('customer-cart');

        let that = this;
        let dataRestaurants = null;
        let xhrRestaurants = new XMLHttpRequest();
        xhrRestaurants.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                that.setState({
                    restaurants: JSON.parse(this.responseText).restaurants
                })
            }
        })
        xhrRestaurants.open('GET', `${this.props.baseUrl}restaurant`);
        xhrRestaurants.send(dataRestaurants);

        this.updateCardsGridListCols();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateCardsGridListCols);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateCardsGridListCols);
    }

    updateCardsGridListCols = () => {
        if (isWidthUp('xl', this.props.width)) {
            this.setState({ cards: 6 });
            return;
        }

        if (isWidthUp('lg', this.props.width)) {
            this.setState({ cards: 5 });
            return;
        }

        if (isWidthUp('md', this.props.width)) {
            this.setState({ cards: 4 });
            return;
        }
        if (isWidthUp('sm', this.props.width)) {
            this.setState({ cards: 2 });
            return;
        }
        this.setState({ cards: 1 });
        return;
    }

    restaurantCardTileOnClickHandler = (restaurantId) => {
        this.props.history.push('/restaurant/' + restaurantId);
    }

    searchHandler = (event) => {
        let that = this;
        let dataRestaurants = null;
        let xhrRestaurants = new XMLHttpRequest();
        xhrRestaurants.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                if (!JSON.parse(this.responseText).restaurants) {
                    that.setState({
                        restaurants: null,
                    })
                } else {
                    that.setState({
                        restaurants: JSON.parse(this.responseText).restaurants,
                    })
                }
            }
        })
        if (event.target.value === '') {
            xhrRestaurants.open('GET', `${this.props.baseUrl}restaurant`);
        } else {
            xhrRestaurants.open('GET', `${this.props.baseUrl}restaurant/name/${event.target.value}`);
        }
        xhrRestaurants.send(dataRestaurants);
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.restaurants === null ?
                    <Typography className='noRestaurant' variant='h6'>
                        No restaurant with the given name.
                    </Typography>
                    :
                    <GridList
                        className='gridList'
                        cols={this.state.cards}
                        cellHeight='auto'
                    >
                        {this.state.restaurants.map(restaurant => (
                            <GridListTile
                                onClick={() => this.restaurantCardTileOnClickHandler(restaurant.id)}
                                key={'restaurant' + restaurant.id}
                            >
                                <Card className='card' style={{ textDecoration: 'none' }}>
                                    <CardMedia
                                        className='restaurantCardMedia'
                                        image={restaurant.photo_URL}
                                        title={restaurant.restaurant_name}
                                    />
                                    <CardContent>
                                        <Typography className='name' gutterBottom variant='h5' component='h2'>
                                            {restaurant.restaurant_name}
                                        </Typography>
                                        <Typography variant='subtitle1'>
                                            {restaurant.categories}
                                        </Typography>
                                        <div className='ratingAvgRateDiv'>
                                            <div className='ratingDiv'>
                                                <Typography className='ratingText' variant='body2'>
                                                    <Icon icon={starO} /> {restaurant.customer_rating} ({restaurant.number_customers_rated})
                                                </Typography>
                                            </div>
                                            <Typography className='avgRateText' variant='body2'>
                                                <Icon icon={inrIcon} /> {restaurant.average_price} for two
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        ))}
                    </GridList>
                }
            </div>
        );
    }
}

export default Home;