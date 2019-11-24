import React, { Component } from 'react';
import QRCode from 'qrcode.react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Base32Enconde from 'base32-encode'

import './DoubleFactor.scss'

class DoubleFactor extends Component {

   state = {
      hash: ''
   }

   componentDidMount() {
      const issuer = 'Asi';
      const user = 'usuario@gmail.com'
      const secret = this.generateRandomNumber(32);
      this.setState({ hash: `otpauth://totp/${user}?secret=${secret}&issuer=${issuer}` })
   }

   generateRandomNumber(length) {
      const bytes = new Uint8Array(32);
      const randomNumer = window.crypto.getRandomValues(bytes);
      return Base32Enconde(randomNumer, 'RFC4648')
   }

   submit = () => {
      console.log('teste');
   }

   render() {
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