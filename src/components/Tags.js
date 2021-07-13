import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getAllTags } from '../api';

const TagCard = ({tag}) => {
    return (
        <Card className="mb-3" style={{
            width: '30%',
            display: 'flex',
            border: '1px solid black'
       }}>
           <Card.Body className="mx-auto">
               <h4>{tag.tag_name}</h4>
           </Card.Body>
       </Card>
    )
}

const Tags = () => {
    const [tags, setTags] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const getAndSetTags = async () => {
            const serverTags = await getAllTags();
            setTags(serverTags);
        }

        getAndSetTags();
    },[])

    const goToCreateTag = () => {
        history.push(`/tags/create`);
    }

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1em'
        }}>
            <div style={{
            display: 'flex',
            marginBottom: '1em'
        }}>
            <h2>All Tags</h2>
            
            <Button className="ml-3" size="sm" variant="outline-secondary" onClick={() => {
                    goToCreateTag();
                }}>Create Tag</Button>
            </div>
            {
                tags.map((tag, index) => {
                  return  <TagCard tag={tag} key={index} />
                })
            }
        </div>
    )
}

export default Tags
