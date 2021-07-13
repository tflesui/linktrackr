import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { createTag } from '../api';


const CreateTag = () => {
		const [tagName, setTagName] = useState('');
		const [submitting, setSubmitting] = useState(false);
		const [error, setError] = useState('');

		const history = useHistory();

		const goToTags = () => {
			history.push('/tags/')
		}

		const setName = name => {
			if(name.length <= 30) {
				setTagName(name);
			}
		}

		const handleSubmit = async (tag) => {
			setSubmitting(true);
			const success = await createTag(tag);

			if (success){
				setTagName('');
				goToTags();
			} else {
				setError('Failed to create link. Please try again')
			}

			setSubmitting(false);
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
            <h1 className="mb-3">Create a New </h1>
            <Form onSubmit={
							e => {
								e.preventDefault();
							}
						}>
                <Form.Group controlId="formTagName">
                    <Form.Label>Tag Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Tag Name" value={tagName} onChange={
											e => {
												setName(e.target.value);
											}
										}required />
                    <Form.Text className="text-muted">
                    tags should be a single word
                    </Form.Text>
                </Form.Group>                
								{
									error && (
										<span>
											{error}
										</span>
									)
								}
                <Button variant="secondary" type="submit" block disabled={submitting} onClick={
									() => handleSubmit({tagName})
								}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateTag
