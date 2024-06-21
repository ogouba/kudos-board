
import { useState } from 'react'

function KudosCardModal({handleCreateKudoCards}){

    const [author, setAuthor] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [category, setCategory] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    
    const handleCreateButton = (event) => {
        handleCreateKudoCards({author: author, imageUrl:imageUrl, category: category, title:title, description: description})
    }
    return(
        <>
        <div className="modal" id ="createBoardModal" tabIndex="-1">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Kudo card</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>
                    Kudo Card Information
                </p>
                <img src = "" onChange={(e) => setImageUrl(e.target.value)}></img>
                <div className = "row">
                    <div className="col-3">board Title:</div>
                    <div className="col-9">
                        <input type="text" className ="form-control" placeholder= "title goes here" id ="cardBoardTitle" onChange={(e) => setTitle(e.target.value)}></input>
                     </div>
                </div>
                <div className = "row">
                    <div className="col-3">description:</div>
                    <div className="col-9">
                        <input type="text" className ="form-control" placeholder= "description goes here" id ="cardBoardDescription" onChange={(e) => setDescription(e.target.value)}></input>
                     </div>
                </div> 
                <div className = "row">
                    <div className="col-3">author:</div>
                    <div className="col-9">
                        <input type="text" className ="form-control" placeholder= "Author goes here" id ="cardBoardAuthor" onChange={(e) => setAuthor(e.target.value)}></input>
                     </div>
                </div> 
                <select className="form-select" onChange={(e) => setCategory(e.target.value)}>
                    <option > Inspiration </option>
                    <option > thank you </option>
                    <option > celebration</option>
                </select>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleCreateButton}>Save changes</button>
            </div>
            </div>
            </div>
        </div>
        </>
    
    )   
}
export default KudosCardModal