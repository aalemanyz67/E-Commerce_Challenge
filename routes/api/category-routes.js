const router = require('express').Router();
const { error } = require('console');
const { Category, Product, } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categoryData =  await Category.findALL({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});
//finding a category and it product by id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    if (!categoryData) {
      res.status(404).json({message: 'No category found with this id!'});
    }
    res.status(200),json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
 
});
//creating a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
      
  });
  //updating catergory by its id
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, { where: {id: req.params.id} });
  
  if (!updatedCategory) {
    res.status(404).json({message: 'Id not found!'});
    return;
  }
    res.status(200).json(updatedCategory);

  }catch (err) {
    res.status(500).json({message: 'Update'})
  }

  
});
//deleting a category by id
router.delete('/:id', async (req, res) => {
 try {
  const deletedCategory = await Category.destroy({
    where: { id: req.params.id}
  });

  if (!deletedCategory) {
    res.status(404).json({message: 'No category found with this id!'});
    return;
  }
  res.status(200).json(deletedCategory);
 } catch (err) {
  res.status(500).json(err);
 }
});

module.exports = router;
