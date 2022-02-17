import React from 'react';

// class Header extends React.Component{

//     // linkRender(){
//     //     const nickname = this.props.nickname;
//     //     if(nickname){
//     //         return (
//     //         <span className='nickname'><i className='far fa-user'></i>{this.props.nickname}</span>
//     //         )
//     //     }else{
//     //         return(
//     //             <React.Fragment>
//     //                 <a href="/">Login</a>
//     //                 <a href="/">Register</a>
//     //             </React.Fragment>
//     //         )
//     //     }
//     // }

//     render(){
//         return(
//             <div className="header">
//                 <div className="grid">
//                     <div className="start">
//                         <a href="/">Home</a>
//                     </div>
//                     <div className="end">
//                         {/* {this.linkRender()} */}
//                         {this.props.nickname ?
//                          (<span className='nickname'>
//                              <i className='far fa-user'></i>
//                              {this.props.nickname}</span>) :
//                          (<React.Fragment>
//                             <a href="/">Login</a>
//                             <a href="/">Register</a>
//                         </React.Fragment>)}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }


// 改成 function component 
const Header = (props) => {
    return (

                    <div className="header">
                        <div className="grid">
                            <div className="start">
                                <a href="/">Home</a>
                            </div>
                            <div className="end">
                                {(props.nickname) ?
                                 (<span className='nickname'>
                                     <i className='far fa-user'></i>
                                     {props.nickname}</span>) :
                                 (<React.Fragment>
                                    <a href="/">Login</a>
                                    <a href="/">Register</a>
                                </React.Fragment>)}
                            </div>
                        </div>
                    </div>
    )
}



export default Header;