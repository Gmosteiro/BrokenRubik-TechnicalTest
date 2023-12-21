/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @author gastonmosteiro@hotmail.com
 */

//@ts-check

// @ts-ignore
define(['N/record', 'N/search', 'N/log'], function (record, search, log) {

	function onRequest(context) {
		const { request, response } = context;

		log.debug('context', context)

		try {
			switch (request.method) {
				case 'GET':
					manageGetRequest(request, response);
					break;
				case 'POST':
					managePostRequest(request, response);
					break;
				default:
					throw new Error('Request type not supported');
					break;
			}
		} catch (e) {
			log.error('Error', e);
			response.write(JSON.stringify({ error: e }));
		}
	}

	const manageGetRequest = (request, response) => {

		const { operation, characterId } = request.parameters;

		log.debug('ManageGetRequest', { operation, characterId })

		if (operation === 'getCharacters') {

			const characters = getCharacters();



			response.write(JSON.stringify({ characters: characters }));

		} else if (operation === 'getCharacterById') {

			const character = getCharacters(characterId);

			log.debug('character', character)

			response.write(JSON.stringify({ character: character }));
		}
	}

	const managePostRequest = (request, response) => {
		try {

			const body = JSON.parse(request.body);
			const operation = body.operation;

			log.debug('ManagePostRequest', body)
			log.debug('ManagePostRequest operation', operation)


			if (operation === 'editCharacter') {

				const editedCharacterId = editCharacter(body.characterId, body);

				response.write(JSON.stringify({ editedCharacter: getCharacters(editedCharacterId) }));

			} else if (operation === 'deleteCharacter') {

				const { characterId } = body;

				const deletedCharacterId = deleteCharacter(characterId);

				response.write(JSON.stringify({ deletedCharacter: deletedCharacterId }));

			} else if (operation === 'createCharacter') {

				const newCharacterId = createCharacter(body);

				response.write(JSON.stringify({ newCharacter: getCharacters(newCharacterId) }));
			}

		} catch (e) {
			log.error('Error', e);
			response.write(JSON.stringify({ error: e }));
		}
	};

	const getCharacters = (id) => {

		try {

			const charactersArray = [];

			const characterSearch = search.create({
				type: 'customrecordrickandmortyexercise',
				filters: id ? ['internalid', 'anyof', id] : [],
				columns: [
					'internalid',
					'custrecordname',
					'custrecordgender',
					'custrecordlocation',
					'custrecordspecie',
					'custrecordorigin',
					'custrecordimage'
				]
			});

			characterSearch.run().each(function (character) {
				const characterData = {
					id: character.id,
					name: character.getValue('custrecordname'),
					image: character.getValue('custrecordimage')
				};

				if (id) {
					characterData.gender = character.getValue('custrecordgender');
					characterData.location = character.getValue('custrecordlocation');
					characterData.specie = character.getValue('custrecordspecie');
					characterData.origin = character.getValue('custrecordorigin');
				}

				charactersArray.push(characterData);

				return charactersArray.length < 20;
			});

			return charactersArray;

		} catch (e) {
			log.error('Catch getAllCharacters', e);
			throw new Error(e);
		}
	}

	function editCharacter(characterId, newValues) {
		try {
			log.debug("editCharacter", newValues)

			const character = record.load({
				type: 'customrecordrickandmortyexercise',
				id: characterId,
			})


			/*
			- Name  ID  custrecordname)
- Gender  ID  custrecordgender)
- Location  ID  custrecordlocation) - Specie  ID  custrecordspecie)
- Origin  ID  custrecordorigin)
- Image  ID  custrecordimage)*/

			character.setValue({
				fieldId: 'custrecordname',
				value: newValues.name
			})

			character.setValue({
				fieldId: 'custrecordgender',
				value: newValues.gender
			})

			character.setValue({
				fieldId: 'custrecordlocation',
				value: newValues.location
			})

			character.setValue({
				fieldId: 'custrecordspecie',
				value: newValues.species
			})

			character.setValue({
				fieldId: 'custrecordorigin',
				value: newValues.origin
			})

			const recordUpdated = character.save()

			log.debug("Character updated:", recordUpdated)


		} catch (error) {
			log.error('Error editing character', error);
		}
	}

	function deleteCharacter(characterId) {
		try {
			const deleteRecord = record.delete({
				type: 'customrecordrickandmortyexercise',
				id: characterId
			});

			return deleteRecord;

		} catch (e) {
			log.error('Error deleting character', e);
			throw new Error(e);
		}
	}

	function createCharacter(characterData) {
		try {

			log.debug('characterData', characterData)

			const customRecord = record.create({
				type: 'customrecordrickandmortyexercise'
			});

			customRecord.setValue({
				fieldId: 'custrecordname',
				value: characterData.name
			});

			customRecord.setValue({
				fieldId: 'custrecordgender',
				value: characterData.gender
			});

			customRecord.setValue({
				fieldId: 'custrecordlocation',
				value: characterData.location
			});

			customRecord.setValue({
				fieldId: 'custrecordspecie',
				value: characterData.species
			});

			customRecord.setValue({
				fieldId: 'custrecordorigin',
				value: characterData.origin
			});

			customRecord.setValue({
				fieldId: 'custrecordimage',
				value: characterData.image
			});

			const recordId = customRecord.save();

			log.debug(`Character ${characterData.name} created with ID: `, recordId);
			return recordId;

		} catch (error) {
			log.error('Catch createCharacter', error)
			throw new Error(error);

		}
	}

	return {
		onRequest: onRequest
	};
});
