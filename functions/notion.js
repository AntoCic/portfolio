const { Client } = require('@notionhq/client');

const { NOTION_KEY, NOTION_DB, USER_KEY } = process.env;

// Initializing a client
const notion = new Client({ auth: NOTION_KEY });

PersonalName = 'Antonino Cicala';

let password = '';

exports.handler = async function (event, context) {
    try {
        //  var to send
        let response = {};
        let res;
        switch (event.httpMethod) {
            case 'GET':
                response = {
                    user: await getUser(),
                    experiences: await getExperiences(),
                    visiblePj: await getVisiblePj(),
                };
                break;
            case 'POST':
                if (isAuthorized()) {
                    switch (getParameter(event)) {
                        case 'db-structure':
                            res = await notion.databases.retrieve({ database_id: NOTION_DB });
                            response = res.properties;
                            break;
                        case 'user':
                            response = await getUser();
                            break;
                        case 'experience':
                            response = await getExperiences();
                            break;
                        case 'visible-pj':
                            response = await getVisiblePj();
                            break;
                        case 'hidden-pj':
                            response = await getHiddenPj();
                            break;
                        default:
                            return returnError(400, 'Bad request.');
                    }
                } else {
                    return returnError(401, 'Unauthorized');
                }
                break;

            default:
                return returnError(405, 'Invalid request type.');
        }

        //  send response 
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };

    } catch (e) {
        console.log(e);
        return returnError(500, e.toString().substr(16));
    }
};

function isAuthorized() {
    return USER_KEY === password ? true : false
}

function returnError(statusCode, error) {
    return {
        statusCode,
        body: JSON.stringify({ error })
    }
}

function getParameter(event) {
    let parmetro = event.path.split("/");
    if (parmetro.length === 4) {
        return parmetro[3]
    } else {
        return false
    }
}
function utilityJsonParse(text) {
    text = text.replaceAll("“", '"');
    text = text.replaceAll("”", '"');
    text = `{ ${text} }`
    return JSON.parse(text);
}

