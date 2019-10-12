import React from 'react';
import { Carousel, Button, ButtonGroup } from 'react-bootstrap';
import './SigaInsta.scss';
import axios from 'axios';
import banner_1 from './img/eletricista-predial.png';
import insta from './img/siga-insta.png';
import { Link } from "react-router-dom";

export class SigaInsta extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            images: [],
            takeLast: 4,
            //escolha entre thumbnail (150), low_resolution (320), standard_resolution (640)
            quality: 'low_resolution'
        }
    }

    componentDidMount(){
        this.loadImages();
    }

   image = (url, text) => {
            return (<div class="col-md-3 col-6 insta no-print" >
            <a href="https://instagram.com/linhaverdeeletrica">
        <img src={url} alt={text}  className="img-fluid img-thumbnail"/>
        </a>
        </div>
    );
   }

     loadImages(){
            let REF = this;
              //procure gerador de token p/ instagram no google
              const token = "7764856011.1677ed0.2c650788f9834db5a9199561b947587c";
              //informe o insta id
              const instagram_id = "7764856011";
              const  url = "https://api.instagram.com/v1/users/"+instagram_id+"/media/recent?access_token="+token;
   
              return axios.get(url).then(function(response){
                  REF.setState({ images : response.data.data.slice(0, REF.state.takeLast) });
              });
       
    }

    render(){
        let REF = this;
        return (<section className="SigaInsta">
               <a href="https://instagram.com/linhaverdeeletrica">
                   <img src={insta} alt="Siga-nos no Instagram" className="d-block img-fluid " />
                   </a>
                   <div class="row">
            { 
                REF.state.images.map(function(pic){
                    let q = REF.state.quality;
                    return REF.image(pic.images[q].url, pic.caption.text);
                })
            
        }
        </div>
</section>)
    }
} 

export default SigaInsta;
