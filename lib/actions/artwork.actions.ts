'use server'

//GET ALL ARTWORKS
export async function getAllArtworks(page = 1, limit = 10, query = '', category = '') {
  try {
    const fields = 'id,title,artist_display,date_display,main_reference_number,thumbnail,dimensions,department_title';
    const searchQuery = query ? `&q=${query}` : '';
    const categoryQuery = category ? `&category=${category}` : '';
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}${searchQuery}${categoryQuery}&fields=${fields}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

//GET ONE ARTWORK
export async function getArtworkById(artworkId: string) {
  try {
    const fields = 'id,title,artist_display,date_display,main_reference_number,thumbnail,dimensions,department_title';
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${artworkId}?fields=${fields}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
