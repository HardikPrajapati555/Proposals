const express = require('express');
const Proposal = require('../models/proposal');
const router = express.Router();

// Submit proposal route
router.post('/submitProposal', async (req, res) => {
  const proposalData = req.body;

  const newProposal = new Proposal({
    clientName: proposalData.step1Data.clientName,
    startDate: new Date(proposalData.step1Data.startDate),
    duration: proposalData.step1Data.duration,
    slotDuration: proposalData.step1Data.slotDuration,
    cities: proposalData.step1Data.cities,
    clientType: proposalData.step1Data.clientType,
    propertyType: proposalData.step1Data.propertyType,
    plan: proposalData.step1Data.plan,
    advertiserTag: proposalData.step1Data.advertiserTag,
    popRequired: proposalData.step1Data.popRequired === 'true',
    geoTaggingRequired: proposalData.step1Data.geoTaggingRequired === 'true',
    fileName: proposalData.step2Data.fileName,
    creativeInstruction: proposalData.step2Data.creativeInstruction
  });

  try {
    const savedProposal = await newProposal.save();
    console.log('Proposal saved:', savedProposal);
    res.redirect('/'); // Redirect to home page after saving
  } catch (err) {
    console.error('Error saving proposal:', err);
    res.status(500).send('Error saving proposal data');
  }
});

// Route to display proposals on the home page
router.get('/', async (req, res) => {
  try {
    const proposals = await Proposal.find({});
    res.render('index', { proposals });
  } catch (err) {
    console.error('Error retrieving proposals:', err);
    res.status(500).send('Error retrieving proposals');
  }
});






router.delete('/discard/:id', async (req, res) => {
  try {
    await Proposal.findByIdAndUpdate(req.params.id, { deleted: true });
    res.status(200).send('Proposal discarded');
  } catch (error) {
    res.status(500).send('Error discarding proposal');
  }
});


router.get('/deleted', async (req, res) => {
  try {
    const deletedProposals = await Proposal.find({ deleted: true });
    res.render('deletedProposals', { proposals: deletedProposals });
  } catch (error) {
    res.status(500).send('Error retrieving deleted proposals');
  }
});



module.exports = router;
