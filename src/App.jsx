import React, { useState } from 'react';
import html2canvas from 'html2canvas';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchQuote = () => {
    fetch('https://dummyjson.com/quotes/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data.quote);
        setAuthor(data.author);
      })
      .catch(error => console.error('Error fetching quote:', error));
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    html2canvas(document.getElementById('quote-container')).then(canvas => {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quote-image.png';
      a.click();
    });
  };

  // const handleImageLoad = e => {
  //   setContainerWidth(e.target.width);
  // };

  return (
    <>
    <div>
      <button onClick={fetchQuote}>Get Quote</button>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageUrl && (
        <div>
         <div id="quote-container" style={{ position: 'relative' }}>
          <img className='uploaded_img' src={imageUrl} alt="Uploaded" />
         
          <div className='quote_box'>
            <p className='quote'>{quote}</p>
            <p className='author'>- {author}</p>
          </div>
         </div>
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
    </>
  );
}

export default App


/* 
import React, { useState } from 'react';
import html2canvas from 'html2canvas';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchQuote = () => {
    fetch('https://dummyjson.com/quotes/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data.quote);
        setAuthor(data.author);
      })
      .catch(error => console.error('Error fetching quote:', error));
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    html2canvas(document.getElementById('quote-container')).then(canvas => {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quote-image.png';
      a.click();
    });
  };

  // const handleImageLoad = e => {
  //   setContainerWidth(e.target.width);
  // };

  return (
    <>
    <div>
      <button onClick={fetchQuote}>Get Quote</button>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageUrl && (
        <div>
         <div id="quote-container" style={{ position: 'relative' }}>
          <img className='uploaded_img' src={imageUrl} alt="Uploaded" />
         
          <div className='quote_box'>
            <p className='quote'>{quote}</p>
            <p className='author'>- {author}</p>
          </div>
         </div>
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
    </>
  );
}

export default App */


//https://dummyjson.com/quotes/random