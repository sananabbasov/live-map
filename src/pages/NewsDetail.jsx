import React, { useEffect, useState } from 'react';
import LocalLocation from '../components/LocalLocation';
import { useParams } from 'react-router-dom';

function NewsDetail() {
  const [newsItem, setNewsItem] = useState(null);

  // Assuming your route has a parameter named 'id'
  const { id } = useParams();

  useEffect(() => {
    // Fetch the news item by its ID
    fetch(`http://localhost:3001/news/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch news item with ID ${id}`);
        }
        return response.json();
      })
      .then((data) => {
        setNewsItem(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      <LocalLocation />
      {newsItem && (
        <div className="news-detail p-4">
          <h2 className="text-2xl font-semibold mb-4">{newsItem.title}</h2>
          <p className="text-gray-700">{newsItem.description}</p>
          <p className="text-gray-500 mt-2">Publication Date: {newsItem.publicationDate}</p>
          <div className="flex justify-center items-center mt-4">
            {/* <img src={newsItem.photoUrl} alt={newsItem.title} className="w-32 h-32" />  */}
          </div>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}

export default NewsDetail;
