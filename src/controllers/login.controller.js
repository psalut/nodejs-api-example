const afipCtrl = {};
// const openssl = require('openssl-nodejs');

const xml2js = require('xml2js');
const parser = new xml2js.Parser({explicitArray: false, trim: true, tagNameProcessors: [xml2js.processors.stripPrefix]});

const CMS = `MIIG0wYJKoZIhvcNAQcCoIIGxDCCBsACAQExDTALBglghkgBZQMEAgEwggEEBgkq
hkiG9w0BBwGggfYEgfM8bG9naW5UaWNrZXRSZXF1ZXN0Pg0KICA8aGVhZGVyPg0K
ICA8dW5pcXVlSWQ+MjMyNDMyMzUyMzwvdW5pcXVlSWQ+DQogIDxnZW5lcmF0aW9u
VGltZT4yMDIyLTA5LTA5VDEzOjE0OjAwPC9nZW5lcmF0aW9uVGltZT4NCiAgPGV4
cGlyYXRpb25UaW1lPjIwMjItMDktMTBUMTM6MTM6MDA8L2V4cGlyYXRpb25UaW1l
Pg0KICA8L2hlYWRlcj4NCiAgPHNlcnZpY2U+d3NjcGU8L3NlcnZpY2U+DQo8L2xv
Z2luVGlja2V0UmVxdWVzdD6gggNKMIIDRjCCAi6gAwIBAgIIC/c0nph/NvIwDQYJ
KoZIhvcNAQENBQAwODEaMBgGA1UEAwwRQ29tcHV0YWRvcmVzIFRlc3QxDTALBgNV
BAoMBEFGSVAxCzAJBgNVBAYTAkFSMB4XDTIyMDYyNTAxNDk1OVoXDTI0MDYyNDAx
NDk1OVowLDEPMA0GA1UEAwwGcHNhbHV0MRkwFwYDVQQFExBDVUlUIDIwMzk4MjIz
MTAyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2FJRB8BetEztP1IZ
3lVIuQNdytS6vrv8yI2zmJeOlkoy8n/U00iDp5nLNuzvyJz5Xc+YoL7KjRBklxs/
L2StmbjvyuzhWmZXlp97Yg4B5aIGiBc1IGQBJaMwUjyD8215gK7QkrpCRlo25c+K
VLiXzDJUfmL9ExLblLU89BltyXmXAwZwm7nGZTEetC4vjxQix5fJFkZQFGo0Rmiw
6NbC0iV50sclH5WECYGnvBmAK8KvKT1VrkxDtYNxMe5Qtr81pmPd7ho49K6F8aYQ
k5VGaA5ZyexXdUzblOuF5hxo0prwJ/YMKTRiTEVjFPPiFiFxH50AnKUxWr4KdTad
eWgy9wIDAQABo2AwXjAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFLOy0//96bre
3o2vESGc1iB98k9vMB0GA1UdDgQWBBRR5auOinDkCCqJXkm9rh6PCoupoTAOBgNV
HQ8BAf8EBAMCBeAwDQYJKoZIhvcNAQENBQADggEBABdlBP/1ALAj7JL768Gy/Dbj
iRjmjpszGAL5uiPXLYivb+KvDtRH1CKsGNPFRC0QjUvZPLGR8mTeUhYUF2bcGJwa
R6Fc67mPmGDagwdt9qFa2XgGtTS7Gw+xkfsAGrHP0QOftIieWK8S7COI51PfXzeT
XIm1IYueNzPiIdJizcGLsJzUm+493PUCWROWInAsDYZNQNH0RZx/NyGnhrc5bwS4
+JXQzrX1rZ+0qodbuQnCYiGZ9g11k9ZCZX98J4idB8nbgPQZN7obEFX09R7Tmxwn
fzSJ7L345MrTNeAv1KzpZUBmWpBw7+m5nrSDCBbR2EY5MSY+weixKv9gSsdTcoYx
ggJUMIICUAIBATBEMDgxGjAYBgNVBAMMEUNvbXB1dGFkb3JlcyBUZXN0MQ0wCwYD
VQQKDARBRklQMQswCQYDVQQGEwJBUgIIC/c0nph/NvIwCwYJYIZIAWUDBAIBoIHk
MBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTIyMDkw
OTE3MjcyNVowLwYJKoZIhvcNAQkEMSIEIJyC3oGcEMPuIwuYcjsPYm0IW796pmOw
7pl7toqaK8TlMHkGCSqGSIb3DQEJDzFsMGowCwYJYIZIAWUDBAEqMAsGCWCGSAFl
AwQBFjALBglghkgBZQMEAQIwCgYIKoZIhvcNAwcwDgYIKoZIhvcNAwICAgCAMA0G
CCqGSIb3DQMCAgFAMAcGBSsOAwIHMA0GCCqGSIb3DQMCAgEoMA0GCSqGSIb3DQEB
AQUABIIBAA5XxXjR9CK9YrB8xM7f1lkDkfZNGJg23ZiLriP2jym4j6LbTLeGVSbs
fpv6qVyBGESltFMSMq4s8KVmh0Ssnl3ftHIHxkX5MrlXhPQMaQKUzOTN2Snkuxm+
nrP99FH32aZ2BEDXct3qBSSlagadTNunvD3Fj46JIt+nen0Fhj8nYSLG/wUG2Asn
G0WN6ZjPJ+nDbKro3X08qNHitbnhc+XVp19ctk2ZonVgXdcQUazMDxRyxceFro+D
UEuJ6Y7bsb0jTBQRyDOehV0PZWWtwnFJBet7X7EHhoJTTJY9jDxGX/JtinXYTibH
SyCYXGrBPKEiSqi2vyFxfApmy611YGE=`;

