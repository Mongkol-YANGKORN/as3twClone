
import { useState } from "react";
import LikeButton from './LikeButton';

const startText ={
  content:""
}

function App() {
  // state
  const [textContent, setTextContent] = useState(startText);
  const [editText, setEditText] = useState(null);
  const [allTexts, setAllTexts] = useState([]);

  // function input
  function onTextValueChange(event){
      const {name, value} = event.target;
      setTextContent((prevTextContent) => {
          return {
              ...prevTextContent,
              [name]: value,
          };
      });
  }

  function onEditTextValueChange(event){
      const {name, value} = event.target;
      setEditText((prevTextContent) => {
          return{
              ...prevTextContent,
              [name]: value,
          };
      });
  }

  // function tweet
  function onTextSubmit(event){
      event.preventDefault();

      setAllTexts((prevAllTexts) => {
          const newText = { ...textContent };
          newText.id = allTexts.length+1;
          return [newText,...prevAllTexts];
      });
      setTextContent(startText);
  }

  //function edit
  function onEditTextSubmit(event){
      event.preventDefault();

      setAllTexts((prevAllTexts) => {
          return prevAllTexts.map((theText) => {
              if(theText.id !== editText.id) return theText;
              return editText;
          });
      });
      setEditText(null);
  }

  //fn delete
  function onTextDelete(textId){
      setAllTexts((prevAllTexts) => {
          return prevAllTexts.filter((theText) => theText.id !== textId);
      });
  }


  const allTextElements = allTexts.map((theText) => {
      return(
          <div key={theText.id}>
              {theText.content}
              <LikeButton />
              <button onClick={() => setEditText(theText)}>
                  Edit
              </button>
              <button onClick={() => onTextDelete(theText.id)}>
                  Delete
              </button>
          </div>
      );
  });

  let editTextElement = null;
  if (!!editText){
      editTextElement = (
          <div>
              <form onSubmit={onEditTextSubmit}>
                  <textarea
                  rows="3"
                  placeholder="Input text"
                  name="content"
                  value={editText.content}
                  onChange={onEditTextValueChange}
                  />
                  <button type="submit">Update</button>
              </form>
          </div>
      )
  }

  return (
      <div>
          <form onSubmit={onTextSubmit}>
              <div>
                  tweet
              </div>
              <textarea
                  rows="3"
                  placeholder="Input text"
                  name="content"
                  value={textContent.content}
                  onChange={onTextValueChange}
              />
               <div>
              <button type="submit">
                  tweet
              </button>
          </div>
          </form>
         
          <div>
              {allTextElements}
          </div>
          <div>
              {editTextElement}
          </div>
      </div>
  )
}

export default App;
