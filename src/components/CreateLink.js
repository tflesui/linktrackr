import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { createLink } from '../api';


const CreateLink = () => {
		const [linkName, setLinkName] = useState('');
		const [comment, setComment] = useState('');
		const [tags, setTags] = useState([]);
		const [submitting, setSubmitting] = useState(false);
		const [error, setError] = useState('');

		const history = useHistory();

		const goToLinks = () => {
			history.push('/links')
		}

		const setName = name => {
			if(name.length <= 30) {
				setLinkName(name);
			}
		}

		const setLinkComment = linkComment => {
			if(linkComment.length <= 140) {
				setComment(linkComment);
			}
		} 

		const setLinkTags = linkTags => {
			if(linkTags.join.length <= 100) {
				setTags(linkTags);
			}
		}

		const handleSubmit = async (link) => {
			setSubmitting(true);
			const success = await createLink(link);

			if (success){
				setLinkName('');
				setLinkComment('');
				setLinkTags([]);
				goToLinks();
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
            <h1 className="mb-3">Create a New Link</h1>
            <Form onSubmit={
							e => {
								e.preventDefault();
								console.log('form submitted', e);
							}
						}>
                <Form.Group controlId="formLinkName">
                    <Form.Label>Link URL</Form.Label>
                    <Form.Control type="text" placeholder="Enter URL" value={linkName} onChange={
											e => {
												setName(e.target.value);
											}
										}required />
                    <Form.Text className="text-muted">
                    Links should be in the form of: www.example.com
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formLinkComment">
                    <Form.Label>Link Comment</Form.Label>
                    <Form.Control as="textarea" rows={3} value={comment} onChange={
											e => {
												setLinkComment(e.target.value);
											}
										}required />
                </Form.Group>
                <Form.Group controlId="formLinkTags">
                    <Form.Label>List of Tags</Form.Label>
                    <Form.Control as="textarea" rows={2} placeholder="Enter tags separated by a comma" value={tags} onChange={
											e => {
												const data = e.target.value;
												const tagArr = data.split(',');
												const linkTagsArr = tagArr.map(tag => {
													return tag;
												});
												setLinkTags(linkTagsArr);
											}
										} />
                </Form.Group>
								{
									error && (
										<span>
											{error}
										</span>
									)
								}
                <Button variant="secondary" type="submit" block disabled={submitting} onClick={
									() => handleSubmit({linkName, comment, tags})
								}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateLink
