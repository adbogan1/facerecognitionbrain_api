const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '41fa57bb4c634a15ad2491e03c93872b'
  });

const handleApiCall = (req, res) => {
    app.models.predict({
        id: 'face-detection',
        name: 'face-detection',
        version: '6dc7e46bc9124c5c8824be4822abe105',
        type: 'visual-detector',
        }, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api'))
}


const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(404).json("unable to get entries"));
}

module.exports  = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}