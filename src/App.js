import React , {useState} from 'react';
import {Table, Modal, Button, Form} from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  // const [items, setItems] = useState();
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setMovieName('');
    setMovieType('');
    setEditItem(false);
  }
  const handleShow = () => setShow(true);
  const handleDeleteShow = (handleid) =>{
    setDeleteShow(true);
    setMovieId(handleid);
  } 
  const handleDeleteClose = () => setDeleteShow(false);
  const [movieName, setMovieName] = useState('');
  const [movieType, setMovieType] = useState('');
  const [editItem, setEditItem] = useState(false);
  const [movieId, setMovieId] = useState('');
  const [movies, setMovies] = useState([
    {
    id:1,
    nameMovie:'ds',
    genre:'fa'

  }
  ]);


  const movieChange = (event) =>{
    setMovieName(event.target.value);
  } 
  const movieTypeChange = (event) =>{
    setMovieType(event.target.value);
  } 
   const addMovie = (e) =>{
         e.preventDefault();
         console.log(editItem);
         
        if(editItem !== true && movieName !== '' && movieType !== ''){
          const MovieInput = {
          id: Math.random()*(1,10),
          nameMovie: movieName,
          genre: movieType,
         

        }
        const movieList = [...movies, MovieInput ];
        console.log(movieList);
        setMovies(movieList);
       
      }

        if(editItem !== false && movieName !== '' && movieType !== ''){
          // console.log(movieId);
         
          // NewArray[checkthis].completed = true;
          setMovies(
            movies.map((elemData) => {
              if(elemData.id == movieId){
                return {...elemData, nameMovie: movieName , genre: movieType}
              }
              return elemData;
            })
          );
        
      }
      
        
        // setMovies(movieList);
      
       

        setMovieName('');
        setMovieType('');
        handleClose(true);

  }

  const removeMovie = (movieId) => {
        console.log(movieId);
    const removeItem =   movies.filter((movieData) => {
         return movieData.id !== movieId;
       });
       setMovies(removeItem);
       setDeleteShow(false);
  }
  


  const editMovie = (movId) => {
      
       console.log(movId);
       const movieData = movies.filter((movData) => {
         return movData.id !== movId;
       });
       const selectedItems = movies.find((item) => {
         return item.id === movId;
       });

     
         console.log(selectedItems);
  
        handleShow(true);
        setMovieId(selectedItems.id);
       setMovieName(selectedItems.nameMovie);
       setMovieType(selectedItems.genre);
       setEditItem(true);
    
       
  }

 
  return (
    <div className='body'>
  <div className='container-fluid container_main'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 columncontainer'>
          <div className='headingSections'>
          <h1>
           New Movies
         </h1>

         <Button className="btnAddMovie" onClick={handleShow}>
        Add Movie
      </Button>
          </div>
          
         

<div className='MoviesListContainer'>



         <Table  responsive>
           <thead>
             <tr className="text-center TableHeadingRow">
               <th>
                 #
               </th>
               <th>
                 Movie Name
               </th>
               <th>
                 Genre
               </th>
               <th>
                 Actions
               </th>
             </tr>
           </thead>
           {/* <tbody >
             {movies.map((data, index)=> {
               return(
                
                  <tr key={index} className='tableRow'>
                 <td className="text-center">
                   {index}
                 </td>
                 <td className="text-center">
                   {data.nameMovie}
                 </td>
                 <td className="text-center">
                  {data.genre}
                 </td>
                 <td className="text-center">
                
                 <FiEdit size={26} onClick={() => editMovie(data.id)} />
                 
                  
                  <MdOutlineDeleteSweep size={26}  onClick={()=>removeMovie(data.id)} />
                  

                
                 </td>
                 </tr>
                
               )
             })}
           </tbody> */}

         </Table>


         <div className='tables_listContainer'>
               <div className='tablelistHeadingContainer'>

               </div>
            <div className='moviesListContainer'>
               {movies.map((data, ind)=> {
               return(
                 <div className='listInsideContainer'>
                   <div className='indexId'>{ind}</div>
                   <div className='nameMovie'>{data.nameMovie}</div>
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
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={addMovie}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Movie Name</Form.Label>
    <Form.Control type="text" placeholder="Enter Movie Name" value={movieName}
    onChange={movieChange} />
   
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Movie Genre</Form.Label>
    <Form.Control type="text" placeholder="Movie Type" value={movieType} onChange={movieTypeChange} />
  </Form.Group>

  <Button variant={editItem ? 'primary' : 'success'} type="submit" >
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
