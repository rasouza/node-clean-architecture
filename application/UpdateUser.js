module.exports = ({ UserRepository }) =>
  (id, data) => UserRepository.merge(id, data)
