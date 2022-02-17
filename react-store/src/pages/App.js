import React from 'react';

import Header from '../components/Header';

class App extends React.Component {
  render() {
    return (
      <div className='main'>
          <Header nickname="Admin" age={28} marry={true}/>
      </div>
    );
  }
}

export default App;