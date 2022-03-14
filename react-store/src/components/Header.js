import React from 'react';

//使用router
import { Link } from 'react-router-dom';

import Panel from './Panel';
import UserProfile from './UserProfile';



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

    const toProfile = () =>{
        Panel.open({
            component: UserProfile,
            //UserProfile的props
            props:{
                user:props.user
            },
            callback: data => {
                console.log(data);
            }
        })
    }

    return (

                    <div className="header">
                        <div className="grid">
                            <div className="start">
                                <Link to="/">Home</Link>
                            </div>
                            <div className="end">
                                {(props.user.nickname) ?
                                (<span className='nickname' onClick={toProfile}><i className='far fa-user'></i>{props.user.nickname}</span>) :
                                (<React.Fragment>
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </React.Fragment>)}
                            </div>
                        </div>
                    </div>
    )
}



export default Header;