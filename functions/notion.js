const { Client } = require('@notionhq/client');

const { NOTION_KEY, NOTION_DB, USER_KEY } = process.env;

// Initializing a client
const notion = new Client({ auth: NOTION_KEY });

PersonalName = 'Antonino Cicala';

let isLogged = false;

exports.handler = async function (event, context) {
    await router.start(event);

    await router.GET('', async () => {
        router.setRes({
            user: await getUser(),
            experiences: await getExperiences(),
            visiblePj: await getPj('visible'),
            template: await getPj('template'),
        });
    })

    if (isLogged) {
        await router.POST('db-structure', async () => {
            res = await notion.databases.retrieve({ database_id: NOTION_DB });
            router.setRes(res.properties);
        })
        await router.POST('user', async () => { router.setRes(await getUser()) })
        await router.POST('experience', async () => { router.setRes(await getExperiences()) })
        await router.POST('visible-pj', async () => { router.setRes(await getPj('visible')) })
        await router.POST('hidden-pj', async () => { router.setRes(await getPj('hidden')) })
        await router.POST('logout', async () => {
            isLogged = false;
            router.setRes({ logged: isLogged });
        })
    } else {
        await router.POST('login', async () => {
            const password = JSON.parse(event.body).userKey;
            isLogged = USER_KEY === password ? true : false;
            const response = isLogged ? { logged: isLogged } : { msg: "Nice try. It's not so easy" };
            router.setRes(await getUser(response))
        })
    }

    return router.sendRes();
};

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
        isLogged,
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

    let experiences = [];
    for (const page of res.results) {
        experiences.push({
            id: page.id,
            name: page.properties["Name"].title[0].plain_text,
            description: page.properties.description.rich_text.length ? page.properties.description.rich_text[0].plain_text : null,
            rule: page.properties.rule.rich_text.length ? page.properties.rule.rich_text[0].plain_text : null,
            location: page.properties.location.rich_text.length ? page.properties.location.rich_text[0].plain_text : null,
            priority: page.properties.priority.number ? page.properties.priority.number : 0,
            dateStart: page.properties.date.date ? page.properties.date.date.start : null,
            dateEnd: page.properties.date.date ? page.properties.date.date.end : null,
        });
    }
    experiences.sort((a, b) => -(new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()));
    return experiences
}

async function getPj(grups) {
    res = await notion.databases.query({
        database_id: NOTION_DB,
        filter: {
            property: 'wW%5Eb',
            select: {
                equals: grups
            }

        },
    });

    let projects = [];
    for (const page of res.results) {
        let technologies = [];
        if (page.properties.technologies.multi_select.length) {
            for (const tecnology of page.properties.technologies.multi_select) {
                technologies.push(tecnology.name)
            }
        }
        projects.push({
            id: page.id,
            visible: grups === 'hidden' ? false : true,
            name: page.properties["Name"].title[0].plain_text,
            img: page.properties.img.rich_text.length ? page.properties.img.rich_text[0].plain_text : null,
            video: page.properties.video.rich_text.length ? page.properties.video.rich_text[0].plain_text : null,
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
        });
    }
    projects.sort((a, b) => -(new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()));
    return projects;
}


