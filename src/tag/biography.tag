<biography>
    <h1 class="title">{ headline }: { firstName } { lastName }</h1>

    <script>
        var self = this;
        $.getJSON({
            url: '/data/biography.json',
            done: function (data) {
                self.update(data);
            }
        });
    </script>
</biography>