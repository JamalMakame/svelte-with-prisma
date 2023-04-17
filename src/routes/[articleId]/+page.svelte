<script lang="ts">
	export let data;
	$: ({ article } = data);
</script>

<form action="?/updateArticle" method="post">
	<h1>Editing: {article.title}</h1>
	<label for="title">Title</label>
	<input type="text" id="title" name="title" value={article.title} />
	<label for="content">Content</label>
	<textarea name="content" id="content" cols="30" rows="5" value={article.content} />
	<button type="submit">Add Article</button>
</form>
