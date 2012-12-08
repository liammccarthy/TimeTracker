<!DOCTYPE HTML>
<html>
<head>
	<?= $this->Html->charset(); ?>
	<title>
        Time Tracker Tool
	</title>
  <?php
    echo $this->Html->css('main');
    echo $this->Html->script('jquery');
    echo $this->Html->script('json2');
    echo $this->Html->script('underscore');
    echo $this->Html->script('backbone');

  ?>
</head>
<body>
    <?php //pr($this->Session->read()) ?>
		<header>
			<h1>Welcome to BlueSpurs Time Tracker</h1>
		</header>


    <aside>
      <?= $this->element('sidebar')?>
    </aside>
    <section>
      <?= $this->fetch('content'); ?>
    </section>
		<footer>

		</footer>

</body>
</html>