// Oggetto che ho creato per gestire e semplificare le chiamate al server
const router = {
    // VAR UTILITY
    // contiene tuttu l'evento della chiamata
    event: null,
    // contiene un la risposta nel caso sono stete settate piú risposte é un array
    response: null,
    // status code che viene inviato con la risposta
    statusCode: 200,

    // var boolean di controllo si attiva se trova un errore
    stateError: false,
    // var boolean di controllo si attiva nel momento in cui viene settata la prima risposta
    // per fornire un riferimento per trasformare in caso di un secondo set la risposta in un array
    isSecondSet: false,

    // contiene tutti i path parems
    pathParams: [],
    // contiene tutti i body parems
    bodyParams: null,

    // conta le chiamata ricevute per debugging
    callCounter: 0,

    // contiene se presente nell header l'autentication il JWT
    authToken: null,

    // metodo OBLIGATORIO per inizializzare le variabili ricavate dallévento della chiamata
    async start(event) {
        this.callCounter++ // debugging
        let attesa = 0 // debugging
        while (this.event) {
            attesa++ // debugging
            await new Promise((resolve) => setTimeout(resolve, 10));
        }
        console.log(`Call ${this.callCounter}: ${event.httpMethod} ${event.path} => attesa totale fine chiamata precedente ms:${attesa * 10}`); // debugging
        this.event = event
        this.stateError = false;
        this.statusCode = 200;
        this.bodyParams = null;
        this.authToken = this.event.headers.authorization || null;

        this.clearRes();

        this.setBodyParams();

        this.pathParams = this.getPathParams();
    },

    // metodo per debugging ti ricorda che devi inizializzare la chiamata
    isStarted() {
        if (this.event && !this.stateError) {
            return true
        } else {
            console.error('ERROR 500: non hai inizializzato il router, SCRIVI: router.start(event);');
            this.error(500, 'ERROR 500: non hai inizializzato il router, SCRIVI: router.start(event);')
            return false
        }
    },

    // metodo per settare una o piú risposte se eseguito piú volte
    setRes(response) {
        if (this.isStarted()) {
            if (this.response) {
                if (this.isSecondSet) {
                    this.response = [this.response]
                    this.isSecondSet = false
                }
                this.response.push(response)

            } else {
                this.response = response
                this.isSecondSet = true
            }
        }
    },

    // metodo che ripulisce la risposta
    clearRes() {
        if (this.isStarted()) {
            this.isSecondSet = false;
            this.response = null
        }
    },

    // metodo che setta delle variabili per inviare un errore
    error(statusCode = 400, error = 'Errore: 400 Bad Request') {
        this.stateError = true
        this.response = error;
        this.statusCode = statusCode
    },

    // metodo OBBLIGATORIO per inviare la risposta
    sendRes() {
        this.event = null;
        if (this.response === null) {
            this.error();
        }
        return {
            statusCode: this.statusCode,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.response),
        }
    },

    // metodo per settare su pathParams i path params utili
    getPathParams() {
        if (this.isStarted()) {
            const params = this.event.path.split("/")
            if (params.length > 2) {
                for (let index = 0; index < 2; index++) {
                    params.shift();
                }

                return params
            } else {
                return [""]
            }
        }
    },

    // metodo per ottenere i parametri
    // di defaul viene utilizzata per ottenere il primo parametro che viene indicato nelle richeste
    params(index = 0) {
        if (this.pathParams.length >= index + 1) {
            return this.pathParams[index]
        } else {
            return false
        }
    },

    // metodo per settare la mia var bodyParams con un oggetto contenete tutti i parametri del body
    setBodyParams() {
        if (this.event.body) {
            this.bodyParams = JSON.parse(this.event.body)
        }
    },

    // controllo dell'evento della chiamata e esegue la funzione richesta
    async checkCall(pathParam, ArrowFunction, method) {
        if (this.event.httpMethod === method) {
            if (pathParam === this.params()) {
                return await ArrowFunction();
            } else {
                return false
            }
        } else {
            return false
        }
    },

    // caso chiamata tipo GET
    async GET(pathParam, ArrowFunction) {
        return await this.checkCall(pathParam, ArrowFunction, "GET")
    },
    // caso chiamata tipo POST
    async POST(pathParam, ArrowFunction) {
        return await this.checkCall(pathParam, ArrowFunction, "POST")
    },
    // caso chiamata tipo PUT
    async PUT(pathParam, ArrowFunction) {
        return await this.checkCall(pathParam, ArrowFunction, "PUT")
    },
    // caso chiamata tipo PATCH
    async PATCH(pathParam, ArrowFunction) {
        return await this.checkCall(pathParam, ArrowFunction, "PATCH")
    },
    // caso chiamata tipo DELETE
    async DELETE(pathParam, ArrowFunction) {
        return await this.checkCall(pathParam, ArrowFunction, "DELETE")
    },


}
