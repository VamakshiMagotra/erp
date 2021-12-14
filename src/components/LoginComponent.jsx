import React from 'react';

const LoginComponent = () => {
    return (
        <div className="container height-contain d-flex justify-content-center align-items-center">
            <div className="row">
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <div>
                        <h1 className="text-center">Sign In</h1>
                        <form action="#" method="post" className="login-details">
                            <div className="form-group first">
                                <label for="username">Username</label>
                                <input type="text" className="form-control" id="username" />
                            </div>
                            <div className="form-group last mb-4">
                                <label for="password">Password</label>
                                <input type="password" className="form-control" id="password" />
                            </div>
                            <div className="d-flex mb-5 align-items-center">
            
                                <div className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></div>
                            </div>
                            <input type="submit" value="Log In" className="btn btn-block btn-primary" />
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;