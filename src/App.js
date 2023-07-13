import './App.css';
import React, {useEffect, useState} from 'react';
import {marked} from 'marked'
import docsval from './data.json'
const App = () => {
  // const [code, setCode] = useState('## Hello')
  // const [compiled, setCompiled] = useState('<h2 id="hello">Hello</h2>')

  const [code, setCode] = useLocalStorage('code', '## Hello');
  const [compiled, setCompiled] = useLocalStorage('compiled','<h2 id="hello">Hello</h2>')
  const [hide1, hidePreview] = useState(true)
  const [hide2, hideMd] = useState(false)
  const [hide3, hideDocs] = useState(false)
  const [clicked,setClicked] = useState('markdown')
  // const [docsval,setDocsval] = useLocalStorage('docs',[])
  // const api_url="https://www.markdownguide.org/api/v1/basic-syntax.json";

  const openMD = () => {
    console.log(0)
    hideMd(false)
    hidePreview(true)
    hideDocs(true)
    setClicked ('markdown')

  }

  const openPreview = () => {
    console.log(0)
    hidePreview(false)
    hideDocs(true)
    hideMd(true)
    setClicked ('preview')
  }

  const openDocs = () => {
    console.log(0)
    hidePreview(false)
    hideMd(false)
    hideDocs(true)
    setClicked ('docs')
  }


  const handleChange = (e) => {
    setCode(e.target.value)
    setCompiled(marked.parse(e.target.value))
  }
  // useEffect(() => {
  //   fetch(api_url).then((res )=>res.json() ).then((data)=>setDocsval(data.basic_syntax))
  //   console.log(docsval)
    
    
  // }, [docsval]);
  
  function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
      const item = window.localStorage.getItem(key);
      return item ? (item) : initialValue;
    });
    
    useEffect(() => {
      window.localStorage.setItem(key, (value));
      console.log(docsval.basic_syntax)
    }, [key, value]);
  
    return [value, setValue];
  }

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD}  className={`${clicked==='markdown' ? "btn" : ""}`}>MarkDown</button>
          <button onClick={openPreview}  className={`${clicked==='preview' ? "btn" : ""}`}>Preview</button>
          <button onClick={openDocs} className={`${clicked==='docs' ? "btn" : ""}`}>Docs</button>
        </div>
        {
        hide1 ? 
          <div>
            <textarea onChange={handleChange} value={code}/>
          </div> : 
           ""
        }
        {
          hide2 ?
          <div>
            <textarea value={compiled}/>
          </div>: ""
        }
        
        {
          hide3 ?
          <div className="">
           <div className="row">
          {docsval.basic_syntax.map((doc)=>{
           return ( <div className="card" key={doc.name}>
           <h1 className='name'>{doc.name}</h1>
           <p className='description'>{doc.description}</p>
           
           <h1 className='name3'>Examples........</h1>
           {doc.examples.map((ex)=>{
           return ( <div className="card" key={ex.name}>
            <h1 className='name2'>markdown</h1>
           <p className='description'>{ex.markdown}</p>
           <h1 className='name2'>html</h1>
           <p className='description'>{ex.html}</p>
 

         </div>);
          })
          
          
          }
          
         </div>);
          })
          
          
          }

        </div>
          </div>: ""
        }

      </div>
    </>
  )
}


export default App;