const xmlLogin = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsaa="http://wsaa.view.sua.dvadac.desein.afip.gov">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <wsaa:loginCms>
                            <wsaa:in0>`
                                +
                                CMS
                                +
                            `</wsaa:in0>
                        </wsaa:loginCms>
                    </soapenv:Body>
                </soapenv:Envelope>`;


const sign = 'ibCwr081zZd/vO7S0V/uPwefD5+dWJjY/cXNqHhfX5HNIA0ueL/AVDASFjdWB/eAtzDFOL90VY0s5TlUVq00c2J8KXCgWhKRPkrn3dYlb/lT282/aLCLCrtHEdVK1z6HG30mWs/KjmzA+Oev+4yOBVC5qAfRiCRSulegPpn8Y0Q=';
const token = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOSIgdW5pcXVlX2lkPSIyODg3ODk4NDU0IiBnZW5fdGltZT0iMTY2Mjc0NDQxMyIgZXhwX3RpbWU9IjE2NjI3ODc2NzMiLz4KICAgIDxvcGVyYXRpb24gdHlwZT0ibG9naW4iIHZhbHVlPSJncmFudGVkIj4KICAgICAgICA8bG9naW4gZW50aXR5PSIzMzY5MzQ1MDIzOSIgc2VydmljZT0id3NjcGUiIHVpZD0iU0VSSUFMTlVNQkVSPUNVSVQgMjAzOTgyMjMxMDIsIENOPXBzYWx1dCIgYXV0aG1ldGhvZD0iY21zIiByZWdtZXRob2Q9IjIyIj4KICAgICAgICAgICAgPHJlbGF0aW9ucz4KICAgICAgICAgICAgICAgIDxyZWxhdGlvbiBrZXk9IjIwMTExMTExMTEyIiByZWx0eXBlPSI0Ii8+CiAgICAgICAgICAgICAgICA8cmVsYXRpb24ga2V5PSIyMDE4MDUzNTM3NCIgcmVsdHlwZT0iNCIvPgogICAgICAgICAgICAgICAgPHJlbGF0aW9uIGtleT0iMjAzOTgyMjMxMDIiIHJlbHR5cGU9IjQiLz4KICAgICAgICAgICAgPC9yZWxhdGlvbnM+CiAgICAgICAgPC9sb2dpbj4KICAgIDwvb3BlcmF0aW9uPgo8L3Nzbz4K';

afipCtrl.logIn = async (req, res) => {

    console.log("Executing login");

    var request = require('request');
    var options = {
        url: 'https://wsaahomo.afip.gov.ar/ws/services/LoginCms',
        method: 'POST',
        body: xmlLogin,
        headers: {
          'Content-Type':'text/xml;charset=utf-8',
          'Accept-Encoding': 'gzip,deflate',
          'Content-Length':xmlLogin.length,
          'SOAPAction':""
        }
    };

    let callback = (error, response, body) => {
				// console.log(error)
				// console.log(response)
				// console.log(body)
        if (!error && response.statusCode == 200) {
          parser.parseString(body, (err, result) => {
            console.log(result.Envelope.Body.loginCmsResponse.loginCmsReturn)
          });
        } else {
            parser.parseString(response.body, (err, result) => {
                // console.log(result.Envelope.Body.Fault.faultstring);
                
                if (alreadyLogged(result.Envelope.Body.Fault.faultstring)) {
                    console.log("ALREADY AUTHENTICATED")
                    // Usar el token y sign existentes y realizar la consulta de CPE)
                }

                if (badExpirationTime(result.Envelope.Body.Fault.faultstring)) {
                    console.log("BAD EXPIRATION TIME")
                    console.log("El tiempo de expiración es inferior a la hora actual")
                }

                if (expiredTime(result.Envelope.Body.Fault.faultstring)) {
                    console.log("EXPIREDDDD")
                    // Armar nuevamente el xml con el período de autorización, 
                    // ====> LoginTicketWscpePsalut.xml
                    // ejecutar script openssl para obtener el cms actualizado
                    // y se utiliza el cms generado para crear un nuevo xml
                    // openssl([
                    //     'openssl',
                    //     'cms',
                    //     '-sign',
                    //     '-in', 'LoginTicketWscpePsalut.xml',
                    //     '-out', 'LoginTicketWscpePsalut.cms',
                    //     '-signer', 'openssl/CertificadoPsalutMioncaCPE.pem',
                    //     '-inkey', 'ClaveTestingPsalut.key',
                    //     '-nodetach',
                    //     '-outform',
                    //     'PEM'], (err, buffer) => {console.log(err.toString())}
                    //     );
                }
            });
            
        }
    };
    request(options, callback);
};

// Funcion que devuelve true si ya está logueado en WSAA
function alreadyLogged (err) {
    let bool = false;
    let find = "El CEE ya posee un TA valido para el acceso al WSN solicitado";
    bool = err.includes(find);
    return bool;
}

// Funcion que devuelve true si expiró el tiempo del certificado xml
function expiredTime (err) {
    let bool = false;
    let find = "generationTime posee formato o dato inválido";
    bool = err.includes(find);
    return bool;
}

function expiredToken (err) {
    let bool = false;
    let find = "Token Vencido";
    bool = err.includes(find);
    return bool;
}

function badExpirationTime(err) {
	let bool = false;
	let find = "es inferior a la hora actual";
	bool = err.includes(find);
	return bool;
}

const xmlCPE = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsc="https://serviciosjava.afip.gob.ar/wscpe/">
                <soapenv:Header/>
                <soapenv:Body>
                <wsc:ConsultarCPEAutomotorReq>
                    <auth>
                        <token>`+ token +`</token>
                        <sign>`+ sign +`</sign>
                        <cuitRepresentada>20111111112</cuitRepresentada>
                    </auth>
                    <solicitud>
                        <!--Optional:-->
                        <cuitSolicitante>20111111112</cuitSolicitante>
                        <!--Optional:-->
                        <cartaPorte>
                            <tipoCPE>74</tipoCPE>
                            <sucursal>10</sucursal>
                            <nroOrden>409</nroOrden>
                        </cartaPorte>
                        <!--Optional:-->
                        <nroCTG>10100011137</nroCTG>
                    </solicitud>
                </wsc:ConsultarCPEAutomotorReq>
                </soapenv:Body>
                </soapenv:Envelope>`;

afipCtrl.consultarCPE = async (req, res) => {
    console.log("Executing consulta CPE");

    var request = require('request');
    var options = {
        url: 'https://fwshomo.afip.gov.ar/wscpe/services/soap',
        method: 'POST',
        body: xmlCPE,
        headers: {
          'Content-Type':'text/xml;charset=utf-8',
          'Accept-Encoding': 'gzip,deflate',
          'Content-Length':xmlCPE.length,
          'SOAPAction':""
        }
    };

    let callback = (error, response, body) => {
        if (!error && response.statusCode == 200) {
          parser.parseString(body, (err, result) => {
            res.send(result);
            console.log(result.Envelope.Body.ConsultarCPEAutomotorResp.respuesta);
          });
        } else {
            parser.parseString(response.body, (err, result) => {
                if (expiredToken(result.Envelope.Body.Fault.faultstring)) {
                    console.log("TOKEN VENCIDO")
                    // como está el token vencido ejecuto nuevamente el login
                    afipCtrl.logIn();
                }
            });
        }
    };
    request(options, callback);
}

module.exports = afipCtrl;
