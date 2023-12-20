/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @author gastonmosteiro@hotmail.com
 */

const { get } = require("underscore");

//@ts-check

// @ts-ignore
define(['N/record', 'N/search', 'N/log'], function (record, search, log) {

	function onRequest(context) {
		const { request, response } = context;

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

		if (operation === 'getCharacters') {

			const characters = getCharacters();

			response.write(JSON.stringify(characters));

		} else if (operation === 'getCharacterById') {

			var character = getCharacters(characterId);

			response.write(JSON.stringify(character));
		}
	}

	const managePostRequest = (request, response) => {
		try {
			const { body, operation } = request;

			if (operation === 'editCharacter') {

				const { characterId, newValues } = body;

				var editedCharacterId = editCharacter(characterId, newValues);

				response.write(JSON.stringify({ editedCharacter: getCharacters(editedCharacterId) }));

			} else if (operation === 'deleteCharacter') {

				const { characterId } = body;

				var deletedCharacterId = deleteCharacter(characterId);

				response.write(JSON.stringify({ deletedCharacter: deletedCharacterId }));

			} else if (operation === 'createCharacter') {

				const { characterData } = body;

				var newCharacterId = createCharacter(characterData);

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
			});

			characterSearch.run().each(function (character) {

				log.debug('character', character)
				charactersArray.push(character)
			});

			return charactersArray;

		} catch (e) {
			log.error('Catch getAllCharacters', e);
			throw new Error(e);
		}
	}

	function editCharacter(characterId, newValues) {
		try {

			const editRecord = record.submitFields({
				type: 'customrecordrickandmortyexercise',
				id: characterId,
				values: newValues
			});

			return editRecord;

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
				value: characterData.location.name
			});

			customRecord.setValue({
				fieldId: 'custrecordspecie',
				value: characterData.species
			});

			customRecord.setValue({
				fieldId: 'custrecordorigin',
				value: characterData.origin.name
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
