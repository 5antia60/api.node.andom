const router = require('express').Router();
const CountOcurrences = require('../models/count-ocurrences');

/**
 * Postar nova contagem
 */
router.post('/', async (req, res) => {
  const { count, type } = req.body;

  if (!count || !type) {
    res.status(422).json({ Erro: 'Preencha todos os campos...' });
    return;
  }

  const newOcurrence = { count, type };

  try {
    await CountOcurrences.create(newOcurrence)

    res.status(201).json({ message: 'Contagem inserida no sistema com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Receber todas as contagens
 */
router.get('/', async (req, res) => {
  try {
    const countOcurrences = await CountOcurrences.find();

    res.status(200).json(countOcurrences);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Receber contagem pelo ID
 */
router.get('/:id', async (req, res) => {
  try {
    const countOcurrences = await CountOcurrences.findOne({ _id: req.params.id });

    if (!countOcurrences) {
      res.status(422).json({ message: 'Contagem não encontrada...' });
      return;
    }

    res.status(200).json(countOcurrences);

  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Atualizar contagem
 */
router.patch('/:id', async (req, res) => {
  const { count, type } = req.body;

  const countOcurrence = { count, type };

  try {
    const updatedCount = await CountOcurrences.updateOne({ _id: req.params.id }, countOcurrence);

    if (updatedCount.matchedCount === 0) {
      res.status(422).json({ message: 'Contagem não encontrada...' });
      return;
    }

    res.status(200).json(countOcurrence);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Deletar contagem
 */
router.delete('/:id', async (req, res) => {
  const count = await CountOcurrences.findOne({ _id: req.params.id });

  if (!count) {
    res.status(422).json({ message: 'Contagem não encontrada...' });
    return;
  }

  try {
    await CountOcurrences.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Contagem do tipo de ocorrência deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
