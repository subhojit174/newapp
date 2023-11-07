import React from 'react'
import loading from './spinner.gif'
//export class Spinner extends Component {
const Spinner=()=>{

//  render() {
    return ( 
      <div className='text-center'>
        <img src={loading} alt="loading" width={100}/>
      </div>
    )
//  }
}

export default Spinner
