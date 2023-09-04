import React, { useCallback, useState } from 'react'
import '../../../Styles/AddImage.css'
import { useDropzone } from 'react-dropzone'
import {MdNavigateNext} from 'react-icons/md'


export default function AddImage(props) {

  const {Image, setImage, id} = props;
  const [ImageName, setImageName] = useState('View Image')
  const [Click, setClick] = useState(false)

  const onDrop = useCallback(acceptedFiles => {
      setImage(acceptedFiles[0])
      setImageName(acceptedFiles[0].name)
  }, [])


  const {acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept:{
      'image/png':['.png'],
      'image/jpg':['.jpg'],
      'image/jpeg':['.jpeg']
    },
    maxFiles:1,
    maxSize:10000000,
    onDrop
  }) 

  return (
    <div className='Product-image-div'>
          
      <section className='dropzone-Image'> 
        <div {...getRootProps()}>
        <input {...getInputProps()} required/>
          <p>Drag and drop your image here</p>
          <p>Or, <strong>browse to upload</strong></p>
      </div>
      </section>
      <div className="Uploaded-image-Div">
          <span onClick={() => {setClick(!Click)}}>{ImageName}</span>
          <MdNavigateNext className='ShowImage' onClick={() => {setClick(!Click)}} style={Click ? {transform: "rotate(-90deg)"} : {transform: "rotate(90deg)"}}/>
          {Image ? (
            Click && <div className="Image-Preview">
                <img src={URL.createObjectURL(Image)} alt="Image-Photo" />
            </div>
          ) : (
            Click && <div className="Image-Preview">
                <img src={`http://localhost:5000/api/product/product-image/${id}`} alt="Image-Photo" />
            </div>
          )}
          
      </div>
    </div>
  )
}
