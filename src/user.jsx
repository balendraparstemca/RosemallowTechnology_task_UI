import React from "react"
import './App.css';
import { connect } from "react-redux";
import { createAccount } from "./store/user";
class User extends React.Component {
    constructor(props) {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            cpassword: "",
            filename: ""
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCPassword = this.onChangeCPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    uploadSingleFile = (e) => {
        this.setState({
            filename: URL.createObjectURL(e.target.files[0]),
            imagecollection: e.target.files
        })
    }
    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }
    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }
    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onChangeCPassword(e) {
        this.setState({ cpassword: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.cpassword) {
            alert("password does't match ")
        }
        else {
            if (this.state.filename) {
                var formData = new FormData();

                for (const key of Object.keys(this.state.imagecollection)) {
                    formData.append('image', this.state.imagecollection[key])

                }

                formData.append('name', this.state.username)
                formData.append('password', this.state.password)
                formData.append('email', this.state.email)
            }
            this.props.dispatch(createAccount(formData)).then((res) => {
                alert("success")
              this.setState({username:"",email:"",password:"",cpassword:"",filename:""})
            }, (err) => {
                alert("fail")
                this.setState({username:"",email:"",password:"",cpassword:"",filename:""})
            })
        }

    }



    render() {
        let imgPreview;
        if (this.state.filename) {
            imgPreview = <img src={this.state.filename} alt="Avatar" className="img-responsive" />;
        }
        else {
            imgPreview = <img src="./Assets/Avatar.png" alt="Avatar" className="img-responsive" ></img>;

        }
        return (<React.Fragment>
            <div className="row">
                <div className="col-md-6 col-md-offset-3 ">
                    <div className="logo"><img alt="logo" src="./Assets/Logo.png"></img></div>
                    <form id="msform" onSubmit={this.onSubmit} encType='multipart/form-data'>

                        <ul id="progressbar">
                            <li className="active">
                                <div className="step-i"><img alt="1" className="img-responsive" src="./Assets/Wizard-Step1.png"></img> </div> STEP 1: <br /> CREATE YOUR
                                ACCOUNT PASSWORD
                            </li>
                            <li>
                                <div className="step-i"> <img alt="2" className="img-responsive" src="./Assets/Wizard-Step2.png"></img> </div> STEP 2: <br /> PERSONAL
                                INFORMATION
                            </li>
                            <li>
                                <div className="step-i"><img alt="3" className="img-responsive" src="./Assets/Wizard-Step3.png"></img> </div> STEP 3: <br /> EMPLOYMENT
                                DETAILS
                            </li>
                            <li>
                                <div className="step-i"><img alt="4" className="img-responsive" src="./Assets/Wizard-Step4.png"></img> </div> STEP 4: <br /> UPLOAD IMAGE
                            </li>
                            <li>
                                <div className="step-i"><img alt="5" className="img-responsive" src="./Assets/Wizard-Step5.png"></img> </div>STEP 5:<br />  COMPLETE
                            </li>
                        </ul>

                        <fieldset>
                            <div className="heading">
                                <h2 className="fs-title">CREATE YOUR ACCOUNT</h2>
                            </div>

                            <h3 className="fs-subtitle">Because there will be document that you need to prepare to apply for the
                                loan let's off by Creating a password so that you can login to your account once these documnet
                                ready
                            </h3>
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="avatar">{imgPreview}</div>
                                    <input type="file" id="myFile" name="filename" onChange={this.uploadSingleFile} required />
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label for="name">Name:</label>
                                        <input type="text" name="username" required className="form-control" value={this.state.username} onChange={this.onChangeUsername} />
                                    </div>
                                    <div className="form-group">
                                        <label for="pwd">Password:</label>
                                        <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} required />
                                    </div>

                                </div>
                                <div className="col-sm-4">

                                    <div className="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} required />
                                    </div>

                                    <div className="form-group">
                                        <label for="cpwd"> Confirm Password:</label>
                                        <input type="password" name="cpassword" className="form-control" value={this.state.cpassword} onChange={this.onChangeCPassword} />
                                    </div>
                                    <button type="submit" name="next" className="next action-button">SAVE & NEXT<img alt="icon" src="./Assets/arrow-right.png"></img></button>
                                </div>


                            </div>
                        </fieldset>

                    </form>


                </div>
            </div>

        </React.Fragment>)
    }

}

function mapStateToProps(state) {
    console.log(state)

    return {
        user: state.user
    };
}
export default connect(mapStateToProps)(User);

