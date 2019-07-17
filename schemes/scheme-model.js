const knex = require('knex');
const db = knex(require('../knexfile').development);

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes')
    .where({ id })
    .first();
}

function findSteps(id) {
  return db
    .from('schemes')
    .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .join('steps', 'schemes.id', 'steps.scheme_id')
    .where({ 'schemes.id': id });
}

function add(scheme) {
  return db('schemes').insert(scheme);
}

function update(changes, id) {
  return db
    .transaction(trx => trx('schemes')
      .where({ id })
      .update(changes)
      .then(ids => db('schemes')
        .where({ ids })
        .first())
      .catch(error => console.log(error)))
    .catch(error => console.log(error));
}

function remove(id) {
  return db('schemes')
    .where({ id })
    .del();
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};
