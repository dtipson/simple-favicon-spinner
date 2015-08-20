Simple Way to Fake a spinny favicon "Loading Indicator"
=============

For when you want to give users a subtle extra hint that something big is loading in a page.

Just include the plugin, start it, stop it.

```
$.favispin.on()
```

```
$.favispin.off()
```

```
$.favispin.ison()//-> returns true or false
```

```
$.favispin.on();
$.ajax({
    /*....*/
    beforeSend: $.favspinner.on
})
    .always($.favspinner.off);
```

Todos:
* disable for all mobile browsers (no favicons, no point)
* fix the gradient rotation
* comes in one convienient choice of colors