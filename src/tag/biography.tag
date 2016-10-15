<biography>
	<h1 class="title">{ firstName } { lastName }, { headline }</h1>

	<script>
		var self = this;
		$.getJSON('./data/biography.json')
				.done(function (data) {
							self.update(data);
						}
				);
	</script>
</biography>