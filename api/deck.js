module.exports = function (app, mongoose) {
	const Card = mongoose.models.Card;
	const Deck = mongoose.models.Deck;
	// const Deck = mongoose.models.Deck;

	app.get('/deck/:deckId', (req, res) => {
		let deckId = req.params.deckId;
		if (typeof deckId !== 'undefined'){
			Card.findOne({'deckId' : deckId}).then((cards) => {
				res.send(cards);
			});
		} else {
			res.send('bad');
		}
	});

	app.get('/decks', (req, res) => {
		Deck.find().then((deck) => {
			res.send(deck);
		});
	});

	app.post('/card2', (req, res) => {
		var cardData = {};
		var card = new Card(cardData);

		card.save(function (err) {
			if (err) {
				console.log(err);
				res.send(400, { status: 'error', error: 'problem saving', details: err });
			} else {
				res.send({ status: 'ok' });
			}
		}); // card save
	});

	app.get('/zdeck/deckId', (req, res) => {
    console.log('deck save');
		// find deck by Id
		// req.user.decks.filter((deck) => deck.id === req.params.deckId)
    let deckMock = require('../extras/scheme-souldeck.json');

    let savedDeck = new Deck(deckMock);
    savedDeck.save().then( () => {
      req.user.decks = [savedDeck];    
    });
    res.send(savedDeck);
    /*
		let deck = Deck.findOne({'deckId' : req.params.deckId})
			.then((deck)=>{
				Object.assign(deck, req.body);
				deck.save().then((result) => {
					console.log('saved', result);
				});
			});

		Deck.save( (err, data) => {
			if (err) {
				console.log(err);
				res.send(400, { status: 'error', error: 'problem saving', details: err });
			} else {
				res.send({ status: 'ok' });
			}
		});
    // */
	});
};