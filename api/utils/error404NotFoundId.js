module.exports = (entity, res) => {
    res.status(404).send(`${entity} not found with de given ID...`);
}