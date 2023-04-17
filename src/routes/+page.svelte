<script lang="ts">
	import '@picocss/pico';

	export let data;

	$: ({ articles } = data);
</script>

<div class="grid container">
	<div>
		<h2>Articles:</h2>
		{#each articles as article}
			<article>
				<header>{article.title}</header>
				<p>
					{article.content}
				</p>
				<form action="?/deleteArticle&id={article.id}" method="post">
					<button class="outline secondary" type="submit">Delete Article</button>
				</form>
				<a href="/{article.id}" role="button" class="outline contrast" style="width: 100%;">
					Edit Article
				</a>
			</article>
		{/each}
	</div>

	<form action="?/createArticle" method="post">
		<h1>New Article</h1>
		<label for="title">Title</label>
		<input type="text" id="title" name="title" />
		<label for="content">Content</label>
		<textarea name="content" id="content" cols="30" rows="5" />
		<button type="submit">Add Article</button>
	</form>
</div>
