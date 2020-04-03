const transformersData = [
    {
        id: 1,
        name: 'Optimus Prime',
        faction: 'Autobots'
    },
    {
        id: 2,
        name: 'Jazz',
        faction: 'Autobots'
    },
    {
        id: 3,
        name: 'Megatron',
        faction: 'Decepticons'
    },
    {
        id: 4,
        name: 'Soundwave',
        faction: 'Decepticons'
    }
];

export default (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(transformersData))
}
