import { useRef, useState } from 'react'
import {useMutation} from '@apollo/client'
import { Alert } from '../../Alert/Alert'
import { AlertFunc } from '../../../Apollo/reactiveVariables/Alert'
import Title from '../../Title/Title'

function Upload(){
    const name = useRef('')
    const price = useRef('')
    const [image, setImage] = useState('')
    const [loading,setLoading] = useState(false)
    const token = localStorage.getItem('Token');

    function upload(e){
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImage(reader.result)
        }
    }

    async function submit(e){
        e.preventDefault()

        let docs = {
            name: name.current.value,
            price: price.current.value,
            image 
        }
        setLoading(true)
        let res = await fetch("/upload/product", {
            method: 'POST',
            body: JSON.stringify(docs),
            headers: {
                'Content-Type': 'application/json',
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
            console.log(data)
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
                    placeholder="Enter the name of your glasses"
                    ref={name}/>
                </div>
                <div className="input-field">
                    {/* <i class="fas fa-lock"></i> */}
                    <input  
                    type="Number" 
                    placeholder="enter the price of the glasses"
                    ref={price}/>
                </div>
                <div className="input-field upload">
                    {
                        image ? 
                        <img src={image} />:
                        <div className="upload-prompt">
                            <i className="fa fa-image"></i>
                            <p>
                                Upload Landing photo
                                <label htmlFor="myfile">
                                    browse
                                    <input 
                                    type="file" 
                                    name='image'  
                                    id="myfile" 
                                    onChange={(e) => upload(e)}/>
                                </label>
                            </p>
                            <small>Supports: JPG, PNG, SVG</small>
                        </div>
                    }
                </div>
                <button type="submit">{loading ? 'loading...': 'Upload'}</button>
            </form>
        </>
    )
}

export default Upload