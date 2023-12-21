<section class="character-edit">
	<h2 style="margin-bottom: 10px;">
		{{#if isCreate}}
		{{translate "Add a new Character"}}
		{{else}}
		{{translate "Update Character"}}
		{{/if}}
	</h2>

	<form>


		<input style="display: none;" type="text" name="characterId" id="characterId" value="{{character.id}}" />

		<div>
			<div class="character-edit-fields-group" data-input="{{character.name}}" data-validation="control-group">
				<label class="character-edit-fields-group-label">
					{{translate "Name"}}
					<span class="character-edit-fields-group-label-required">
						*
					</span>
				</label>
				<div class="address-edit-fields-group-form-controls" data-validation="control">
					<input type="text" name="name" id="name" class="address-edit-fields-group-input"
						value="{{character.name}}" />
				</div>
			</div>
		</div>

		<div>
			<div class="character-edit-fields-group" data-input="{{character.gender}}" data-validation="control-group">
				<label class="character-edit-fields-group-label">
					{{translate "Gender"}}
				</label>

				<div class="address-edit-fields-group-form-controls" data-validation="control">
					<input type="text" name="gender" id="gender" class="address-edit-fields-group-input"
						value="{{character.gender}}" />
				</div>
			</div>
		</div>

		<div>
			<div class="character-edit-fields-group" data-input="{{character.location}}"
				data-validation="control-group">
				<label class="character-edit-fields-group-label">
					{{translate "Location"}}
				</label>

				<div class="address-edit-fields-group-form-controls" data-validation="control">
					<input type="text" name="location" id="location" class="address-edit-fields-group-input"
						value="{{character.location}}" />
				</div>
			</div>
		</div>

		<div>
			<div class="character-edit-fields-group" data-input="{{character.specie}}" data-validation="control-group">
				<label class="character-edit-fields-group-label">
					{{translate "Specie"}}
				</label>

				<div class="address-edit-fields-group-form-controls" data-validation="control">
					<input type="text" name="specie" id="specie" class="address-edit-fields-group-input"
						value="{{character.specie}}" />
				</div>
			</div>
		</div>

		<div>
			<div class="character-edit-fields-group" data-input="{{character.origin}}" data-validation="control-group">
				<label class="character-edit-fields-group-label">
					{{translate "Origin"}}
				</label>

				<div class="address-edit-fields-group-form-controls" data-validation="control">
					<input type="text" id="origin" name="orgin" class="address-edit-fields-group-input"
						value="{{character.origin}}" />
				</div>
			</div>
		</div>

		<div class="character-edit-footer">

			<button type="submit" class="rickandmorty-button-accept">
				{{#if isCreate}}
				{{translate "Save Character"}}
				{{else}}
				{{translate "Update Character"}}
				{{/if}}
			</button>
			{{#if isCreate}}

			{{else}}
			<button type="button" value="{{character.id}}" data-action="deleteCharacter"
				class="rickandmorty-button-cancel">
				{{translate "Delete"}}
				{{/if}}
		</div>

	</form>
</section>