import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Typography } from '@mui/material'

function App() {
  const [image, setImage] = useState('')
  const [response, setResponse] = useState('')
  const uploadImage = () => {
    const formData = new FormData()
    formData.append('image', image, {
      filename: 'image.jpg', 
      contentType: 'image/jpeg',
    });
    axios.post('http://localhost:5000/predict', formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    }).then((res) => {
      console.log(res.data)
      setResponse(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <>
    <Typography variant='h1' align='center'>
      Plant Image Classification Using Flower Images
    </Typography>
    <div style={{marginTop:"10vh", display:"flex", justifyContent:"center"}}>
      <Card  sx={{width:"20vw", display:"flex", justifyContent:"center"}} >
        <div>
      <h1>select your image here</h1>
      <input type='file' name='file' onChange={(e)=> setImage(e.target.files[0])}></input>
      {
        image ? <img src={URL.createObjectURL(image)} alt='image' /> : null
      }
      <Response response={response}/>
      <Button variant='contained' onClick={uploadImage}>Submit</Button>
      </div>
      </Card>
    </div>
    </>
  )
}
function Response(props){
  if(props.response!==''){
    return(
      <div>
        <h1>Flower name {props.response.class_id}</h1>
        <h1>probability {props.response.probability}</h1>
      </div>
    )
  }
}

export default App
