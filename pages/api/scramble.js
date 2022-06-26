import { scramble } from '../../data/scramble'

export default (req, res) => {
  res.status(200).json(scramble)
}


