import { v4 as uuidv4 } from 'uuid';

const transformersData = [
    {
        id: uuidv4(),
        name: 'Optimus Prime',
        faction: 'Autobots'
    },
    {
        id: uuidv4(),
        name: 'Jazz',
        faction: 'Autobots'
    },
    {
        id: uuidv4(),
        name: 'Megatron',
        faction: 'Decepticons'
    },
    {
        id: uuidv4(),
        name: 'Soundwave',
        faction: 'Decepticons'
    }
];

const get = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(transformersData));
};

const post = (req, res) => {
    const { name, faction } = req.body;

    transformersData.push({ name, faction, id: uuidv4() })

    /* If the data was submitted via a form, then redirect to a page, otherwise
     * return with a 201 Created status.
     */
    if (req.headers['content-type'].includes('application/x-www-form-urlencoded')) {
        res.writeHead(302, { Location: '/' })
    } else {
        res.statusCode = 201;
    }

    res.end();
};

export default (req, res) => {
    if (req.method === 'POST') {
        post(req, res);
    } else {
        get(req, res);
    }
}
