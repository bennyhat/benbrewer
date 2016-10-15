<biography>
	<h1 class="title">{ firstName } { lastName }, { headline }</h1>
	<p class="biography">{ biography }</p>
	<p class="linkedin">LinkedIn: { linkedInProfileUrl }</p>
	<script>
		var self = this;
		jQuery.getJSON('./build/data/biography.json')
				.done(function (data) {
							self.update(data);
						}
				);
	</script>
</biography>