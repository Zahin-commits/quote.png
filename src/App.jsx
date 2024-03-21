import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

function App() {

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [imgUrl, setImgUrl] = useState('https://random-image-pepebigotes.vercel.app/api/random-image');
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [showQuote,setShowQuote] = useState(false); 

  const fetchQuote = () => {
    fetch('https://dummyjson.com/quotes/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data.quote);
        setAuthor(data.author);
      })
      .catch(error => console.error('Error fetching quote:', error));
  };

useEffect(()=>{
  fetchQuote();
},[])

  const handleDownload = () => {
    html2canvas(document.getElementById('quote-container')).then(canvas => {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quote-image.png';
      a.click();
    });
  };

  const handleImg = async()=>{
    // setImgUrl('https://random-image-pepebigotes.vercel.app/api/random-image?t=' + new Date().getTime());
    setIsImgLoading(true);
    setImgUrl('https://random-image-pepebigotes.vercel.app/api/random-image?t=' + performance.now());
    console.log('clicked');
  }

  const handleImageLoad = () => {
    setIsImgLoading(false);
    setShowQuote(true);
  };

  const handleImageError = () => {
    setIsImgLoading(false);
  };

  return (
    <>
    <div id='main'>
     
     <div className='display'> {(imgUrl && quote) ? (
        
         <div id="quote-container" style={{ position: 'relative' }}>
          <img className='uploaded_img' 
           src={imgUrl} 
           onLoad={handleImageLoad}
           onError={handleImageError}
           alt="Uploaded" />
          {/* <img className='uploaded_img' src={"https://random-image-pepebigotes.vercel.app/api/random-image"} alt="Uploaded" /> */}
         
          <div className='quote_box'>
          {showQuote && <>
             <p className='quote'>{quote}</p>
             <p className='author'>- {author}</p>
           </>
          }
          </div>
         </div>
      ) :
      (
          <div className="spinner"></div>
      )
       } </div>

       <div className="input_btn">
       <button className='btn get_quote' onClick={fetchQuote}>Change Quote</button>

        <button className="btn get_img" onClick={handleImg}>
        {isImgLoading ? 'Loading...' : 'Refresh Image'}
        </button>
      </div>

      <button className='btn download' onClick={handleDownload}>Download</button>
    </div>
    </>
  );
}

export default App



//https://dummyjson.com/quotes/random
//https://random-image-pepebigotes.vercel.app/api/random-image