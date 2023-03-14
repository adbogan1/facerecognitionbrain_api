const handleProfile = (db) => (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
        if(user.length) {
            res.json(user[0]);
        }
        else {
            res.status(404).json('could not get user')
        }
    })
}

module.exports  = {
    handleProfile: handleProfile
}