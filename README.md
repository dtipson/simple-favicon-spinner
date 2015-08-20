Simple Way to Fake a spinny favicon "Loading Indicator"
=============

For when you want to give users a subtle extra hint that something big is loading in a page.

Just include the plugin, start it, stop it.

```
$.favspinner.on()
```

```
$.favspinner.off()
```

```
$.favspinner.on();
$.ajax({
    /*....*/
    beforeSend: $.favspinner.on
})
    .always($.favspinner.off)
```