const router = require('express').Router();
const Ocurrences = require('../models/ocurrences');

/**
 * Postar nova ocorrência
 */
router.post('/', async (req, res) => {
  const { userName, type, date, title, description, suggestions, sector, status } = req.body;

  if (!userName || !type || !date || !title || !description || !suggestions || !sector || !status) {
    res.status(422).json({ Erro: 'Preencha todos os campos...' });
    return;
  }

  const newOcurrence = { userName, type, date, title, description, suggestions, sector, status };

  try {
    await Ocurrences.create(newOcurrence)

    res.status(201).json({ message: 'Ocorrência inserida no sistema com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Receber todas as ocorrências
 */
router.get('/', async (req, res) => {
  try {
    const ocurrences = await Ocurrences.find();

    res.status(200).json(ocurrences);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Receber ocorrência pelo ID
 */
router.get('/:id', async (req, res) => {
  try {
    const ocurrences = await Ocurrences.findOne({ _id: req.params.id });

    if (!ocurrences) {
      res.status(422).json({ message: 'Ocorrência não encontrada...' });
      return;
    }

    res.status(200).json(ocurrences);

  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Atualizar ocorrência
 */
router.patch('/:id', async (req, res) => {
  const { userName, type, date, title, description, suggestions, sector, status } = req.body;

  const ocurrence = { userName, type, date, title, description, suggestions, sector, status };

  try {
    const updatedOcurrence = await Ocurrences.updateOne({ _id: req.params.id }, ocurrence);

    if (updatedOcurrence.matchedCount === 0) {
      res.status(422).json({ message: 'Ocorrência não encontrada...' });
      return;
    }

    res.status(200).json(ocurrence);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Deletar ocorrência
 */
router.delete('/:id', async (req, res) => {
  const ocurrence = await Ocurrences.findOne({ _id: req.params.id });

  if (!ocurrence) {
    res.status(422).json({ message: 'Ocorrência não encontrada...' });
    return;
  }

  try {
    await Ocurrences.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Ocorrência deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
