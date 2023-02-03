
import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth';
import { db , auth , storage} from './config/firebase';
import {getDocs,collection,addDoc, deleteDoc , doc, updateDoc} from "firebase/firestore"
import {ref,uploadBytes} from "firebase/storage"
// import { upload } from '@testing-library/user-event/dist/upload';

function App() {
  const [movies,setMovies] = useState([]);
  
  // NEW MOVIE STATES
  const [newMovie, setNewMovie] = useState("");
  const [releaseDate , setReleaseDate] =useState(0);
  const [status , setStatus] = useState(true);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updateDate , setUpdatedDate] = useState(releaseDate);

  // File Upload State
  // const [fileUpload , setFileUpload] = useState(null);
  

  const moviesCollectionRef = collection(db,"movies");

  // A function which will be used to get the Mocie List
  const getMovieList = async() => {
    // read the data from database and set the movielist
    try{
    const data = await getDocs(moviesCollectionRef)
    const fileredData  = data.docs.map((doc)=>({
      ...doc.data(),
      id: doc.id,
    }))
    // console.log(fileredData);
    setMovies(fileredData);
    }catch(err){
      console.error(err);
    }
  }
  useEffect(()=>{
    getMovieList();
  },[])
  
  const onSubmitMovie = async()=>{
    try{
    await addDoc(moviesCollectionRef  , 
      {title : newMovie,
      releaseDate : releaseDate,
      receivedAnOscar : status,
      userId: auth ?.currentUser ?.uid ,
      })
    
    getMovieList();
    }
    catch(err)
    {
      console.errror(err);
    }
  }

  
  const deleteMovie = async(id) => {
    try{
      const movieDoc = doc(db , "movies" , id);
      await deleteDoc(movieDoc);
      getMovieList();
    }
    catch(err)
    {
      console.error(err);
    }
  }


  const updateMovie = async(id) =>{
      const newDoc = doc(db, "movies" ,id);
      await updateDoc(newDoc , {title : updatedTitle , releaseDate : updateDate});
      getMovieList();
  }

  // const uploadFile = async()=>{
  //   if(!fileUpload)return;
  //   const filesFolderRef =  ref(storage , `projectFile/${fileUpload.name}
  //   `);
  //   try{
  //   await uploadBytes(filesFolderRef,fileUpload);}
  //   catch(err){
  //     console.error(err);
  //   }
  // };
  return (
    <div className="App">
      <h1>Firebase Course</h1>
      <Auth />
      <br />
      <div>
        <input placeholder='Enter movie name ....' onChange={(e)=>{setNewMovie(e.target.value)}} />

        <input placeholder='Enter released date ...'  type="number" onChange={(e)=>{setReleaseDate(Number(e.target.value))}}/>

        <input type="checkbox"  onChange={(e)=>{setStatus(e.target.checked)}} />
        <label>Received an Oscar</label>
        <br />

        <button onClick={onSubmitMovie}>Submit</button>

      </div>
      <div>
        {movies.map((movie)=>(
          <div>
            
            <h1 style = {{color : movie.receivedAnOscar ? "green" : "red"}}>{movie.title}</h1>
            <p style={{fontSize: "20px" , color : "purple" , fontFamily :"sans-serif"}}>{movie.releaseDate}</p>
            <button onClick ={()=>deleteMovie(movie.id)}> Delete</button>

            <input placeholder="Enter the new title  ...." onChange={(e)=>{setUpdatedTitle(e.target.value)}}/>
            <input placeholder="Enter the new date ..." onChange={(e)=>{setUpdatedDate(Number(e.target.value))} } />
            <button onClick={()=>updateMovie(movie.id)}>Update</button>
          </div>
        ))}
      </div>


      {/* <div>
        <input type="file" onChange={(e)=>setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div> */}

    </div>
  );
}

export default App;
