import React, { useState } from 'react'
import Image from 'next/image';
import axios from 'axios'

const TestPage = () => {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {        
    const body = new FormData();
    body.append("file", image);    
    const response = await axios.post("http://localhost:3000/api/posts/upload", {
      body
    });

    const { data } = response
    console.log(data)

  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center space-y-10'>
      {createObjectURL && <Image src={createObjectURL} width={100} height={100} alt="test image"/> }
      <input type="file" name="myImage" onChange={uploadToClient} className="text-center ml-16" />
      <button
        className="btn btn-primary"
        type="submit"
        onClick={uploadToServer}
      >
        Send to server
      </button>
    </div>
  )
}

export default TestPage