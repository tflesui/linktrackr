import React from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';

function Main() {
    return (
        <div className='m-5'>
            <Jumbotron style={{
                backgroundColor: '#38A169',
                color: 'white'
            }}>
                <h1>Welcome to LinkTrackr!</h1>
                <p>
                    Here you can keep track of your favorite links in a fresh new way!
                </p>
                <p>
                    <Button as={Link} to="/links" variant="outline-light">Get Started</Button>
                </p>
            </Jumbotron>
        </div>
    )
}

export default Main;
