$(document).ready(function(){
    get_json();
});
function get_json(){
    window.data={}, search=window.location.search.split('?add').join('');
    $.ajax({url:'../jsondata/products.json',type: 'GET',success:function(data){
        if(data.result){
            $.each(data.result,function(){
                if((this.module=="vemanager")&&(this.hidden==null)){
                    window.data[this.pid]=this;
                }
            })
        }
        if(search!=''){
            var pid=parseInt((search.match(/pid=\d{1,2}/))[0].split('=')[1]);$('#product').text(window.data[pid].name);
            var period=search.match(/period=[a-z]*/)[0].split('=')[1];$('#period').text(period);
            var configoptions=search.match(/configoption\[\d{1,2}\]=\d{1,2}/g);
            var current=window.data[pid];

            $.each(configoptions,function(k,v){
                var configoptions_id =v.split('=')[0].match(/\d{1,2}/)[0];
                var configoptions_val =v.split('=')[1].match(/\d{1,2}/)[0];
                var res = get_result_configoption(current.configoptions.configoption,configoptions_id,configoptions_val);
                $('#add').append('<p>'+res[0]+' <span id="period">'+res[1]+'(Наименование/Штук/Гб)</span>'+'</p>');
            })
        }}})
}
function get_result_configoption(current_configoptions,configoptions_id,configoptions_val){
    var name='',val='';
    $.each(current_configoptions,function(){if(this.id==configoptions_id){
        name=this.name;
        if( this.options.option.length>1){
            $.each(this.options.option,function(k,v){
                if(v.id==configoptions_val){
                    val= v.name;
                }

            })
        }else{val=configoptions_val}
    }});
    return [name,val];
}
