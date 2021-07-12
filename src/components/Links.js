import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getLinks } from '../api';

const LinkCard = ({link}) => {
    const history = useHistory();

    const goToLink = (linkId) => {
        history.push(`/links/${linkId}`);
    }

    return (
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
                <Button className="ml-auto" size="sm" variant="outline-light" onClick={() => {
                    goToLink(link.id);
                }}>Details</Button>
            </Card.Header>
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">Click Count: {link.click_count}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Date Added: {link.date}</Card.Subtitle>
                <Card.Text>
                    "{link.comment}"
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
    )
};

const Links = () => {
    const [links, setLinks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const getAndSetLinks = async () => {
            const serverLinks = await getLinks();
    
            setLinks(serverLinks);
        }

        getAndSetLinks();
    },[])

    
    const goToCreateLink = () => {
        history.push(`/links/create`);
    }

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
            <h2>All Links</h2>
            <Button className="ml-3" size="sm" variant="outline-secondary" onClick={() => {
                    goToCreateLink();
                }}>Create Link</Button>
            </div>
            {
                links.map((link, index) => {
                  return  <LinkCard link={link} key={index} />
                })
            }
        </div>
    )
};

export default Links
