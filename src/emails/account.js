// 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

//batchSend.js
var SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_API_KEY;

const sendWelcomeEmail = (email, name) => {
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
        "sender": {"email": "ehab@gmail.com", "name": "Ehab Reda"},
        "subject": "Thanks for joining in!",
        "htmlContent": "<!DOCTYPE html><html><body><h1>Big Thanks!</h1><p>Thanks for joining our community!</p></body></html>",
        "messageVersions": [
            {
                "to": [
                    {
                        "email": email,
                        "name": name
                    }
                ]
            }
        ]
    }).then(function(data) {
        console.log(data);
      }, function(error) {
        console.error(error);
      });
}

const sendcancellationEmail = (email, name) => {
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
        "sender": {"email": "ehabr518@gmail.com", "name": "Ehab Reda"},
        "subject": "We are so sad that you left us!",
        "htmlContent": "<!DOCTYPE html><html><body><h1>Hope to see you later!</h1><p>Thanks for joining our community!</p></body></html>",
        "messageVersions": [
            {
                "to": [
                    {
                        "email": email,
                        "name": name
                    }
                ]
            }
        ]
    }).then(data => {
        console.log(data)
    }).catch(error=> {
        console.log(error)
    })
}
// sendcancellationEmail("ehabr518@gmail.com", "ehab");
module.exports = {
    sendWelcomeEmail,
    sendcancellationEmail
}
// new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({

//      "sender":{ "email":"sendinblue@sendinblue.com", "name":"Sendinblue"},
//      "subject":"This is my default subject line",
//      "htmlContent":"<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>",
//      "params":{
//         "greeting":"This is the default greeting",
//         "headline":"This is the default headline"
//      },
//    "messageVersions":[
//      //Definition for Message Version 1 
//      {
//          "to":[
//             {
//                "email":"ehabr518@gmail.com",
//                "name":"Bob Anderson"
//             },
//             {
//                "email":"ehabr518@gmail.com",
//                "name":"Anne Smith"
//             }
//          ],
//          "htmlContent":"<!DOCTYPE html><html><body><h1>Modified header!</h1><p>This is still a paragraph</p></body></html>",
//          "subject":"We are happy to be working with you"
//       },
     
//      // Definition for Message Version 2
//       {
//          "to":[
//             {
//                "email":"ehabr518@gmail.com",
//                "name":"Jim Stevens"
//             },
//             {
//                "email": "ehabr518@gmail.com",
//                "name":"Mark Payton"
//             },
//             {
//                "email":"ehabr518@gmail.com",
//                "name":"Andrea Wallace"
//             }
//          ]
//       }
//    ]

// }).then(function(data) {
//   console.log(data);
// }, function(error) {
//   console.error(error);
// });