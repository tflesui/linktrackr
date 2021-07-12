import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { getSingleLink } from '../api';


const SingleLink = () => {

    const history = useHistory();
    const goToLinks = () => {
        history.push(`/links`);
    }

    const location = useLocation();
    const path = location.pathname;
    const linkId = path.slice(7);


    const [link, setLink] = useState('');

    useEffect(() => {
        const getAndSetLink = async () => {
            const serverLink = await getSingleLink(linkId);
            
            setLink(serverLink);
        }

        getAndSetLink();
    }, [])

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1em',
        }}>
            <div style={{
                display: 'flex',
                marginBottom: '1em'
            }}>
            <h2>Link Details</h2>
            <Button className="ml-3" size="sm" variant="outline-secondary" onClick={() => {
                    goToLinks();
                }}>Back to Links</Button>
            </div>
            <Card className="mb-3" style={{
                width: '100%',
                border: '1px solid black'
            }}>
                <Card.Header style={{
                    backgroundColor: '#2F855A',
                    color: 'white',
                    display: 'flex',                
                }}>
                    <Card.Title>{link.link_name}</Card.Title>
                    &nbsp;
                    <Button className="ml-auto" size="sm" variant="danger" onClick={() => {
                        // goToLink(link.id);
                    }}>Delete</Button>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">Click Count: {link.click_count}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Date Added: {link.date}</Card.Subtitle>
                    <Card.Text>
                        {link.comment}
                    </Card.Text>
                    {
                        link.tags && link.tags.map(tag => {
                            return (                            
                                <Card.Link href="#tags" key={tag.id}>{tag.tag_name}</Card.Link>
                            )
                        })
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default SingleLink
