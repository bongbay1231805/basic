$("button").on("click", function() {
  $("img").attr("src", (_, src) => {
    const regex = /\d/;
    return src.replace(regex, Math.random());
  });
});