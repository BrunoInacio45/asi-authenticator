import React, { Component } from 'react';
import QRCode from 'qrcode.react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Base32Enconde from 'base32-encode';
import base32 from 'hi-base32';
import Generate2FA from '../../services/Generate2FA';

import './DoubleFactor.scss'

class DoubleFactor extends Component {

   constructor(props) {
      super(props);

      this.state = {
         hash: '',
         code: '',
         logged: false
      }
   }

   componentDidMount() {
      const issuer = 'Asi';
      const user = localStorage.getItem('email')
      const secret = this.generateRandomNumber(32);
      this.setState({ hash: `otpauth://totp/${user}?secret=${secret}&issuer=${issuer}` })
   }

   generateRandomNumber(length) {
      const bytes = new Uint8Array(32);
      const randomNumer = window.crypto.getRandomValues(bytes);
      const encoder = base32.encode(randomNumer);
      localStorage.setItem('secret', encoder);
      return encoder;
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   }

   submit = () => {
      const generate = new Generate2FA();
      const result = generate.verifyTOTP(this.state.code, localStorage.getItem('secret'));
      this.setState({ logged: result })
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
               <div className="align-qrcode">
                  <div>
                     <QRCode value={this.state.hash} />
                  </div>
                  <MuiThemeProvider>
                     <div className="groupInput-df">
                        <TextField
                           hintText="Código"
                           floatingLabelText="Digite o código"
                           className="input-df"
                           onChange={event => {
                              const { value } = event.target;
                              this.setState({ code: value })
                           }}
                           defaultValue={this.state.code}
                        />
                        <br />
                        <RaisedButton label="Entrar" primary={true} className="btnLogin" onClick={this.submit} />
                     </div>
                  </MuiThemeProvider>
               </div>
            </div>
         );
      }



   }
}

export default DoubleFactor


/*export default function DoubleFactor() {

   const [stringCode, setStringCode] = useState('');

   useEffect(() => {
      const teste = 'otpauth://totp/Asi%3'// + `meuemail@gmail.com` + `?secret=` + `xxxx` + `&issuer=Asi`
      setStringCode(teste);
      console.log('otpauth://totp/Asi%3');
   }, []);


   return (

   );
}
*/