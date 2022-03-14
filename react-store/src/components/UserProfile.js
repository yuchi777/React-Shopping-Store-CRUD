import React from 'react';

//從Header打開UserProfile彈出視窗並帶入props的user資料

export default function UserProfile(props) {
    return (
        <div className="user-profle">
            <p className="title has-text-centered">Profile</p>

            <fieldset disabled>

                <div className="field">
                    <div className="control">
                        <label className="label label-flex">Nickname</label>
                        <input className="input" type="text" defaultValue={props.user.nickname} />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <label className="label label-flex">Email</label>
                        <input className="input" type="text" defaultValue={props.user.email} />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <label className="label label-flex">Type</label>
                        <input className="input" type="text" defaultValue={props.user.type === 1 ? 'Manger' : 'General User'} />
                    </div>
                </div>

            </fieldset>

            <br />
            <br />
            <div className="field is-grouped is-grouped-centered">
                <div className="control">
                    <button className="button is-danger">Logout</button>
                </div>
                <div className="control">
                    <button className="button" type="button" onClick={()=>{
                        props.close();
                    }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}