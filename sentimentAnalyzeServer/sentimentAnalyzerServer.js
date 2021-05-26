const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: api_key,
     }),
    serviceUrl: api_url,
 });
return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    const analyzeParams = {
        text: req.query.url,
        features: {
            emotion: {}
        }
    };
    
    let response = getNLUInstance().analyze(analyzeParams)
        .then(analysisResults => {
            let resultAnalysis = JSON.stringify(
                analysisResults.result.emotion.document.emotion, null, 2);
            return res.send(resultAnalysis);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send(err);
        });

});

app.get("/url/sentiment", (req,res) => {
        
    const analyzeParams = {
        text: req.query.url,
        features: {
            sentiment: {}
        }
    };
    
    let response = getNLUInstance().analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.sentiment.document.label);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send(err);
        });

});

app.get("/text/emotion", (req,res) => {
    
    const analyzeParams = {
        text: req.query.text,
        features: {
            emotion: {}
        }
    };

    let response = getNLUInstance().analyze(analyzeParams)
    .then(analysisResults => {
        let resultAnalysis = JSON.stringify(
            analysisResults.result.emotion.document.emotion, null, 2);
            return res.send(resultAnalysis);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send(err);
        });

});

app.get("/text/sentiment", (req,res) => {
    
    const analyzeParams = {
        text: req.query.text,
        features: {
            sentiment: {}
        }
    };
    
    let response = getNLUInstance().analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.sentiment.document.label);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send(err);
        });

});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})


//////////////////////////////////////////////////////////////////////////////////

/*
Esta función, crea una instancia de acceso al servicio de NLU a través de unas credenciales de API
que están alojadas en el archivo ".env"


function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_KEY;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: api_key,
    }),
    serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}
*/


///////////////////////////////////////////////////////////////////////////////////
/*

Esta sección del código maneja el análisis del texto guardandolo en una constante y determinando cual "feature"
es la que será analizada por el NLU (en este caso es el "sentiment")

El segundo bloque del código maneja la promesa que resuelta devuelve el los valores resultante del análisis

const analyzeParams = {
  'url': 'www.wsj.com/news/markets',
  'features': {
    'sentiment': {
    }
  }
};


naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
*/

/////////////////////////////////////////////////////////////////////////////////


