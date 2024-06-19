
// const { Client } = require('@notionhq/client');

// const { NOTION_KEY, NOTION_DB } = process.env;
// let durationOp = {}

// Initializing a client
// const notion = new Client({ auth: NOTION_KEY });

exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: 'hello da dfedfeanto'
        }),
    };
    // try {
    //     let response = {};
    //     const body = (event.body ? JSON.parse(event.body) : '');
    //     console.log(body);
    //     switch (event.httpMethod) {
    //         // get
    //         case 'GET':
    //             switch (event.queryStringParameters.data_req) {
    //                 case 'properties':
    //                     response = await notion.databases.retrieve({ database_id: NOTION_DB });
    //                     for (const key of response.properties.Duration.select.options) {
    //                         const arrTime = key.name.split(":");
    //                         durationOp[key.id] = (Number(arrTime[0]) * 60) + Number(arrTime[1])
    //                     }
    //                     break;
    //                 case 'TasksNoChecked':
    //                     const resToParse = await notion.databases.query({
    //                         database_id: NOTION_DB,
    //                         filter: {
    //                             property: "av%3DI",
    //                             checkbox: {
    //                                 equals: false
    //                             }
    //                         },
    //                     });
    //                     response.results = [];
    //                     for (const ts of resToParse.results) {
    //                         response.results.push({
    //                             id: ts.id,
    //                             done: ts.properties[""].checkbox,
    //                             title: ts.properties["Task"].title[0].plain_text,
    //                             duration: ts.properties["Duration"].select.name ? ts.properties["Duration"].select.name : "",
    //                             urgImp: ts.properties["Urgent-Important"].select.name ? ts.properties["Urgent-Important"].select.name : "",
    //                         })
    //                     }
    //                     break;
    //                 default:
    //                     response = { msg: "richesta non conforme" };
    //                     break;
    //             }
    //             break;
    //         // post
    //         case 'POST':

    //             switch (event.queryStringParameters.data_req) {
    //                 case 'fullDb':
    //                     response = await notion.databases.query({ database_id: NOTION_DB });
    //                     break;
    //                 case 'addTask':
    //                     response = await addTask(body);
    //                     break;
    //                 default:
    //                     response = { msg: "richesta non conforme" };
    //                     break;
    //             }

    //             break;
    //         // PATCH 
    //         case 'PATCH':

    //             switch (event.queryStringParameters.data_req) {
    //                 case 'checkTask':
    //                     response = await notion.pages.update({
    //                         page_id: body.pageId,
    //                         properties: {
    //                             'av%3DI': {
    //                                 checkbox: true,
    //                             },
    //                         },
    //                     });
    //                     break;
    //                 default:
    //                     response = { msg: "richesta non conforme" };
    //                     break;
    //             }



    //             break;
    //         default:
    //             break;
    //     }

    //     // console.log(response);

    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify(response),
    //     };
    // } catch (e) {
    //     console.error(e);
    //     return {
    //         statusCode: 500,
    //         body: e.toString(),
    //     };
    // }
};

async function addTask({ urgImp, title, duration }) {
    const d = new Date();
    const dd = new Date();
    dd.setMinutes(dd.getMinutes() + durationOp[duration]);
    const response = await notion.pages.create({
        icon: {
            type: "emoji",
            emoji: "👽",
        },
        parent: {
            type: "database_id",
            database_id: NOTION_DB,
        },
        properties: {
            title: {
                title: [
                    {
                        type: "text",
                        text: {
                            content: title,
                        },
                    },
                ],
            },
            "Ll%60X": { //urgImp
                "select": {
                    "id": urgImp
                }
            },
            "nLDG": {  //duration
                "select": {
                    "id": duration
                }
            },
            "J%7D%7DN": { //data
                "date": {
                    "start": d.toISOString(),
                    "end": dd.toISOString()
                }
            }
        },
    });
    return response
}