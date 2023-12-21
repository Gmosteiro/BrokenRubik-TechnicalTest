<h2 class="rickandmorty-title">
	{{translate "Rick and Morty Characters"}}
</h2>
<section class="rickandmorty-info-card">
	<div>
		<table style="margin-left: 10%;">
			<thead>
				<tr>
					<th>
						{{translate "Action"}}
					</th>
					<th>
						{{translate "Id"}}
					</th>
					<th>
						{{translate "Name"}}
					</th>
					<th>
						{{translate "Image"}}
					</th>
				</tr>
			</thead>
			<tbody>
				{{#each characters}}
				<tr>
					<td class="rickandmorty-td">
						<a href="/RickAndMortyDetail/{{id}}" data-toggle="show-in-modal">
							View
						</a>
					</td>
					<td class="rickandmorty-td">
						{{id}}
					</td>
					<td class="rickandmorty-td">
						{{name}}
					</td>
					<td class="rickandmorty-td">
						<img style="max-width: 120px" src=" {{image}} " alt=" {{name}} " />
					</td>
				</tr>
				{{/each}}
			</tbody>
		</table>
		<a href="/RickAndMortyDetail/add" data-toggle="show-in-modal" class="rickandmorty-button">
			{{translate "Add New"}}
		</a>
	</div>
</section>