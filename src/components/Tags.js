import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
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

    useEffect(() => {
        const getAndSetTags = async () => {
            const serverTags = await getAllTags();
            setTags(serverTags);
        }

        getAndSetTags();
    },[])

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <h2>All Tags</h2>
            {
                tags.map((tag, index) => {
                  return  <TagCard tag={tag} key={index} />
                })
            }
        </div>
    )
}

export default Tags
