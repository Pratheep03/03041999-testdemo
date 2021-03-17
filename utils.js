function getApiLink(){
    var link;
    $.ajax({
        type: 'get',
        url: "config.json",
        async: false,
        success:function(data) {
          link = data
          }  
    })
    return link

}
questiondata=getApiLink()
