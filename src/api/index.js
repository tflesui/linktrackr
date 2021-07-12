import axios from 'axios';

export async function getLinks() {
  try {
    const { data: { links } } = await axios.get('/api/links');
    return links;
  } catch (error) {
    throw error;
  }
}

export async function getSingleLink(id) {
  try {
    const { data: { link } } = await axios.get(`/api/links/${id}`);
    return link;
  } catch (error) {
    throw error;
  }
}

export async function getAllTags() {
  try {
    const { data: { tags } } = await axios.get('/api/tags');
    return tags;
  } catch (error) {
    throw error;
  }
}


export async function createLink(link) {
	try {
		await axios.post('/api/links/create',	{link})

		return true
	} catch (e) {
		console.error(e)

		return false
	}
}