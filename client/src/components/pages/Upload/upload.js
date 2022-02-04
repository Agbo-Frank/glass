import { useRef, useState } from 'react'
import {useMutation} from '@apollo/client'
import { Alert } from '../../Alert/Alert'
import { AlertFunc } from '../../../Apollo/reactiveVariables/Alert'
import Title from '../../Title/Title'

function Upload(){
    const name = useRef('')
    const price = useRef('')
    const description = useRef('')
    let file;
    const [images, setImage] = useState([])
    const [loading,setLoading] = useState(false)
    const token = localStorage.getItem('Token');

    function upload(e){
        for(let i = 0; i < e.target.files.length; i++){
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[i])
            reader.onload = () => {
                setImage(state => ([...state, reader.result]))
            }
        }
    }

    async function submit(e){
        e.preventDefault()

        let formData = new FormData();
        formData.append('name', name.current.value);
        formData.append('price', price.current.value);
        formData.append('description', description.current.value);
        for(let i = 0; i < images.length; i++){
            formData.append("images", images[i]);
        }

        setLoading(true)
        let res = await fetch("http://localhost:5500/upload/product", {
            method: 'POST',
            body: formData,
            headers: {
                'x-auth-token': token
            }
        })
        let data = await res.json()
        if(data){
            //set the loading to false
            setLoading(false)

            //empty the input value
            name.current.value = ''
            price.current.value = ''
            setImage('')
            
            //set the alert
            await setTimeout(() => AlertFunc({type: 'CLOSE_ALERT'}), 5000)
            data.product ?
            AlertFunc({type: 'SUCCESS_ALERT', data: 'successfully Uploaded'}) :
            AlertFunc({type: 'ERROR_ALERT', data: 'Upload unsuccessful try uploaing again'})
        }
    }
    return(
        <>
            <Title title="post your glass" location="upload" />
            <form onSubmit={(e) => submit(e)}>
                <h3>Upload your Glass</h3>
                <Alert />
                <div className="input-field">
                    {/* <i class="fas fa-user"></i> */}
                    <input 
                    type="text"
                    name='name'
                    placeholder="Enter the name of your glasses"
                    ref={name}/>
                </div>
                <div className="input-field">
                    {/* <i class="fas fa-lock"></i> */}
                    <input  
                    type="Number"
                    name='price' 
                    placeholder="enter the price of the glasses"
                    ref={price}/>
                </div>
                <div className="input-field">
                    {/* <i class="fas fa-lock"></i> */}
                    <textarea
                    name='Description' 
                    placeholder="Description of the glass"
                    ref={description}></textarea>
                </div>
                <div className="input-field upload">
                    {
                        images.length !== 0 ? 
                        <div className="upload-product">
                            <label htmlFor="myfile">
                                <i className="fa fa-image"></i>Add image of product
                                <input 
                                    type="file"   
                                    id="myfile" 
                                    name='file'
                                    ref={i => file = i}
                                    multiple
                                    onChange={(e) => upload(e)}/>
                            </label>
                            {
                                images.map((image, i) => (
                                    <img src={image} key={i}/>
                                ))
                            }
                        </div>:
                        <div className="upload-prompt">
                            <i className="fa fa-image"></i>
                            <p>
                                Upload Landing photo
                                <label htmlFor="myfile">
                                    browse
                                    <input 
                                    type="file"   
                                    id="myfile"
                                    name='file'
                                    ref={i => file = i}
                                    multiple 
                                    onChange={(e) => upload(e)}/>
                                </label>
                            </p>
                            <small>Supports: JPG, PNG, SVG</small>
                        </div>
                    }
                </div>
                <button type="submit">{loading ? 'Uploading...': 'Upload'}</button>
            </form>
        </>
    )
}

export default Upload