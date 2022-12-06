import './home.css';
import AndroidIcon from '@mui/icons-material/Android';
import "bootstrap/dist/css/bootstrap.css";
import Image from "react-bootstrap/Image";
import logo from '../../../../src/dodo.png';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function FeatureCards () {
    return (
        <CardGroup>
            <Card className="myCard" >
                <Card.Body>
                    <Card.Title>A flash card app</Card.Title>
                    <Card.Text>
                        Paper cards are cumbersome, prone to damage or loss, and simply outdated. With Dodo you can carry as many cards as you want!
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="myCard">
                <Card.Body>
                    <Card.Title>Simple and portable</Card.Title>
                    <Card.Text>
                        Create cards, tag them however you like, and build your own decks by choosing the tags you want to view. You can view cards others have created or filter so only your own are shown!
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="myCard" >
                <Card.Body>
                    <Card.Title>Android app available</Card.Title>
                    <Card.Text>
                        Our Android app makes it quick and easy to study on the go. Whether you're on the bus, between classes, or waiting in line at the coffee shop, Dodo is just a tap away!
                    </Card.Text>
                </Card.Body>
            </Card>
        </CardGroup>
    );
}

function Home() {

    return (
        <div className="main">
            <h1 className="home-header mt-3">Welcome to Dodo</h1>
            <h3>A study app for...dodos...</h3>
            <Image className="home-logo" src={logo} />
                <FeatureCards />
            <br />
            <h3><a href="https://www.dropbox.com/s/x4wecfgjj1q13pb/sprint_3_fixed.apk?dl=0" target="_blank" rel="noreferrer"> <AndroidIcon /> Download the App</a></h3>
        </div>
    );
}

export default Home;