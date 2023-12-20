/**
*@NApiVersion 2.1
*@NScriptType ScheduledScript
*@author gastonmosteiro@hotmail.com
*/

//@ts-check

// @ts-ignore
define(['N/search', 'N/record', 'N/runtime', 'N/log', 'N/https'], function (search, record, runtime, log, https) {

	function execute(context) {
		try {
			log.debug('context', context);

			const characters = getCharacters();

			for (let i = 0; i < characters.length; i++) {
				const character = characters[i];

				const customRecord = record.create({
					type: 'customrecordrickandmortyexercise'
				});

				customRecord.setValue({
					fieldId: 'custrecordname',
					value: character.name
				});

				customRecord.setValue({
					fieldId: 'custrecordgender',
					value: character.gender
				});

				customRecord.setValue({
					fieldId: 'custrecordlocation',
					value: character.location.name
				});

				customRecord.setValue({
					fieldId: 'custrecordspecie',
					value: character.species
				});

				customRecord.setValue({
					fieldId: 'custrecordorigin',
					value: character.origin.name
				});

				customRecord.setValue({
					fieldId: 'custrecordimage',
					value: character.image
				});

				const recordId = customRecord.save();

				log.debug(`Character ${character.name} created with ID: `, recordId);
			}

		} catch (e) {
			log.error('Catch execute:', e);
		}
	}

	const getCharacters = () => {
		try {
			const response = https.get({
				url: 'https://rickandmortyapi.com/api/character'
			});

			const createdCharactersCount = getCreatedCharactersCount();

			const characters = JSON.parse(response.body)?.results;

			if (!characters) throw 'No characters found';

			const charactersToCreate = characters.slice(createdCharactersCount, createdCharactersCount + 20);

			return charactersToCreate;

		} catch (e) {
			throw e;
		}
	}

	function getCreatedCharactersCount() {
		try {
			const characterSearch = search.create({
				type: 'customrecordrickandmortyexercise',
				filters: ['isinactive', 'anyof', 'F'],
			});

			var characterCount = characterSearch.runPaged().count;

			log.debug('characterCount', characterCount);

			return characterCount;
		} catch (e) {
			throw e;
		}
	}

	return {
		execute: execute
	};
});

