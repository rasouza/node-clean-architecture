module.exports = ({ UserRepository }) => async () => {
  return await UserRepository.find()
}
