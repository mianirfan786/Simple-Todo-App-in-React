import React , {useState} from 'react';
import {Table, Modal, Button, Form, Dropdown, DropdownButton} from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';

// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { MdDeleteForever } from 'react-icons/md';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './scss/todo.scss';
toast.configure();





function App() {
  // const [items, setItems] = useState();
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setMovieName('');
    setMovieDirector('');
    setSelectGenre('');
    setEditItem(false);
  }
  const handleShow = () => setShow(true);
  const handleDeleteShow = (handleid) =>{
    setDeleteShow(true);
    setMovieId(handleid);
  } 
  const handleDeleteClose = () => setDeleteShow(false);
  const [movieName, setMovieName] = useState('');
  const [movieDirector, setMovieDirector] = useState('');
  const[selectGenre, setSelectGenre] = useState('');
  const [editItem, setEditItem] = useState(false);
  const [movieId, setMovieId] = useState('');
  const [movies, setMovies] = useState([
    {
    id:1,
    nameMovie:'Love Story',
    nameDirector: 'Zubair',
    genre:'Romantic'

  }
  ]);


  const movieChange = (event) =>{
    setMovieName(event.target.value);
  } 
  const movieDirectorChange = (event) =>{
    setMovieDirector(event.target.value);
  } 


  const movieGenreChange = (event) => {

    setSelectGenre(event.target.value);
    // console.log(event.target.value);
    
  }

   const addMovie = (e) =>{
         e.preventDefault();
         console.log(editItem);
         
        if(editItem !== true && movieName !== '' && movieDirector !== '' && selectGenre !==''){
          const MovieInput = {
          id: Math.random()*(1,10),
          nameMovie: movieName,
          nameDirector:movieDirector,
          genre: selectGenre,
         

        }
        const movieList = [...movies, MovieInput ];
        console.log(movieList);
        setMovies(movieList);
         
        toast.success('You have Successfully Added Record.', {position: toast.POSITION.BOTTOM_LEFT});

       
      }else if(editItem !== false && movieName !== '' && movieDirector !== ''){
          console.log(movieId);
         
          // NewArray[checkthis].completed = true;
          setMovies(
            movies.map((elemData) => {
              if(elemData.id == movieId){
                return {...elemData, nameMovie: movieName , nameDirector: movieDirector, genre:selectGenre}
              }
              return elemData;
            })
          );

          
          toast.success('You have Successfully Updated Record.', {position: toast.POSITION.BOTTOM_LEFT});

        
      }else{
        toast.error('Please Fill the all Fields.', {position: toast.POSITION.BOTTOM_LEFT});

      }
      
        
        // setMovies(movieList);
      
       

        setMovieName('');
        setMovieDirector('');
        setSelectGenre('');
        handleClose(true);
        
  }

  const removeMovie = (movieId) => {
 
      // Calling toast method by passing string
     
        console.log(movieId);
    const removeItem =   movies.filter((movieData) => {
         return movieData.id !== movieId;
       });
       setMovies(removeItem);
       setDeleteShow(false);
       toast.success('You have Successfully Deleted Record.', {position: toast.POSITION.BOTTOM_LEFT});
      //  toast('You have Successfully Deleted.');
  
  }
  


  const editMovie = (movId) => {
      
      //  console.log(movId);
      //  const movieData = movies.filter((movData) => {
      //    return movData.id !== movId;
      //  });
       const selectedItems = movies.find((item) => {
         return item.id === movId;
       });

     
         console.log(selectedItems);
  
        handleShow(true);
        setMovieId(selectedItems.id);
       setMovieName(selectedItems.nameMovie);
       setMovieDirector(selectedItems.nameDirector);
       setSelectGenre(selectedItems.genre);
       setEditItem(true);
    
       
  }

 
  return (
    <div className='body'>
  <div className='container-fluid container_main'>
      <div className='row'>
        <div className='col-md-8 offset-md-2 columncontainer'>
          <div className='headingSections'>
          <h1>
           New Movies
         </h1>

         <Button className="btnAddMovie" onClick={handleShow}>
        {editItem ? 'Edit Movie' : 'Add Movie' }
      </Button>
          </div>
          
         

<div className='MoviesListContainer'>


         <div className='tables_listContainer'>
               <div className='tablelistHeadingContainer'>
               <div className='indexId'>#</div>
                   <div className='nameMovie'>Movie Name</div>
                   <div className='nameMovie'>Movie Director</div>

                   <div className='genremovie'>Movie Genre</div>
                   <div className='editicon'>Actions</div>
               </div>
            <div className='moviesListContainer'>
               {movies.map((data, ind)=> {
               return(
                 <div className='listInsideContainer'>
                   <div className='indexId'>{ind}</div>
                   <div className='nameMovie'>{data.nameMovie}</div>
                   <div className='nameMovie'>{data.nameDirector}</div>
                   <div className='genremovie'>{data.genre}</div>
                   <div className='editicon'>
                   <FiEdit className='editicondesign' onClick={() => editMovie(data.id)} />
                   {/* <MdDeleteForever className='deleteiconDesign'  onClick={()=>removeMovie(data.id)} /> */}
                   <MdDeleteForever className='deleteiconDesign'  onClick={()=>handleDeleteShow(data.id)} />
                 
                   </div>

                   </div>
               )
              })
            }
            </div>
         </div>
         
</div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='headingModal'> {editItem ? 'Edit Movie' : 'Add Movie' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={addMovie}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Movie Name</Form.Label>
    <Form.Control type="text" placeholder="Enter Movie Name" value={movieName}
    onChange={movieChange} />
   
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>DirectorName</Form.Label>
    <Form.Control type="text" placeholder="Movie Type" value={movieDirector} onChange={movieDirectorChange} />
  </Form.Group>
  <Form.Group className='mb-3' controlId='formBasicGenre'>
         <Form.Label>Select Genre</Form.Label>
         <Form.Select onChange={movieGenreChange} defaultValue={selectGenre}>
  <option value="">Select Movie Genre</option>
  <option value="Comedy">Comedy</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Action">Action</option>
  <option value="Sad">Sad</option>
  <option value="Romantic">Romantic</option>
</Form.Select>
  </Form.Group>

  <Button className={editItem ? 'yesDelete' :'addBtn'} type="submit" >
    {editItem ? 'Edit Movie' : 'Add Movie'}
  </Button>
</Form>
        </Modal.Body>
        </Modal>

  <br />
  

  <Modal
        show={deleteShow}
        onHide={handleDeleteClose}
        // backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header closeButton>
       
        </Modal.Header> */}
        <Modal.Body >
          <h3 className='headingDelete'>
           Are you sure to delete this record? 
          </h3>
          <div className='btnsDeletepopup'>
            <Button className='noDelete' onClick={handleDeleteClose}>
                Cancel!
            </Button>
            <Button className='yesDelete' onClick={() =>removeMovie(movieId) }>
                Confirm?
            </Button>

          </div>
        
        </Modal.Body>
        </Modal>


  </div>
  
  </div>
  );
}

export default App