async function getUser() {
    res = await notion.databases.query({
        database_id: NOTION_DB,
        filter: {
            and: [
                {
                    property: 'title',
                    title: {
                        equals: 'user'
                    }
                },
                {
                    property: 'wW%5Eb',
                    select: {
                        equals: 'user'
                    }
                }
            ]
        },
    });
    const utility = utilityJsonParse(res.results[0].properties.utility.rich_text[0].plain_text);
    let technologies = [];
    if (res.results[0].properties.technologies.multi_select.length) {
        for (const tecnology of res.results[0].properties.technologies.multi_select) {
            technologies.push(tecnology.name)
        }
    }
    const user = {
        name: PersonalName,
        img: res.results[0].properties.img.rich_text.length ? res.results[0].properties.img.rich_text[0].plain_text : null,
        email: utility.email,
        phone: utility.phone,
        rule: res.results[0].properties.rule.rich_text.length ? res.results[0].properties.rule.rich_text[0].plain_text : null,
        site_link: res.results[0].properties.site_link.rich_text.length ? res.results[0].properties.site_link.rich_text[0].plain_text : null,
        git_link: res.results[0].properties.git_link.rich_text.length ? res.results[0].properties.git_link.rich_text[0].plain_text : null,
        linkedin_link: utility.linkedin_link,
        description: res.results[0].properties.description.rich_text.length ? res.results[0].properties.description.rich_text[0].plain_text : null,
        location: res.results[0].properties.location.rich_text.length ? res.results[0].properties.location.rich_text[0].plain_text : null,
        date: res.results[0].properties.date.date ? res.results[0].properties.date.date.start : null,
        technologies
    };
    return user
}
async function getExperiences() {
    const res = await notion.databases.query({
        database_id: NOTION_DB,
        filter: {
            property: 'wW%5Eb',
            select: {
                equals: 'experience'
            }
        },
    });

    let experiences = {};
    for (const page of res.results) {
        experiences[page.id] = {
            name: page.properties["Name"].title[0].plain_text,
            description: page.properties.description.rich_text.length ? page.properties.description.rich_text[0].plain_text : null,
            rule: page.properties.rule.rich_text.length ? page.properties.rule.rich_text[0].plain_text : null,
            location: page.properties.location.rich_text.length ? page.properties.location.rich_text[0].plain_text : null,
            priority: page.properties.priority.number ? page.properties.priority.number : 0,
            dateStart: page.properties.date.date ? page.properties.date.date.start : null,
            dateEnd: page.properties.date.date ? page.properties.date.date.end : null,
        }
    }
    return experiences
}
async function getVisiblePj() {
    res = await notion.databases.query({
        database_id: NOTION_DB,
        filter: {
            property: 'wW%5Eb',
            select: {
                equals: 'visible'
            }

        },
    });

    let visiblePj = {};
    for (const page of res.results) {
        let technologies = [];
        if (page.properties.technologies.multi_select.length) {
            for (const tecnology of page.properties.technologies.multi_select) {
                technologies.push(tecnology.name)
            }
        }
        visiblePj[page.id] = {
            name: page.properties["Name"].title[0].plain_text,
            img: page.properties.img.rich_text.length ? page.properties.img.rich_text[0].plain_text : null,
            site_link: page.properties.site_link.rich_text.length ? page.properties.site_link.rich_text[0].plain_text : null,
            git_link: page.properties.git_link.rich_text.length ? page.properties.git_link.rich_text[0].plain_text : null,
            description: page.properties.description.rich_text.length ? page.properties.description.rich_text[0].plain_text : null,
            utility: page.properties.utility.rich_text.length ? page.properties.utility.rich_text[0].plain_text : null,
            rule: page.properties.rule.rich_text.length ? page.properties.rule.rich_text[0].plain_text : null,
            location: page.properties.location.rich_text.length ? page.properties.location.rich_text[0].plain_text : null,
            priority: page.properties.priority.number ? page.properties.priority.number : 0,
            dateStart: page.properties.date.date ? page.properties.date.date.start : null,
            dateEnd: page.properties.date.date ? page.properties.date.date.end : null,
            technologies
        }
    }
    return visiblePj;
}

async function getHiddenPj() {
    res = await notion.databases.query({
        database_id: NOTION_DB,
        filter: {
            property: 'wW%5Eb',
            select: {
                equals: 'hidden'
            }

        },
    });

    let hiddenPj = {};
    for (const page of res.results) {
        let technologies = [];
        if (page.properties.technologies.multi_select.length) {
            for (const tecnology of page.properties.technologies.multi_select) {
                technologies.push(tecnology.name)
            }
        }
        hiddenPj[page.id] = {
            name: page.properties["Name"].title[0].plain_text,
            img: page.properties.img.rich_text.length ? page.properties.img.rich_text[0].plain_text : null,
            site_link: page.properties.site_link.rich_text.length ? page.properties.site_link.rich_text[0].plain_text : null,
            git_link: page.properties.git_link.rich_text.length ? page.properties.git_link.rich_text[0].plain_text : null,
            description: page.properties.description.rich_text.length ? page.properties.description.rich_text[0].plain_text : null,
            utility: page.properties.utility.rich_text.length ? page.properties.utility.rich_text[0].plain_text : null,
            rule: page.properties.rule.rich_text.length ? page.properties.rule.rich_text[0].plain_text : null,
            location: page.properties.location.rich_text.length ? page.properties.location.rich_text[0].plain_text : null,
            priority: page.properties.priority.number ? page.properties.priority.number : 0,
            dateStart: page.properties.date.date ? page.properties.date.date.start : null,
            dateEnd: page.properties.date.date ? page.properties.date.date.end : null,
            technologies
        }
    }
    return hiddenPj;
}