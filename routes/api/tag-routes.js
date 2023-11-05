const router = require('express').Router();
const { sync } = require('../../config/connection');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  try{
    const tagData = await Tag.findAll({
      include:[{ model:Product }],
    });
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    
    if (!tagData) {
      res.status(404).json({message: 'No tag found with this id.'});
    }
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json({message:'Could not find tag!'});
  }


});
//getting a tag by ID

//creating a new tag
router.post('/', async (req, res) =>{
  try{
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  }catch (err){
    res.status(400).json.apply(err);
  }
});

//updating tag by its ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {id: req.params.id},
    });
    if (!updatedTag){
      res.statusCode(404).json({message:'ID not found!'});
      return;
    }
    res.status(200).json(updatedTag);

  }catch (err){
    res.status(500).json({message: 'Update'})
  }
  });
  
  // update a tag's name by its `id` value
//delets a tag using the id
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {id: req.params.id}
    });
    if (!deletedTag){
      res.status(400).json({message: 'No tag found with this ID.'});
      return;
    }
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);

  }
  
});

module.exports = router;
