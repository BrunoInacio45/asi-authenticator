import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Generate2FA from '../../services/Generate2FA';

import './Login.scss';

class Login extends Component {

   constructor(props) {
      super(props);

      this.state = {
         login: '',
         pass: '',
         code: null,
         showInputCode: false,
         logged: false,
         error: false
      }
   }

   submit() {
      if (this.state.login === 'meuemail@email.com' && this.state.pass === 'admin123' && !this.state.code) {
         this.setState({ showInputCode: true })
         this.setState({ error: false })
         localStorage.setItem('email', this.state.login)
      } else if (this.state.login === 'meuemail@email.com' && this.state.pass === 'admin123' && this.state.code) {
         const generate = new Generate2FA();
         const result = generate.verifyTOTP(this.state.code, localStorage.getItem('secret'));
         this.setState({ logged: result })
         this.setState({ error: !result })
      } else {
         this.setState({ error: true })
      }
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   }

   redirect2fa = () => {
      this.props.history.push('double-factor')
   }

   render() {

      if (this.state.logged) {
         return (
            <div style={{ fontSize: 45 }}>
               Logado!
            </div>
         );
      } else {
         return (
            <div className="box">
               <MuiThemeProvider>
                  <div className="groupInput">
                     <TextField
                        hintText="Digite seu e-mail"
                        floatingLabelText="E-mail"
                        className="input"
                        onChange={event => {
                           const { value } = event.target;
                           this.setState({ login: value })
                        }}
                        defaultValue={this.state.login}
                     />
                     <br />
                     <TextField
                        type="password"
                        hintText="Digite sua senha"
                        floatingLabelText="Senha"
                        className="input"
                        onChange={event => {
                           const { value } = event.target;
                           this.setState({ pass: value })
                        }}
                        defaultValue={this.state.pass}
                     />
                     <br />

                     {this.state.showInputCode
                        &&
                        <div style={{ display: 'inline-grid' }}>
                           <TextField
                              type="number"
                              hintText="Digite o código de segurança"
                              floatingLabelText="Código"
                              className="input"
                              onChange={event => {
                                 const { value } = event.target;
                                 this.setState({ code: value })
                              }}
                              defaultValue={this.state.code}
                           />
                           <RaisedButton label="Ainda não possuo um código" primary={false} className="btnCode" onClick={() => this.redirect2fa()} />
                        </div>}

                     <br />
                     <RaisedButton label="Logar" primary={true} className="btnLogin" onClick={() => this.submit()} />
                  </div>
                  {
                     this.state.error &&
                     <div style={{ textAlign: 'center', marginTop: 20 }}>
                        Dados inválidos!
                     </div>
                  }

               </MuiThemeProvider>
            </div>
         );
      }

   }
}

export default Login;