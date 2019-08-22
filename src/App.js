import React from 'react';

import './style.scss';

import fileData from './fileData.json';
// import nameFromFileName from './nameSystem.js';

function App() {
  console.log(fileData);

  return (
    <div className='App'>
      <div className='intro'>
        <h1>POSTERS</h1>
        <h2>
          <a href='https://www.xypnox.com/'> by xypnox</a>
        </h2>
      </div>
      <div className='Gallary'>
        {fileData.map(fileName => {
          return (
            <div
              className='item'
              onClick={() => {
                window.open('images/' + fileName);
              }}
            >
              <img src={'images/' + fileName} alt='' srcSet='' />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
