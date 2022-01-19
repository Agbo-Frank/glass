import './loader.css'

function Loader(){
    return(
        <div className="loader">
            <div>
                <p><i className="fa fa-3x fa-spinner  fa-spin"></i></p>
                <p>Loading...</p>
            </div>
        </div>
    )
}

export default Loader